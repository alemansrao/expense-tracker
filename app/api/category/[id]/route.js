import ConnectMongoDb from "@/libs/mongodb";
import Categories from "@/models/categories";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  await ConnectMongoDb();
  const { id } = params;
  try {
    const deletedCategory = await Categories.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE category error:", error);
    return NextResponse.json(
      { error: "Error deleting category" },
      { status: 500 }
    );
  }
}
