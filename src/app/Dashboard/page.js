"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  MapPinIcon,
  MagnifyingGlassIcon,
  BellIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
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

// --- HELPERS ---
const getStatusColor = (status) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("active")) return "bg-emerald-600";
  if (s.includes("expired")) return "bg-red-500";
  if (s.includes("service")) return "bg-orange-500";
  return "bg-blue-600";
};

// --- COMPONENTS ---

// FIX: Removed TypeScript syntax ": { user: any }"
const TopHeader = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Left Side: Logo */}
      <div className="flex items-center shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo2.png"
            alt="ElectroCare Logo"
            height={30}
            width={30}
            className="h-10 w-10 object-contain rounded-full border border-gray-100 shadow-sm"
          />
          <div className="flex items-center">
            <span className="text-red-500 font-bold text-2xl tracking-tighter">Electro</span>
            <span className="text-blue-600 font-bold text-2xl tracking-tighter">Care</span>
          </div>
        </Link>
      </div>

      {/* Right Side: Icons & User */}
      <div className="flex items-center gap-4">
        {/* Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search your products..."
            className="bg-transparent text-black border-none focus:ring-0 text-sm w-64 outline-none"
          />
        </div>

        {/* Product Link */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href={"/products"}>
            <div className="hidden lg:flex items-center text-black gap-1 cursor-pointer hover:text-blue-600 border border-gray-300 px-3 py-1.5 rounded bg-white">
              <ChartBarIcon className="h-4 w-4" /> <span>Product Listing</span>
            </div>
          </Link>
        </div>

        {/* Notification Bell */}
        <button className="p-2 relative hover:bg-gray-100 rounded-full transition-colors">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* ✅ USER DROPDOWN SECTION */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm hover:ring-2 hover:ring-offset-2 hover:ring-blue-500 transition-all focus:outline-none"
          >
            {(user?.name ? user.name.charAt(0).toUpperCase() : "U")}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 origin-top-right">
              {/* User Info Header */}
              <div className="px-4 py-2 border-b border-gray-100 mb-1">
                <p className="text-sm font-bold text-gray-900 truncate">{user?.name || "Guest"}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || ""}</p>
              </div>

              {/* Menu Items */}
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
              >
                Profile Settings
              </Link>
              
              <button
                onClick={() => signOut({ callbackUrl: "/Login" })}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Close menu when clicking outside */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

const HerServiceSection = ({ user }) => {
  const stats = { activeRepairs: 59, repairsToday: 80, avgTime: "8", saved: "5" };

  return (
    <section className="bg-gray-900 text-white rounded-3xl relative overflow-hidden shadow-2xl mb-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10 px-6 py-10 md:p-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Left: Text & CTA */}
          <div className="max-w-xl w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-blue-300 mb-6">
               <SparklesIcon className="h-4 w-4" />
               <span>AI-Powered Service</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Welcome back, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {user?.name || "Abhay Parmar"}
              </span>
            </h1>
            
            <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed">
              Your devices are running smoothly. System status is operational. 
              Need a quick fix or a maintenance check?
            </p>
            
            <Link href="/ServiceReq">
              <button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold shadow-lg shadow-white/10 flex items-center gap-2 transition-all transform hover:-translate-y-1">
                <WrenchScrewdriverIcon className="h-5 w-5" /> Book a Repair
              </button>
            </Link>
            <br />
            
            {/* ACTION BUTTONS GRID */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link href="/register-landing" className="w-full sm:w-auto">
                  <button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
                    <ArrowUpTrayIcon className="h-5 w-5" /> 
                    <span>Register Device</span>
                  </button>
                </Link>

                 <Link href="/products" className="w-full sm:w-auto">
                  <button className="w-full bg-white text-gray-900 hover:bg-gray-100 px-6 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
                    <ArrowUpTrayIcon className="h-5 w-5 text-blue-600" /> 
                    <span>Product Listing</span>
                  </button>
                </Link>

                <Link href="/warrenty-landing" className="w-full sm:w-auto">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 px-6 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
                    <ShieldCheckIcon className="h-5 w-5" /> 
                    <span>Extend Warranty</span>
                  </button>
                </Link>
            </div>
          </div>

          {/* Right: Glassmorphism Stats Grid */}
          <div className="w-full lg:w-auto grid grid-cols-2 gap-4 mt-8 lg:mt-0">
             {[
               { label: "Active Discount", val: stats.activeRepairs, icon: BoltIcon, color: "text-yellow-400" },
               { label: "Product Quality", val: stats.repairsToday, icon: SparklesIcon, color: "text-emerald-400" },
               { label: "Product Count", val: stats.avgTime, icon: ClockIcon, color: "text-purple-400" },
               { label: "E-VAULT", val: stats.saved, icon: ArchiveBoxIcon, color: "text-green-400" },
             ].map((s, i) => (
               <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex flex-col justify-center min-w-[140px] hover:bg-white/10 transition-colors">
                  <s.icon className={`h-6 w-6 ${s.color} mb-3`} />
                  <p className="text-2xl font-bold">{s.val}</p>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{s.label}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const RegisteredProducts = ({ products = [], loading }) => (
  <section className="mb-8 px-4 md:px-0">
     <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Your Registered Products</h3>
        <Link href="/add-appliance" className="text-blue-600 text-sm font-semibold hover:underline flex items-center">
           Add New Product <span className="ml-1">+</span>
        </Link>
     </div>
     
     {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
        </div>
     ) : products.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
           <p className="text-gray-500">No products registered yet.</p>
           <Link href="/add-appliance" className="text-blue-600 font-bold mt-2 inline-block">Register First Device</Link>
        </div>
     ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => {
            const displayColor = getStatusColor(product.warrantyStatus);
            return (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-all group">
               <div className={`absolute top-4 left-0 px-3 py-1 text-[10px] font-bold text-white rounded-r-md uppercase tracking-wide shadow-sm ${displayColor}`}>
                  {product.warrantyStatus}
               </div>
               <div className="h-40 flex items-center justify-center my-4 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <span className="text-6xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    {product.image || "📦"}
                  </span>
               </div>
               <div className="space-y-1 mb-4">
                  <h4 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 leading-snug">{product.name}</h4>
                  <p className="text-xs text-gray-500 truncate">{product.model}</p>
               </div>
               <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
                  <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Price</p>
                      <p className="text-xs font-bold text-gray-700">₹{product.price?.toLocaleString() || "N/A"}</p>
                  </div>
                  <Link href="/ExtendedWarrenty/purchase">
                    <button className="px-5 py-1.5 border border-blue-500 text-blue-600 text-xs font-bold rounded hover:bg-blue-50 transition-colors">
                        Warranty
                    </button>
                  </Link>
               </div>
            </div>
            );
          })}
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
  <div className="hidden md:block relative w-full h-[320px] bg-slate-100 rounded-2xl overflow-hidden border border-gray-200 shadow-inner group">
    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    <div className="absolute top-1/2 left-0 right-0 h-6 bg-white shadow-sm border-y border-gray-300 -rotate-2"></div>
    <div className="absolute top-0 bottom-0 left-1/3 w-6 bg-white shadow-sm border-x border-gray-300 rotate-6"></div>
    
    <div className="absolute top-[30%] right-[30%] z-20 flex flex-col items-center">
       <div className="bg-orange-500 p-2 rounded-full border-2 border-white shadow-xl"><WrenchScrewdriverIcon className="h-4 w-4 text-white" /></div>
       <div className="bg-gray-900 text-white text-[10px] px-2 py-1 rounded-full mt-1 font-semibold shadow-lg">5 mins away</div>
    </div>
    
    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 max-w-[200px] z-30">
       <div className="flex items-center gap-3 mb-2">
         <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
          <Image
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh`}
            alt="Avatar"
            width={40}
            height={40}
            unoptimized
          />
         </div>
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

const TestimonialsSection = () => {
    const testimonials = [
        { id: 1, quote: "Provides doorstep delivery", text: "Can order from anywhere...", author: "Subhash Sehgal", bg: "bg-blue-50" },
        { id: 2, quote: "Used the app and found it easy", text: "Excellent app...", author: "Snehal Shah", bg: "bg-green-50" },
        { id: 3, quote: "Customer friendly", text: "Best during lockdown...", author: "Laksh Kankariya", bg: "bg-purple-50" },
    ];
    return (
      <section className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">What our customers have to say</h3>
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x no-scrollbar">
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
};

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
      
      <div className="relative">
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
);

// --- MAIN PAGE ---
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/Login");
    }
  }, [status, router]);

  // REAL API FETCH - NO MOCK DATA
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <TopHeader user={session.user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="flex justify-between items-end">
           <div>
             <h1 className="text-xl font-bold text-gray-800">Welcome, {session.user?.name}</h1>
             <p className="text-sm text-gray-500">Ahmedabad &gt; Dashboard</p>
           </div>
           <p className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full animate-pulse">
             ● System Operational
           </p>
        </div>
        <HerServiceSection user={session.user} />
        
        {/* Pass fetched products to component */}
        <RegisteredProducts products={products} loading={loading} />

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