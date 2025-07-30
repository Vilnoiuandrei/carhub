import { NextResponse } from "next/server";
import clientPromise from "@/app/_lib/mongoDB";
import APIFeatures from "@/app/_lib/apiFeatures";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = Object.fromEntries(searchParams.entries());
  const client = await clientPromise;
  const db = client.db("test");
  const rawQuery = await db.collection("cars").find({});
  const features = new APIFeatures(rawQuery, query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const cars = await features.query.toArray();
  return NextResponse.json(
    { data: { cars }, results: cars.length },
    { status: 200 }
  );
}
