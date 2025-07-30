import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongoDB";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  const { id } = await params;
  const client = await clientPromise;

  const db = client.db("test");
  const car = await db.collection("cars").findOne({ _id: new ObjectId(id) });
  if (!car)
    return NextResponse.json({ error: "Car not found" }, { status: 404 });
  return NextResponse.json({ data: { car } }, { status: 200 });
}
