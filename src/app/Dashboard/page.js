"use client";

import { useState, useEffect } from "react";
import {
  MapPinIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  BellIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  ArchiveBoxIcon,
  BoltIcon,
  ClockIcon,
  ChartBarIcon,
  PhoneIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

// --- DUMMY DATA (Default items visible to new users) ---
const defaultProducts = [
  { 
    id: 1, 
    name: "Sony Bravia 55' 4K Smart LED TV", 
    model: "KD-55X80J",
    condition: "Working Perfectly", 
    status: "Active Warranty", 
    statusColor: "bg-emerald-600",
    img: "📺" 
  },
  { 
    id: 2, 
    name: "Samsung 253L Refrigerator", 
    model: "RT28A3453S8",
    condition: "Cooling Issue", 
    status: "Needs Service", 
    statusColor: "bg-orange-500",
    img: "❄️" 
  },
];

const stats = {
  activeRepairs: 159,
  repairsToday: 65,
  avgTime: "01:47 hrs",
  saved: "1331kg",
};

const testimonials = [
  { id: 1, quote: "Provides doorstep delivery", text: "Can order from anywhere...", author: "Subhash Sehgal", bg: "bg-blue-50" },
  { id: 2, quote: "Used the app and found it easy", text: "Excellent app...", author: "Snehal Shah", bg: "bg-green-50" },
  { id: 3, quote: "Customer friendly", text: "Best during lockdown...", author: "Laksh Kankariya", bg: "bg-purple-50" },
];
const TopHeader = () => {
  const [user, setUser] = useState({ name: "Abhay Parmar" });

  return (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    {" "}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
      {" "}
      {/* LEFT SIDE: LOGO + BRAND NAME */}{" "}
      <div className="flex items-center shrink-0">
        {" "}
        <Link href="/" className="flex items-center gap-3">
          {" "}
          <Image
            src="/logo2.png"
            alt="ElectroCare Logo"
            className="h-10 w-10 object-contain rounded-full border border-gray-100 shadow-sm"
               height={30}
                  width={30}
          />{" "}
          <div className="flex items-center">
            {" "}
            <span className="text-red-500 font-bold text-2xl tracking-tighter">
              Electro
            </span>{" "}
            <span className="text-blue-600 font-bold text-2xl tracking-tighter">
              Care
            </span>{" "}
          </div>{" "}
        </Link>{" "}
      </div>{" "}
      {/* CENTER: SEARCH BAR */}{" "}
      <div className="hidden md:flex flex-1 max-w-3xl mx-4">
        {" "}
        <div className="flex w-full border border-gray-300 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {" "}
          <div className="relative w-1/4 border-r border-gray-300 bg-gray-50">
            {" "}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {" "}
              <MapPinIcon className="h-5 w-5 text-gray-500" />{" "}
            </div>{" "}
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 text-gray-900 text-sm focus:outline-none"
              defaultValue="Vastral, Ahmedabad"
            />{" "}
          </div>{" "}
          <div className="relative flex-1 bg-white">
            {" "}
            <input
              type="text"
              className="block w-full pl-4 pr-12 py-2.5 text-gray-900 text-sm focus:outline-none"
              placeholder="Search for 'TV Repair'..."
            />{" "}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {" "}
              <MicrophoneIcon className="h-5 w-5 text-blue-500 cursor-pointer" />{" "}
            </div>{" "}
          </div>{" "}
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 flex items-center justify-center">
            {" "}
            <MagnifyingGlassIcon className="h-5 w-5 stroke-2" />{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* RIGHT: ACTIONS */}{" "}
      <div className="flex items-center gap-4 text-sm font-medium">
        {" "}
        <Link href={"/products"}>
        <div className="hidden lg:flex items-center text-black gap-1 cursor-pointer hover:text-blue-600 border border-gray-300 px-3 py-1.5 rounded bg-white">
          {" "}
          <ChartBarIcon className="h-4 w-4" /> <span>Product Listing</span>{" "}
        </div></Link>{" "}

        <div className="relative cursor-pointer hover:text-blue-600">
          {" "}
          <BellIcon className="h-6 w-6 text-gray-600" />{" "}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>{" "}
        </div>{" "}
       <div className="flex items-center gap-4 text-sm font-medium">
         

          {/* AUTH LOGIC */}
          {user ? (
            <div className="flex items-center gap-3">
              <button onClick={() => setUser(null)} className="rounded-lg border bg-gray-100 px-5 py-2 font-semibold text-gray-700 hover:bg-gray-200 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/Register">
              <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                Login / Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>{" "}
    </div>{" "}
  </header>
);
};
const HeroServiceSection = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
      {" "}
      <div className="mb-6">
        {" "}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2 mb-2">
          {" "}
          <SparklesIcon className="h-8 w-8 text-purple-500" />{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-600">
            {" "}
            Need a fix? We&apos;ve got you!{" "}
          </span>{" "}
        </h2>{" "}
        <p className="text-gray-500 text-sm md:text-base max-w-3xl">
          {" "}
          India&apos;s first AI-powered sustainable repair service - we make device
          repairs affordable, convenient, and eco-friendly!{" "}
        </p>{" "}
      </div>{" "}
      <Link href={"/ServiceReq"}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        {" "}
        <button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
          {" "}
          <WrenchScrewdriverIcon className="h-5 w-5" /> Book Your Repair Now{" "}
          <span className="ml-1">→</span>{" "}
        </button>{" "}
        <div className="text-xs text-gray-400 font-medium flex items-center gap-2">
          {" "}
          <span>Get instant quotes</span> • <span>Same-day service</span> •{" "}
          <span>Doorstep repair</span>{" "}
        </div>{" "}
      </div>{" "}
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {" "}
               <Link href={"/ServiceReq"}>

        <button className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 p-1 text-white shadow-md hover:shadow-lg transition-all">
          {" "}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>{" "}
          <div className="relative h-full bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center gap-3">
            {" "}
            <WrenchScrewdriverIcon className="h-6 w-6" />{" "}
            <span className="font-bold text-lg">Book a Repair</span>{" "}
          </div>{" "}
        </button>
        </Link>{" "}
       <Link href={"/register-landing"}>
        <button className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 p-1 text-white shadow-md hover:shadow-lg transition-all">
          {" "}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>{" "}
          <div className="relative h-full bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center gap-3">
            {" "}
            <ArrowPathIcon className="h-6 w-6" />{" "}
            <span className="font-bold text-lg">Trade Your Device</span>{" "}
          </div>{" "}
        </button>{" "}
        </Link>
               <Link href={"/ExtendWarrenty"}>

        <button className="group pointer:cursor relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 p-1 text-white shadow-md hover:shadow-lg transition-all">
          {" "}
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>{" "}
          <div className="relative h-full bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-center gap-3">
            {" "}
            <ArchiveBoxIcon className="h-6 w-6" />{" "}
            <span className="font-bold text-lg">Extend Warrenty</span>{" "}
          </div>{" "}
        </button>{" "}
        </Link>
      </div>{" "}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {" "}
        <div className="bg-sky-50 rounded-xl p-4 border border-sky-100 flex items-center gap-4">
          {" "}
          <div className="p-2 bg-white rounded-full text-sky-600 shadow-sm">
            <BoltIcon className="h-5 w-5" />
          </div>{" "}
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">
              Active Repairs
            </p>
            <p className="text-xl font-bold text-gray-800">
              {stats.activeRepairs}
            </p>
          </div>{" "}
        </div>{" "}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 flex items-center gap-4">
          {" "}
          <div className="p-2 bg-white rounded-full text-emerald-600 shadow-sm">
            <SparklesIcon className="h-5 w-5" />
          </div>{" "}
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">
              Repairs Today
            </p>
            <p className="text-xl font-bold text-gray-800">
              {stats.repairsToday}
            </p>
          </div>{" "}
        </div>{" "}
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100 flex items-center gap-4">
          {" "}
          <div className="p-2 bg-white rounded-full text-purple-600 shadow-sm">
            <ClockIcon className="h-5 w-5" />
          </div>{" "}
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">
              Avg. Repair Time
            </p>
            <p className="text-xl font-bold text-gray-800">{stats.avgTime}</p>
          </div>{" "}
        </div>{" "}
        <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-center gap-4">
          {" "}
          <div className="p-2 bg-white rounded-full text-green-600 shadow-sm">
            {" "}
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>{" "}
          </div>{" "}
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase">
              E-Waste Saved
            </p>
            <p className="text-xl font-bold text-gray-800">{stats.saved}</p>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
// --- UPDATED COMPONENT: Registered Products ---
// FIX: Added default value `products = []` to prevent crash if data is missing
const RegisteredProducts = ({ products = [] }) => (
  <section className="mb-8">
     <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Your Registered Products</h3>
        <Link href="/add-appliance" className="text-blue-600 text-sm font-semibold hover:underline flex items-center">
           Add New Product <span className="ml-1">+</span>
        </Link>
     </div>
     
     {/* Safely check length now that we have a default empty array */}
     {products.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
           <p className="text-gray-500">No products registered yet.</p>
        </div>
     ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-all group">
               <div className={`absolute top-4 left-0 px-3 py-1 text-[10px] font-bold text-white rounded-r-md uppercase tracking-wide shadow-sm ${product.statusColor || 'bg-gray-500'}`}>
                  {product.status}
               </div>
               <div className="h-40 flex items-center justify-center my-4 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <span className="text-6xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    {product.img}
                  </span>
               </div>
               <div className="space-y-1 mb-4">
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 leading-snug">{product.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{product.model}</p>
               </div>
               <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
                  <div>
                     <p className="text-[10px] text-gray-400 uppercase font-semibold">Condition</p>
                     <p className="text-xs font-bold text-gray-700">{product.condition}</p>
                  </div>
                  <button className="px-5 py-1.5 border border-blue-500 text-blue-600 text-xs font-bold rounded hover:bg-blue-50 transition-colors">
                     {product.status === "Needs Service" ? "Book Repair" : "Details"}
                  </button>
               </div>
            </div>
          ))}
        </div>
     )}
  </section>
);

const QuickActionCard = () => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full flex flex-col justify-between hover:shadow-md transition-shadow">
    <div>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl"><DocumentTextIcon className="h-8 w-8 text-orange-500" /></div>
        <div><h3 className="font-bold text-gray-800 text-lg">Register Product</h3><p className="text-gray-500 text-sm">Upload invoice to activate warranty.</p></div>
      </div>
      <Link href="/products" className="w-full flex items-center justify-center gap-2 px-5 py-3 text-blue-600 font-semibold border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors">
        <ArrowUpTrayIcon className="h-5 w-5" /> Upload Invoice
      </Link>
    </div>
    <div className="border-t border-gray-100 my-4"></div>
    <div className="flex items-center justify-between">
      <div className="text-sm"><span className="block text-gray-500">Emergency Support?</span><span className="font-bold text-gray-900 text-lg">09240250346</span></div>
      <button className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 border border-blue-100 animate-pulse"><PhoneIcon className="h-6 w-6" /></button>
    </div>
  </div>
);
const LiveTrackingMap = () => (
  <div className="relative w-full h-[320px] bg-slate-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner group">
    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    {/* Roads */}
    <div className="absolute top-1/2 left-0 right-0 h-6 bg-white shadow-sm border-y border-gray-300 -rotate-2"></div>
    <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white shadow-sm border-x border-gray-300 rotate-6"></div>
    
    {/* Tech Marker */}
    <div className="absolute top-[30%] right-[30%] z-20 flex flex-col items-center">
       <div className="bg-orange-500 p-2 rounded-full border-2 border-white shadow-xl"><WrenchScrewdriverIcon className="h-4 w-4 text-white" /></div>
       <div className="bg-gray-900 text-white text-[10px] px-2 py-1 rounded-full mt-1 font-semibold shadow-lg">5 mins away</div>
    </div>
    
    {/* Tech Card Overlay */}
    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 max-w-[200px] z-30">
       <div className="flex items-center gap-3 mb-2">
         <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden"><Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh" alt="Tech"
            height={30}
                  width={30} /></div>
         <div><h4 className="font-bold text-gray-800 text-sm">Rajesh Kumar</h4><p className="text-[10px] text-emerald-600 font-bold flex items-center"><ShieldCheckIcon className="h-3 w-3 mr-1" /> Vaccinated</p></div>
       </div>
       <div className="flex justify-between items-center text-xs border-t border-gray-200 pt-2">
          <span>Arriving: <b>10:45 AM</b></span>
          <button className="text-blue-600 font-bold hover:underline">Call</button>
       </div>
    </div>
    <div className="absolute bottom-4 left-4 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-medium text-gray-600">
      Tracking Order #SRV-2024-001
    </div>
  </div>
);

// --- NEW: Testimonials (Matches "Customers say" Image) ---
const TestimonialsSection = () => (
  <section className="mb-12">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">What our customers have to say</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((t) => (
        <div key={t.id} className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif leading-none">“</div>
          <div className="relative z-10">
            <h4 className="font-bold text-gray-800 text-lg mb-2 relative">
              <span className={`absolute inset-0 opacity-20 -skew-y-2 rounded ${t.bg}`}></span>
              <span className="relative">{t.quote}</span>
            </h4>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{t.text}</p>
            <p className="text-sm font-bold text-gray-400">- {t.author}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// --- WOW FACTOR: AI Diagnostic Banner ---
const AiBanner = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white p-8 md:p-12 mb-12 shadow-2xl">
    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    
    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wide mb-4 border border-blue-500/30">
          <CpuChipIcon className="h-4 w-4" /> Beta Feature
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          Not sure what&apos;s wrong? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ask our AI Technician.</span>
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Upload a photo or describe the sound your appliance is making. Our AI will diagnose the issue instantly.
        </p>
        <button className="group bg-white text-gray-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors">
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" />
          Start Diagnosis
        </button>
      </div>
      
      {/* Visual Tech Element */}
      <div className="hidden md:block relative">
         <div className="w-32 h-32 border-4 border-blue-500/30 rounded-full flex items-center justify-center animate-spin-slow">
            <div className="w-24 h-24 border-4 border-purple-500/50 rounded-full border-t-transparent animate-spin"></div>
         </div>
         <BeakerIcon className="h-10 w-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 py-12 border-t border-gray-700 rounded-t-3xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-2xl font-bold text-white mb-4">ElectroCare</h3>
        <p className="text-gray-400 text-sm max-w-xs mb-6">
          India&apos;s most trusted electronic repair & warranty management platform. Sustainable, fast, and reliable.
        </p>
        <div className="flex gap-4">
          {/* Social Placeholders */}
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">𝕏</div>
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors cursor-pointer">f</div>
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">In</div>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
          <li><Link href="#" className="hover:text-blue-400 transition-colors">Services</Link></li>
          <li><Link href="#" className="hover:text-blue-400 transition-colors">Book a Repair</Link></li>
          <li><Link href="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-4">Contact</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2"><PhoneIcon className="h-4 w-4" /> 09240250346</li>
          <li className="flex items-center gap-2"><MapPinIcon className="h-4 w-4" /> Ahmedabad, Gujarat</li>
          <li className="flex items-center gap-2">✉️ support@electrocare.in</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-12 pt-8 text-center text-xs text-gray-500">
      &copy; 2025 ElectroCare Services Pvt Ltd. All rights reserved.
    </div>
  </footer>
);// --- MAIN PAGE ---
export default function DashboardPage() {
  const [user] = useState({ name: "Abhay Parmar" });
  const [products, setProducts] = useState(defaultProducts);

  // Load registered products from Local Storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProducts = localStorage.getItem("userRegisteredProducts");
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          // Combine default items with user items
          setProducts([...defaultProducts, ...parsed]);
        } catch (e) {
          console.error("Failed to parse products", e);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopHeader />
      <div className="w-full h-44 bg-gradient-to-r from-blue-900 to-blue-700 rounded-none flex items-center justify-center text-white font-bold text-xl shadow-inner">
        Say GoodBye to Device Worries!
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="flex justify-between items-end">
           <div>
             <h1 className="text-xl font-bold text-gray-800">Welcome, {user.name}</h1>
             <p className="text-sm text-gray-500">Ahmedabad &gt; Dashboard</p>
           </div>
           <p className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full animate-pulse">
             ● System Operational
           </p>
        </div>

        <HeroServiceSection />
        
        {/* FIX: Passing the products prop correctly here */}
        <RegisteredProducts products={products} />

        <section>
           <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BoltIcon className="h-5 w-5 text-orange-500" /> Live Actions
           </h3>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[350px]">
              <div className="lg:col-span-1 h-full"><QuickActionCard /></div>
              <div className="lg:col-span-2 h-full"><LiveTrackingMap /></div>
           </div>
        </section>

        <AiBanner />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}