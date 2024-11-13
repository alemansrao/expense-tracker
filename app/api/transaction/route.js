import ConnectMongoDb from "@/libs/mongodb";
import Transaction from "@/models/transaction";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/libs/authOptions";
export async function POST(request) {
  // Get session to verify the user's authentication
  const session = await getServerSession(authOptions);

  if (!session) {
    // Return 401 if user is not authenticated
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse the request body
  const { type, amount, date, category, username, description } = await request.json();

  // Ensure that the username in the request matches the authenticated user
  if (session.user.email !== username) {
    // Return 403 if the user is trying to post as a different user
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await ConnectMongoDb();

  // Create the transaction with the validated data
  await Transaction.create({
    username,
    category_id: category,
    type,
    amount,
    description,
    date,
  });

  return NextResponse.json({ message: "Transaction created" }, { status: 201 });
}

export async function GET(request) {
  const session = await getServerSession(authOptions); // Get the session

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ConnectMongoDb();

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const allTransactions = searchParams.get('all');

  if (session.user.email !== username) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const query = { username }

  if (startDate && endDate) {
    query.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
    if (allTransactions != 'true') {
      query.type = "Expense";
    }
  }

  const transactions = await Transaction.find(query).sort({
    date: -1,
    createdAt: -1,
  });

  return NextResponse.json({ transactions }, { status: 200 });
}