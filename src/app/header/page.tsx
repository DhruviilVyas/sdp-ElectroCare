// src/components/Header.js
"use client"; // This directive is specific to Next.js App Router for client-side functionality

import React, { useState } from 'react';
import {  BellIcon, UserCircleIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; // Using Next.js Link component for better navigation
import Image from 'next/image';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative bg-indigo-600 text-white font-sans shadow-lg z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-3">
          {/* Assuming you have a logo.png in your public directory */}
          <Link href="/">
            <Image src="/logo2.png" alt="ElectroCare Logo"
             className='h-16 w- object-contain'
               height={30}
                  width={30}
            /> 
          </Link>
          <Link href="/">
            <span className="text-white font-bold text-xl md:text-2xl tracking-wide cursor-pointer">
              ElectroCare
            </span>
          </Link>
        </div>

        {/* Center: Main Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8 text-md font-medium">
          <Link href="/" className="hover:text-blue-300 transition-colors">Home</Link>
          <Link href="/Dashboard" className="hover:text-blue-300 transition-colors">My Appliances</Link>
          <Link href="/request-service" className="hover:text-blue-300 transition-colors">Request Service</Link>
          <Link href="/warranty-plans" className="hover:text-blue-300 transition-colors">Warranty Plans</Link> {/* Changed from extended-warranty for clarity */}
          <Link href="/support" className="hover:text-blue-300 transition-colors">Support</Link>
        </nav>

        {/* Right Side: Search, Notifications, User (Desktop & Mobile) */}
        <div className="flex items-center space-x-6">
          {/* Search Bar (visible on desktop, hidden on mobile for cleaner look) */}
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-white text-black border border-blue-700 rounded-full py-2 pl-4 pr-10  placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-48 lg:w-64"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <MagnifyingGlassIcon className="h-5 w-5 text-blue-300" />
            </button>
          </div>
          
          <button className="relative hover:text-blue-300 transition-colors">
            <BellIcon className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
          
          <Link href="/Login" className="hover:text-blue-300 transition-colors">
            <UserCircleIcon className="h-6 w-6" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-1 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="md:hidden absolute top-full left-0 w-full bg-blue-900 shadow-lg pb-4">
          <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="text-white hover:text-blue-300 transition-colors font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/Dashboard" className="text-white hover:text-blue-300 transition-colors font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>My Appliances</Link>
            <Link href="/request-service" className="text-white hover:text-blue-300 transition-colors font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Request Service</Link>
            <Link href="/warranty-plans" className="text-white hover:text-blue-300 transition-colors font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Warranty Plans</Link>
            <Link href="/support" className="text-white hover:text-blue-300 transition-colors font-medium text-lg" onClick={() => setIsMobileMenuOpen(false)}>Support</Link>
            {/* Mobile Search Bar */}
            <div className="relative w-3/4 mt-4">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-blue-800 border border-blue-700 rounded-full py-2 pl-4 pr-10 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <MagnifyingGlassIcon className="h-5 w-5 text-blue-300" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;