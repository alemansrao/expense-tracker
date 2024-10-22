import ConnectMongoDb from "@/libs/mongodb";
import Categories from "@/models/categories";
import { NextResponse } from "next/server";

// Get limit by username and category
export async function GET(request) {
  await ConnectMongoDb();
  const username = request.nextUrl.searchParams.get("username");
  const category = request.nextUrl.searchParams.get("category");

  // Check if username and category are provided, early return if missing
  if (!username || !category) {
    return NextResponse.json({ error: "Username and category are required" }, { status: 400 });
  }

  // Fetch category and sort by type
  const categoryData = await Categories.findOne({ username, name: category }).sort({ type: 1 });

  if (!categoryData) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  // Return the category data with no-store cache header
  return NextResponse.json({ category: categoryData }, { status: 200, headers: { "Cache-Control": "no-store" } });
}

// Update limit for a category
export async function PUT(request) {
  await ConnectMongoDb();
  const { id, limit } = await request.json();

  // Ensure both id and limit are provided
  if (!id || limit === undefined) {
    return NextResponse.json({ error: "ID and limit are required" }, { status: 400 });
  }

  // Update category's limit
  const updatedCategory = await Categories.findByIdAndUpdate(id, { limit }, { new: true });

  if (!updatedCategory) {
    return NextResponse.json({ message: "Document not found" }, { status: 404 });
  }

  // Return success message
  return NextResponse.json({ message: "Limit updated successfully" }, { status: 200 });
}
