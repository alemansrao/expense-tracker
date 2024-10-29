// pages/api/submit.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI as string; // Your MongoDB Atlas connection string

let client: MongoClient;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db('your-database-name').collection('your-collection-name');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const collection = await connectToDatabase();
      const result = await collection.insertOne(req.body);
      res.status(200).json({ message: 'Data inserted successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Failed to insert data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
