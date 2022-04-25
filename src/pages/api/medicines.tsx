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

  const {db} = await connect();

  const medicineNameExists = await db
  .collection('medicines')
  .findOne({ name: name})

  const newMedicine = {
    name,
    quantity,
  }

  const{ name, quantity } = req.body;

  if (!name){
    res.status(400).json({ error: 'Missing parameters'});
    return;
  }

  if (req.method === "POST"){

    if(!medicineNameExists){
      const response = await db.collection('medicines').insertOne({
        name,
        quantity
      });
      res.status(200).json(response.ops[0])}
      return;
    }

    else{
      if (req.method === "PUT") {
        if (medicineNameExists){
          await db.collection('medicines').updateOne({ name: name }, {$set: {quantity: quantity}});
          res.status(200).json(name);
          return;
        }
      }

      res.status(400).json({error: 'Wrong request Method'});
    }
  }
