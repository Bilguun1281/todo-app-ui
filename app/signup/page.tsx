"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/api";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser(formData); // Call your API function
      router.push("/signin"); // Redirect to sign-in page after signup
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign up for an account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="font-semibold text-indigo-600 hover:text-indigo-500">
            SIGN IN
          </Link>
        </p>
      </div>
    </div>
  );
}
