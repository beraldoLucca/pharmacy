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

        const { cns, cpf, nameMedicine, status } = req.body;

        if (!cns || !nameMedicine) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        const { db } = await connect();

        const response = await db.collection('requests').insertOne({
            cns,
            cpf,
            nameMedicine,
            date: new Date(),
            status:'RETIRAR',
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

            const response = await db.collection('requests').find({ cns }).toArray();

            if (!response) {
                res.status(400).json({ error: "CNS not found" });
                return;
            }
            res.status(200).json(response);
        }
        else if (cpf) {
            const { db } = await connect();

            const response = await db.collection('requests').find({ cpf }).toArray();

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

