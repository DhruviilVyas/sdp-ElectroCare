"use client";

import React, { useState } from 'react';
import { BellIcon, UserCircleIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-600 text-white font-sans shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2 z-50">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
               <Image 
                 src="/logo2.png" 
                 alt="ElectroCare" 
                 fill 
                 className="object-contain" 
                 priority
               />
            </div>
            <div className="flex items-center leading-none">
               <span className="text-white font-bold text-xl md:text-2xl tracking-wide cursor-pointer">
              ElectroCare
            </span>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-white-600">
          <Link href="/" className="hover:text-white-600 transition-colors">Home</Link>
          <Link href="/Dashboard" className="hover:text-blue-600 transition-colors">My Appliances</Link>
          <Link href="/request-service" className="hover:text-blue-600 transition-colors">Request Service</Link>
          <Link href="/warranty-plans" className="hover:text-blue-600 transition-colors">Plans</Link>
        </nav>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4">
          
          {/* Desktop Search Bar */}
          <div className="hidden lg:flex relative items-center">
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-100 text-gray-800 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 w-48 transition-all focus:w-64"
            />
            <MagnifyingGlassIcon className="h-4 w-4 text-white-400 absolute right-3" />
          </div>
          
          <button className="relative p-2 hover:bg-white-100 rounded-full transition-colors text-white-600">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-2 w-2"></span>
          </button>
          
          <Link href="/Login" className="hidden md:block p-1 hover:bg-gray-100 rounded-full text-white-600">
            <UserCircleIcon className="h-7 w-7" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
           <Link href="/" className="text-gray-800 font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
           <Link href="/Dashboard" className="text-gray-800 font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>My Appliances</Link>
           <Link href="/request-service" className="text-gray-800 font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Request Service</Link>
           <Link href="/warranty-plans" className="text-gray-800 font-medium py-2 border-b border-gray-50" onClick={() => setIsMobileMenuOpen(false)}>Warranty Plans</Link>
           
           <div className="pt-2">
              <Link href="/Login" className="flex items-center justify-center w-full bg-blue-600 text-white font-bold py-3 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
                 Login / Signup
              </Link>
           </div>
        </div>
      )}
    </header>
  );
};

export default Header;