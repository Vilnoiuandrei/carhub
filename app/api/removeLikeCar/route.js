import { auth } from "@/app/_lib/auth";
import clientPromise from "@/app/_lib/mongoDB";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user.email) {
    return Response.json({ error: "User email not found" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("test");

  const user = await db
    .collection("users")
    .findOne({ email: session.user.email });
  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const userId = user._id.toString();

  const { carId } = await req.json();

  if (!carId) {
    return Response(
      { error: "Car ID is required" },
      {
        status: 400,
      }
    );
  }

  const result = await db.collection("cars").findOneAndUpdate(
    { _id: new ObjectId(carId) }, // Find the car by its ID
    { $pull: { likes: userId } }, // Remove user's ID from the `likes` array
    { returnDocument: "after" } // Return the updated document
  );
  if (result.modifiedCount === 0) {
    return Response.json(
      { error: "Failed to remove movie from user's list" },
      { status: 500 }
    );
  }

  return Response.json(
    { message: "Movie removed from user's list successfully" },
    { status: 200 }
  );
}
