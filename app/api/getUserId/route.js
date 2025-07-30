import { auth } from "@/app/_lib/auth";
import clientPromise from "@/app/_lib/mongoDB";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const client = await clientPromise;
  const db = client.db("test");
  const email = session.user.email;
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ userId: user._id.toString() }, { status: 200 });
}
