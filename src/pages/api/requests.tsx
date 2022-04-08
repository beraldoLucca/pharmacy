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
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { db } = await connect();

        const cnsExists = await db
            .collection('requests')
            .findOne({ cns: cns})
        
        if(!cnsExists){
            res.status(400).json({ error: `Pedido com o cns ${cns} não existe` });
            return;
        }
        
        const requestExists = await db
            .collection('requests')
            .findOne({ _id: new ObjectID(request_id)})

        if(requestExists){
            
            const statusRequest = {
                status: 'RETIRADO',
            };
    
            await db.collection('requests').updateOne({ _id: new ObjectID(request_id) }, {$set: {status: statusRequest}});
    
            res.status(200).json(status);
            return;
        }

        const response = await db.collection('requests').insertOne({
            cns,
            cpf,
            nameMedicine,
            dateRequest: new Date(),
            dateWithdrawal : '',
            status: ['RETIRAR'],
        });
        res.status(200).json(response.ops[0])
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

