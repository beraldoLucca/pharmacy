import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType {
    error: string
}

interface SucessResponseType {
    _id: string;
    cns: string;
    cpf: string;
    name: string;
    age: number;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {


    if (req.method === "POST") {

        const { cns, cpf, name, age, status } = req.body;

        if (!cns) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { db } = await connect();

        const cnsExists = await db
            .collection('clients')
            .findOne({ cns: cns})
        
        if(!cnsExists){
            if(!cpf || !name || !age){
                res.status(400).json({ error: 'É necessário passar o CPF, o nome e a idade' });
                return;
            }
            const response = await db.collection('clients').insertOne({
                cns,
                cpf,
                name,
                age,
                status: ['ATIVO'],
            });
            res.status(200).json(response.ops[0])
            return;
        }

        const statusClient = {
            status: 'INATIVO',
        };

        await db.collection('clients').updateOne({ cns: cns}, {$set: {status: statusClient}});

        res.status(200).json(status);
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

