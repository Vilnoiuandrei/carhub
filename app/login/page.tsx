"use client";
import { useSession } from "next-auth/react";
import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import SignOut from "../_components/SignOut";

export default function SignIn() {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const handleContinue = () => {
    if (email.trim()) {
      setShowPassword(true);
    } else {
      emailRef.current?.focus();
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.error === null) {
      window.location.href = "/";
    }

    if (result?.error === "CredentialsSignin") {
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white px-4">
      {session ? (
        <div className="flex flex-col items-center text-2xl">
          <p>You are logged in.</p>
          <Link
            href="/cars"
            className="text-4xl w-80 h-16 border-2 border-red-500 text-center p-2 rounded-md mt-4 flex items-center justify-center gap-2 hover:bg-red-500 transition-all duration-500"
          >
            Go to Cars
          </Link>
          <SignOut />
        </div>
      ) : (
        <div className="flex flex-col items-center w-full max-w-sm">
          <p className="text-xl text-gray-200 mb-4">
            Please log in to view your account.
          </p>

          {error && <p className="text-red-500 mt-1">{error}</p>}

          {/* Google Sign In */}
          <button
            className="mb-4 h-14 w-full shadow-md border-2 rounded-sm text-xl text-gray-900 bg-gray-200  border-red-600 flex items-center justify-center relative hover:bg-gray-100 transition"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <p className="text-2xl">Google</p>
            <FcGoogle className="h-7 w-7 absolute right-4" />
          </button>

          {/* Divider */}
          <p className="text-gray-400 mb-2">or</p>

          {/* Email Sign In */}
          <form
            onSubmit={handleEmailSignIn}
            className="flex flex-col w-full gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
              required
            />

            {showPassword ? (
              <>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="h-12 rounded-lg bg-red-600 hover:bg-red-500 transition text-white font-semibold"
                >
                  Sign In
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleContinue}
                className="h-12 rounded-lg bg-red-600 hover:bg-red-500 transition text-white font-semibold"
              >
                Continue with Email
              </button>
            )}
          </form>

          <p className="mt-4 text-gray-400 text-lg md:text-xl">
            Don&apos;t have an account?{" "}
            <Link href="/signin" className="text-red-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
