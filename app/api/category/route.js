import ConnectMongoDb from "@/libs/mongodb";
import Categories from "@/models/categories";
import { NextResponse } from "next/server";

export async function GET(request) {
    await ConnectMongoDb();

    const username = request.nextUrl.searchParams.get('username');
    
    // Fetch categories based on the username from the query parameter
    const categories = await Categories.find({ username }).sort({ type: 1 });
    
    // Set Cache-Control header to no-store to prevent caching
    const headers = {
        'Cache-Control': 'no-store',
    };

    return NextResponse.json({ categories }, { status: 200, headers });
}

