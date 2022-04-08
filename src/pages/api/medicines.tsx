import { NextApiRequest, NextApiResponse } from "next";
import connect from '../../../utils/database'

interface ErrorResponseType{
    error: string
}

interface SucessResponseType{
    _id: string;
    name: string;
}

export default async(
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | SucessResponseType>
): Promise<void> => {
    

    if (req.method === "POST"){

        const{ name, quantity } = req.body;

        if( !name){
            res.status(400).json({ error: 'Missing parameters'});
            return;
        }

        const {db} = await connect();

        const medicineNameExists = await db
            .collection('medicines')
            .findOne({ name: name})


        const newMedicine = {
            name,
            quantity,
        }

        if(medicineNameExists){
            await db.collection('medicines').updateOne({ name: name }, {$set: {status: newMedicine}});
    
            res.status(200).json(name);
            return;
        }
        else{
        const response = await db.collection('medicines').insertOne({
            name, 
        });
        res.status(200).json(response.ops[0])}
    }
    else{
        res.status(400).json({error: 'Wrong request Method'});
        }
    }

