"use client";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import SignOut from "../_components/SignOut";

const inter = Inter({ subsets: ["latin"], weight: "400", display: "swap" });

export default function SignIn() {
  const { data: session } = useSession();
  const [error, setError] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    if (result?.error === null) {
      // Successful sign-in
      window.location.href = "/";
    }

    if (result?.error === "CredentialsSignin") {
      setError("Email or password is incorrect");
    }
  };

  return (
    <div>
      {/* Check if the user is already logged in */}
      {session && (
        <div className="flex items-center justify-center min-h-screen flex-col text-2xl text-gray-200">
          <p>You are logged in.</p>
          <Link
            href="/cars"
            className=" text-4xl text-gray-200 w-80 h-16 border-2 border-red-500 text-center p-2 rounded-md mt-4 flex items-center justify-center gap-2 hover:bg-red-500 transition-all duration-500 ease-out"
          >
            Go to Cars
          </Link>
          <SignOut />
        </div>
      )}

      {/* If not logged in, show the sign-in form */}
      {!session && (
        <div className="flex items-center justify-center min-h-screen flex-col text-2xl">
          <p>Please log in to view your account.</p>
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Google Sign In */}
          <button
            className="mt-5 h-16 w-80 shadow-md rounded-sm text-xl border-2 border-gray-300 relative flex items-center justify-center"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <p className={`${inter.className} text-3xl tracking-normal`}>
              Google
            </p>
            <FcGoogle className="h-8 w-8 absolute right-3" />
          </button>
          <p className="p-2">or</p>

          {/* Email Sign In */}
          <form
            onSubmit={handleEmailSignIn}
            className="flex flex-col items-center border-2 border-gray-300 p-4 rounded-md"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-600 mt-4 w-72"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="p-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-600 mt-4 w-72"
            />
            <button
              type="submit"
              className="mt-5 h-14 w-72 shadow-md rounded-sm bg-black border-red-600 border-2 text-white hover:bg-red-600 transition-all duration-500 ease-out"
            >
              Sign In with Email
            </button>
          </form>

          {/* Link to Registration Page */}
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signin" className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
