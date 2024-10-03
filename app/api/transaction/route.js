import ConnectMongoDb from "@/libs/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { type,amount,date,category,username,description } = await request.json();
  console.time("dbConnection");
  await ConnectMongoDb();
  console.timeEnd("dbConnection");
  // Make sure the schema fields match
  await Transaction.create({
    username,
    category_id: category,  // Use correct field names
    type,                  // Use "type" to match the schema
    amount,
    description,
    date,
  });

  return NextResponse.json({ message: "Transaction created" }, { status: 201 });
}

export async function GET(request) {
  await ConnectMongoDb();
  const transactions = await Transaction.find().sort({ createdAt: -1 });
  return NextResponse.json({ transactions }, { status: 200 });
}
