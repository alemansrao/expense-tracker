const { NextResponse } = require("next/server");
import ConnectMongoDb from "@/libs/mongodb";
import Transaction from "@/models/transaction";
export async function DELETE(request, { params }) {
  const { id } = params;
  await ConnectMongoDb();
  await Transaction.deleteOne({ _id: id });
  return NextResponse.json({ message: "Transaction deleted" }, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  await ConnectMongoDb();
  await Transaction.updateOne({ _id: id }, request.body);
  return NextResponse.json({ message: "Transaction updated" }, { status: 200 });
}