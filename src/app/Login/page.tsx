"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { signIn } from "next-auth/react"; // ✅ Import this
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  
  // ✅ State to hold user input
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Talk to NextAuth
    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/Dashboard"); // Redirect on success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      
      <div className="absolute top-4 left-4 flex items-center space-x-2">
       <Link href={"/Dashboard"}> <Image src="/logo.jpg" alt="Logo" className="h-12 w-12 rounded-full" height={30} width={30} /></Link>
        <span className="text-xl md:text-2xl font-bold text-blue-900 tracking-wide">ElectroCare</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8"
      >
        <div className="mb-4 flex justify-center">
          <Image src="/logo.jpg" alt="Logo" className="h-16 w-16 rounded-full" height={30} width={30} />
        </div>

        <p className="text-center text-gray-700 mb-2 text-lg font-medium">
          Welcome to <span className="font-bold text-blue-900">ElectroCare</span>
        </p>

        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Login</h1>

        {/* ✅ Show Error Message if login fails */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              onChange={handleChange} // ✅ Connect to state
              required
              placeholder="Enter your email"
              className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              onChange={handleChange} // ✅ Connect to state
              required
              placeholder="Enter your password"
              className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-900 text-white font-medium rounded-lg shadow-md hover:bg-blue-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/Register" className="text-blue-900 hover:underline font-medium">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}