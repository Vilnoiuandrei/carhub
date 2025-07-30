import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import clientPromise from "./mongoDB";
import bcrypt from "bcrypt";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        try {
          const client = await clientPromise;
          const db = client.db("test");

          // Check if the user exists
          const user = await db.collection("users").findOne({
            email: credentials.email,
          });

          if (!user) {
            return null; // Return null if user not found
          }
          if (!user.password) {
            return null; // Return null if user has no password
          }

          // Verify the password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null; // Return null if password is invalid
          }

          // Return the user object (excluding the password)
          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message || "An error occurred during login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const client = await clientPromise;
        const db = client.db("cars");

        const userEmail = user.email;
        let dbUser = await db.collection("users").findOne({ email: userEmail });

        if (!dbUser) {
          const newUser = {
            name: user.name,
            email: user.email,
            password: null, // No password for provider-based users
            role: "user",
            createdAt: new Date(),
          };
          const result = await db.collection("users").insertOne(newUser);
          dbUser = { ...newUser, _id: result.insertedId };
        }

        token.userId = dbUser._id;
      }
      return token;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
