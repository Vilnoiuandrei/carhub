"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button
      className="text-4xl text-gray-200 w-80 h-16 border-2 border-red-500 text-center p-2 rounded-md mt-4 flex items-center justify-center gap-2 hover:bg-red-500 transition-all duration-500 ease-out"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
