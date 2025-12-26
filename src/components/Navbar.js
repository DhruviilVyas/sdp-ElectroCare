import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    return (
  <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center shrink-0">
        <Link href="/Dashboard" className="flex items-center gap-3">
          <Image
            src="/logo2.png"
            alt="ElectroCare Logo"
            className="h-10 w-10 object-contain rounded-full border border-gray-100 shadow-sm"
            height={30}
            width={30}
          />
          <div className="flex items-center">
            <span className="text-red-500 font-bold text-2xl tracking-tighter">Electro</span>
            <span className="text-blue-600 font-bold text-2xl tracking-tighter">Care</span>
          </div>
        </Link>
      </div>
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
        <input type="text" placeholder="Search your products..." className="bg-transparent border-none focus:ring-0 text-sm w-48 lg:w-64 outline-none" />
      </div>
      <button className="p-2 relative hover:bg-gray-100 rounded-full transition-colors">
        <BellIcon className="h-6 w-6 text-gray-600" />
        <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">AP</div>
    </div>
  </nav>
);
}
