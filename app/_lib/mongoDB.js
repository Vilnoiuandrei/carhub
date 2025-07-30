import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so we can reuse the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("Successfully connected to MongoDB in development");
        return client;
      })
      .catch((err) => {
        console.error("MongoDB connection error in development:", err);
        throw err;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri, options);
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("Successfully connected to MongoDB in production");
      return client;
    })
    .catch((err) => {
      console.error("MongoDB connection error in production:", err);
      throw err;
    });
}

export default clientPromise;
