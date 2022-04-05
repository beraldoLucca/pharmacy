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

        const { cns, cpf, name, age } = req.body;

        if (!cns || !cpf || !name || !age) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { db } = await connect();

        const response = await db.collection('clients').insertOne({
            cns,
            cpf,
            name,
            age,
        });
        res.status(200).json(response.ops[0])
    } else if (req.method === "GET") {
        const { cns } = req.body;
        const { cpf } = req.body;

        if (!cns && !cpf) {
            res.status(400).json({ error: 'Missing cns and CPF' });
            return;
        }

        if (cns) {
            const { db } = await connect();

            const response = await db.collection('clients').findOne({ cns });

            if (!response) {
                res.status(400).json({ error: "CNS not found" });
                return;
            }
            res.status(200).json(response);
        }
        else if (cpf) {
            const { db } = await connect();

            const response = await db.collection('clients').findOne({ cpf });

            if (!response) {
                res.status(400).json({ error: "CPF not found" });
                return;
            }
            res.status(200).json(response);
        }
    }
    else {
        res.status(400).json({ error: 'Wrong request Method' });
    }
}

