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
  
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  
  // Build the query object
  const query = { username }; // Default filter by username
  
  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
    query.type = "Expense";
  }

  const transactions = await Transaction.find(query).sort({ date: -1, createdAt: -1 });
  
  return NextResponse.json({ transactions }, { status: 200 });
}
