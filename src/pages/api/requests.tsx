import { ObjectID } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType {
    error: string
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | object[]>
): Promise<void> => {


    if (req.method === "POST") {

        const { request_id, cns, cpf, nameMedicine, status } = req.body;

        if (!cns || !nameMedicine) {
            res.status(400).json({ error: 'Por favor, insira o CNS e o nome do remédio' });
            return;
        }

        const { db } = await connect();

        const cnsExists = await db
            .collection('clients')
            .findOne({ cns: cns})
        
        if(!cnsExists){
            res.status(400).json({ error: `Cliente com o cns ${cns} não existe` });
            return;
        }

        const nameMedicineExists = await db
            .collection('medicines')
            .findOne({ name: nameMedicine})
        
        if(!nameMedicineExists){
            res.status(400).json({ error: `Remédio ${nameMedicine} não existe` });
            return;
        }
        
        const requestExists = await db
            .collection('requests')
            .findOne({ _id: new ObjectID(request_id)})

        if(requestExists){
            
            const statusRequest = 'RETIRADO';
            const dataWithdrawal = new Date();
    
            await db.collection('requests').updateOne({ _id: new ObjectID(request_id) }, {$set: {status: statusRequest, dateWithdrawal: dataWithdrawal}});
    
            res.status(200).json(status);
            return;
        }

        const response = await db.collection('requests').insertOne({
            cns,
            cpf,
            nameMedicine,
            dateRequest: new Date(),
            status: 'RETIRAR',
        });
        res.status(200).json(response.ops[0])
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

