import ConnectMongoDb from "@/libs/mongodb";
import Categories from "@/models/categories";
import { NextResponse } from "next/server";

// Fetch categories based on username
export async function GET(request) {
  await ConnectMongoDb();

  const username = request.nextUrl.searchParams.get("username");
  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const categories = await Categories.find({ username }).sort({createdAt: -1,});
    return NextResponse.json(
      { categories },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("GET categories error:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}

// Add a new category
export async function POST(request) {
  await ConnectMongoDb();

  try {
    const { type, name, username, limit } = await request.json();

    if (!type || !name || !username) {
      return NextResponse.json(
        { error: "Type, name, and username are required" },
        { status: 400 }
      );
    }

    const categoryData = { type, name, username };
    if (type === "Expense") categoryData.limit = limit;

    const category = await Categories.create(categoryData);
    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Duplicate category for this user" },
        { status: 400 }
      );
    }
    console.error("POST category error:", error);
    return NextResponse.json(
      { error: "Error creating category" },
      { status: 500 }
    );
  }
}

// Delete a category by ID

