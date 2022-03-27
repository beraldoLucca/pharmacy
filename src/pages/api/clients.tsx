import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType{
    error: string
}

interface SucessResponseType{
    _id: string;
    cns: string;
    cpf: string;
    name: string;
    age: number;
}

export default async(
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {
    

    if (req.method === "POST"){

        const{ cns, cpf, name, age} = req.body;

        if( !cns || !cpf || !name || !age){
            res.status(400).json({ error: 'Missing parameters'});
            return;
        }

        const {db} = await connect();

        const response = await db.collection('clients').insertOne({
            cns, 
            cpf, 
            name, 
            age,
        });
        res.status(200).json(response.ops[0])
    }
    else{
        res.status(400).json({error: 'Wrong request Method'});
        }
    }

