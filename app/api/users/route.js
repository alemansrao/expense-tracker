import ConnectMongoDb from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/libs/authOptions";
import AppUsers from "@/models/users";
export async function GET() {
    await ConnectMongoDb();
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // Retrieve only the `email` field for all users
    const users = await AppUsers.find({}).select("email");

    // Extract the emails into a simple array
    const emails = users.map(user => user.email);
    return NextResponse.json(emails);
}

export async function POST(request) {
    await ConnectMongoDb();
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const { name, email } = await request.json();
    const user = await AppUsers.create({ name, email });
    return NextResponse.json(user);
}