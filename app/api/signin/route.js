import clientPromise from "@/app/_lib/mongoDB";
import bcrypt from "bcrypt";

export async function POST(req) {
  const userData = await req.json();
  if (!userData.email || !userData.password) {
    return Response.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const client = await clientPromise;
  const db = client.db("test");
  const existingUser = await db
    .collection("users")
    .findOne({ email: userData.email });
  if (existingUser) {
    return Response.json({ error: "User already exists" }, { status: 409 });
  }
  const newUser = {
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    createdAt: new Date(),
  };
  const result = await db.collection("users").insertOne(newUser);
  if (!result.acknowledged) {
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
  return Response.json(
    { message: "User created successfully" },
    { status: 201 }
  );
}
