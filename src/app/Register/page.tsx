"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterInput } from "@/lib/validation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Register() {
  const router = useRouter(); // ✅ FIXED — hook inside component

  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError("");
    setSuccess("");

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      setServerError(result.error);
      return;
    }

    setSuccess("Account created! Redirecting...");

    setTimeout(() => {
      router.push("/Dashboard"); // or "/Login"
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">

      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Link href={"/Dashboard"}>
          <Image src="/logo.jpg" alt="ElectroCare Logo"
           className="h-12 w-12 rounded-full"
              height={30}
                  width={30} />
        </Link>
        <span className="text-xl md:text-2xl font-bold text-blue-900 tracking-wide">
          ElectroCare
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-4 flex justify-center">
          <Image src="/logo.jpg" alt="ElectroCare Logo"
           className="h-16 w-16 rounded-full"
              height={30}
                  width={30} />
        </div>

        <p className="text-center text-gray-700 mb-2 text-lg font-medium">
          Welcome to <span className="font-bold text-blue-900">ElectroCare</span>
        </p>

        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Register</h1>

        {serverError && (
          <p className="text-red-600 text-center mb-2">{serverError}</p>
        )}

        {success && (
          <p className="text-green-600 text-center mb-2">{success}</p>
        )}

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              {...form.register("name")}
              className="text-black w-full px-4 py-2 rounded-md border border-gray-300"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email/phone
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="text-black w-full px-4 py-2 rounded-md border border-gray-300"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...form.register("password")}
              className="text-black w-full px-4 py-2 rounded-md border border-gray-300"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              {...form.register("confirmPassword")}
              className="text-black w-full px-4 py-2 rounded-md border border-gray-300"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 transition-colors"
          >
            Register
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/Login" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
