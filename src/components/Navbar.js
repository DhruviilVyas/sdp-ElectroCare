"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import {
  MagnifyingGlassIcon,
  BellIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo2.png"
          alt="ElectroCare Logo"
          height={40}
          width={40}
          className="rounded-full border shadow-sm"
        />
        <div className="flex items-center">
          <span className="text-red-500 font-bold text-2xl">Electro</span>
          <span className="text-blue-600 font-bold text-2xl">Care</span>
        </div>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full text-black">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search your products..."
            className="bg-transparent outline-none text-sm w-64 text-black"
          />
        </div>

        {/* Product Listing */}
        <Link href="/products" className="hidden lg:flex items-center gap-1 border px-3 py-1.5 rounded hover:text-blue-600 text-black">
          <ChartBarIcon className="h-4 w-4" />
          <span className="text-sm text-black">Product Listing</span>
        </Link>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-1 right-2 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold"
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </button>

          {isMenuOpen && (
            <>
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold truncate">{user?.name || "Guest"}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>

                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm hover:bg-blue-50"
                >
                  Profile Settings
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/Login" })}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>

              {/* Click outside */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
