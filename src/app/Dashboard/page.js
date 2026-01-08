"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query"; // ✅ Import React Query
import {
  MapPinIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  ArchiveBoxIcon,
  BoltIcon,
  ClockIcon,
  PhoneIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ChevronRightIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react"; // Needed for AiBanner state
import Navbar from "@/components/Navbar";

// --- API FETCHER FUNCTION ---
const fetchProducts = async (email) => {
  if (!email) return [];
  const res = await fetch(`/api/products?userId=${email}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};

// --- COMPONENTS ---

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
            
            <Link href="/service-landing">
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
                  <button className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/20 px-6 py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1">
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

const RegisteredProducts = ({ products, isLoading }) => {
  const displayedProducts = products?.slice(0, 6) || [];
  
  return (
    <section className="mb-8 px-4 md:px-0">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Your Registered Products</h3>
        <Link href="/add-appliance" className="text-blue-600 text-sm font-semibold hover:underline">Add New +</Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>)}
        </div>
      ) : displayedProducts.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 border-2 border-dashed rounded-xl">No products found.</div>
      ) : (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm border-blue-600">    
           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {displayedProducts.map((product) => {
              
              // 1. Check Status
              const isProtected = product?.hasActiveWarranty || product?.hasExtendedWarranty || product?.warrantyStatus === 'active';
              
              // 2. Status Badge Color
              let statusColor = "bg-blue-600"; 
              if (isProtected) statusColor = "bg-emerald-600";
              else if (product?.warrantyStatus === 'Expired') statusColor = "bg-red-500";

              return (
                <div key={product?._id} className="bg-white border border-gray-200 rounded-lg p-4 relative hover:shadow-md transition-all group flex flex-col justify-between">
                  
                  {/* Badge */}
                  <div className={`absolute top-4 left-0 px-3 py-1 text-[10px] font-bold text-white rounded-r-md uppercase tracking-wide shadow-sm ${statusColor}`}>
                    {isProtected ? "Protected" : product?.warrantyStatus || "Unknown"}
                  </div>

                  {/* Image */}
                  <div className="h-32 md:h-40 flex items-center justify-center my-4 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <span className="text-5xl md:text-6xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                      {product?.image || "📦"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-1 mb-4">
                    <h4 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 leading-snug">
                      {product?.name || "Unnamed Product"}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{product?.model || "N/A"}</p>
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
                    
                    {/* Price Section */}
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-semibold">Price</p>
                      <p className="text-xs font-bold text-gray-700">
                        ₹{product.price?.toLocaleString() || "N/A"}
                      </p>
                    </div>

                    {/* Action Buttons Group */}
                    <div className="flex gap-2">
                        
                        {/* Details Button (Always Visible) */}
                        {product?._id && (
                          <Link href={`/products/${product._id}`}>
                             <button className="px-3 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded hover:bg-gray-200 transition-colors">
                               Details
                             </button>
                          </Link>
                        )}

                        {isProtected ? (
                           <Link href="/ServiceReq">
                             <button className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold rounded hover:bg-emerald-100 transition-colors flex items-center gap-1">
                               <WrenchScrewdriverIcon className="h-3 w-3" />
                               <span>Repair</span>
                             </button>
                           </Link>
                        ) : (
                           product?._id && (
                             <Link href={`/ExtendWarrenty/purchase?productId=${product._id}`}>
                               <button className="px-3 py-1.5 border border-blue-500 text-blue-600 text-[10px] font-bold rounded hover:bg-blue-50 transition-colors flex items-center gap-1">
                                 <ShieldCheckIcon className="h-3 w-3" />
                                 <span>Extend</span>
                               </button>
                             </Link>
                           )
                        )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link href="/products" className="flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group">
              View all registered products
              <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

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

const AiBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDiagnosis = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(""); 

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem: input }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.result || "Could not diagnose.");
      } else {
        setResponse("Error: " + data.error);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              Describe the sound or issue your appliance is making. Our AI will diagnose it instantly.
            </p>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group bg-white text-gray-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
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

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-fade-in-up">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <CpuChipIcon className="h-6 w-6" />
                <h3 className="font-bold text-lg">AI Technician</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {response ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm font-bold text-blue-800 mb-1">Diagnosis:</p>
                    <p className="text-gray-800 leading-relaxed">{typeof response === 'object' ? JSON.stringify(response) : response}</p>
                  </div>
                  <button 
                    onClick={() => { setResponse(""); setInput(""); }}
                    className="w-full py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200"
                  >
                    Ask Another Question
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDiagnosis}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe the problem (e.g., &quot;Washing machine making loud banging noise&quot;)
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none bg-gray-50 text-gray-900"
                    placeholder="Type here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !input.trim()}
                    className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Analyzing..." : <><PaperAirplaneIcon className="h-5 w-5" /> Analyze Issue</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- MAIN PAGE ---
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect Logic
  if (status === "unauthenticated") {
    router.push("/Login");
    return null;
  }

  // ✅ React Query Hook for Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', session?.user?.email], 
    queryFn: () => fetchProducts(session?.user?.email), 
    enabled: !!session?.user?.email, 
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });

  if (status === "loading") return <div className="h-screen flex items-center justify-center">Loading User...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        <div className="flex justify-between items-end">
           <div>
             <h1 className="text-xl font-bold text-gray-800">Welcome, {session?.user?.name}</h1>
             <p className="text-sm text-gray-500">Ahmedabad &gt; Dashboard</p>
           </div>
           <p className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full animate-pulse">
             ● System Operational
           </p>
        </div>

        <HerServiceSection user={session?.user} />
        
        {/* React Query Data Passed Here */}
        <RegisteredProducts products={products} isLoading={isLoading} />

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
    </div>
  );
}