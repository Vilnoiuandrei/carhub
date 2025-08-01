"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

async function fetchUserRegistration(formData: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Registration failed");
  }

  return res.json();
}

export default function SigninPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // React Query mutation for registration
  const createUserMutation = useMutation({
    mutationFn: fetchUserRegistration,
    onSuccess: async () => {
      // Automatically log the user in after successful registration
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError(
          "Registration successful, but login failed. Please log in manually."
        );
      } else {
        window.location.href = "/";
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    createUserMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }); // Trigger the mutation with form data
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-5 p-6 bg-gray-900 rounded-2xl shadow-xl border border-gray-800 text-base"
      >
        <h1 className="text-3xl font-semibold text-center text-white">
          Sign Up
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400"
        />

        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
