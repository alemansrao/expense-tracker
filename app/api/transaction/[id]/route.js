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

  try {
    const temp = await request.json();
    console.log("Request body (update data):", temp);

    await ConnectMongoDb();

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    } else {
      console.log("Transaction found : \n", transaction);
    }

    // Use findOneAndUpdate to update the transaction
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { _id: id },
      temp, // Use the parsed JSON
      { new: true, runValidators: true } // Return updated doc and validate
    );

    if (!updatedTransaction) {
      return NextResponse.json(
        { message: "No changes made to the transaction" },
        { status: 400 }
      );
    }

    console.log("Updated transaction:", updatedTransaction);
    return NextResponse.json(
      { message: "Transaction updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred while updating the transaction" },
      { status: 500 }
    );
  }
}
