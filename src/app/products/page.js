"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // ✅ React Query
import {
  WrenchScrewdriverIcon, DocumentTextIcon, ArrowDownTrayIcon, PlusIcon, ShieldCheckIcon, TruckIcon,
  ClockIcon, SparklesIcon, ChevronRightIcon, MapPinIcon, ArrowUpTrayIcon, CheckCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

// --- API FETCHERS ---
const fetchProducts = async (email) => {
  if (!email) return [];
  const res = await fetch(`/api/products?userId=${email}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const fetchServices = async (email) => {
  if (!email) return [];
  const res = await fetch(`/api/service/list?userId=${email}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
};

// --- SUB COMPONENTS ---
const GarageHero = () => (
  <section className="bg-gray-900 text-white py-12 md:py-16 px-6 md:px-12 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
    <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
      <div>
        <p className="text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">My Digital Garage</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">All your devices,<br/>managed in one place.</h1>
      </div>
      <Link href="/add-appliance" className="w-full md:w-auto">
        <button className="w-full md:w-auto bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl">
          <PlusIcon className="h-5 w-5" /> Add New Product
        </button>
      </Link>
    </div>
  </section>
);

// --- ACTIVE SERVICE SECTION (With React Query Data) ---
const ActiveServiceSection = ({ requests }) => {
  if (!requests || requests.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 relative z-20 mb-10">
      <div className="flex items-center gap-2 mb-4">
         <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span></span>
         <h3 className="text-white font-bold text-lg drop-shadow-md">Active Service Requests</h3>
      </div>
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => {
           if (!req?._id) return null;
           const isOnWay = req?.status === 'on_way';
           const isTechAssigned = ['upcoming', 'on_way', 'in_progress', 'accepted'].includes(req?.status || '');

           return (
             <div key={req._id} className="min-w-[300px] md:min-w-0 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                <div className={`px-5 py-3 border-b flex justify-between items-center ${isOnWay ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                   <div className="flex items-center gap-2">
                      {isOnWay ? <div className="animate-bounce"><MapPinIcon className="h-5 w-5 text-green-600"/></div> : <ClockIcon className="h-5 w-5 text-gray-500"/>}
                      <span className={`text-xs font-bold uppercase tracking-wider ${isOnWay ? 'text-green-700' : 'text-gray-600'}`}>{req?.status === 'pending' ? 'Looking for Tech' : (req?.status || '').replace('_', ' ')}</span>
                   </div>
                   <span className="text-[10px] text-gray-400 font-mono">#{req._id?.slice(-4)?.toUpperCase() || 'N/A'}</span>
                </div>
                <div className="p-5">
                   <div className="flex items-start gap-4 mb-4">
                      <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl shrink-0">📦</div>
                      <div>
                         <h4 className="font-bold text-gray-800 line-clamp-1">{req?.productName || "Product"}</h4>
                         <p className="text-xs text-gray-500 line-clamp-1">{req?.issueDescription || "No description"}</p>
                      </div>
                   </div>
                   {isTechAssigned ? (
                      <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
                         <div className="h-10 w-10 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold">{req?.technicianName ? req.technicianName.charAt(0) : "T"}</div>
                         <div className="flex-1"><p className="text-xs text-blue-500 font-bold uppercase">Technician</p><p className="text-sm font-bold text-gray-800">{req?.technicianName || "Assigned"}</p></div>
                      </div>
                   ) : (
                      <div className="bg-yellow-50 rounded-xl p-3 flex items-center gap-3 border border-yellow-100 border-dashed">
                         <div className="animate-spin-slow"><SparklesIcon className="h-5 w-5 text-yellow-500"/></div>
                         <p className="text-xs text-yellow-700 font-medium">Matching with best expert nearby...</p>
                      </div>
                   )}
                </div>
                {req?.productId && (
                  <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 text-center">
                     <Link href={`/products/${req.productId}`} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1">View Full Details <ChevronRightIcon className="h-3 w-3"/></Link>
                  </div>
                )}
             </div>
           );
        })}
      </div>
    </section>
  );
};

// --- PRODUCT GRID (With Upload Logic) ---
const ProductGrid = ({ products, loading, onUpload }) => {
  const fileRef = useRef(null);

  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Products</h2>
      
      {/* Hidden File Input for uploading */}
      <input 
        type="file" 
        ref={fileRef} 
        className="hidden" 
        accept=".pdf,.jpg,.png"
        onChange={(e) => {
           if(e.target.files?.[0]) onUpload(e.target.files[0]);
        }} 
      />

      {loading ? (
        <div className="text-center py-20">Loading your garage...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-xl">
           <p className="text-gray-500 mb-4">No products found.</p>
           <Link href="/add-appliance" className="text-blue-600 font-bold hover:underline">Add your first product</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {products.map((product) => {
              const isServiceActive = product?.hasActiveService;
              const isProtected = product?.hasActiveWarranty || product?.warrantyStatus === 'active';
              const hasInvoice = !!product?.invoiceUrl;
              
              let cardBorder = "border-gray-200";
              if (isServiceActive) cardBorder = "border-orange-400 ring-1 ring-orange-100";
              else if (isProtected) cardBorder = "border-emerald-200";

              if (!product?._id) return null;

              return (
                <div key={product._id} className={`group bg-white rounded-2xl border ${cardBorder} overflow-hidden hover:shadow-xl transition-all duration-300 relative flex flex-col h-full`}>
                   <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                      {isServiceActive && <div className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-orange-500 text-white shadow-sm flex items-center gap-1 animate-pulse"><WrenchScrewdriverIcon className="h-3 w-3" /> Repairing</div>}
                      {!isServiceActive && <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase text-white shadow-sm ${isProtected ? "bg-emerald-600" : "bg-blue-600"}`}>{isProtected ? "Protected" : product?.warrantyStatus || "Unknown"}</div>}
                   </div>

                   <div className="h-48 bg-gray-50 flex items-center justify-center relative">
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{product?.image || "📦"}</span>
                   </div>
                   
                   <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-gray-900 line-clamp-1">{product?.name}</h3>
                      <p className="text-xs text-gray-500 mb-4">{product?.model}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-auto">
                         <Link href={`/products/${product._id}`}>
                            <button className="w-full py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 border border-gray-200">Details</button>
                         </Link>
                         {isServiceActive ? (
                            <Link href={`/products/${product._id}`}>
                               <button className="w-full h-full py-2 bg-orange-50 text-orange-700 border border-orange-200 text-xs font-bold rounded-lg hover:bg-orange-100 flex items-center justify-center gap-1"><TruckIcon className="h-3 w-3" /> Track</button>
                            </Link>
                         ) : isProtected ? (
                            <Link href="/ServiceReq">
                               <button className="w-full h-full py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg hover:bg-emerald-100 flex items-center justify-center gap-1"><WrenchScrewdriverIcon className="h-3 w-3" /> Repair</button>
                            </Link>
                         ) : (
                            <Link href={`/ExtendWarrenty/purchase?productId=${product._id}`}>
                               <button className="w-full h-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1"><ShieldCheckIcon className="h-3 w-3" /> Extend</button>
                            </Link>
                         )}
                      </div>

                      {/* UPLOAD INVOICE BUTTON */}
                      {!hasInvoice && (
                        <button 
                          onClick={() => onUpload(product._id)}
                          className="mt-3 w-full py-2 border border-dashed border-gray-300 text-gray-500 text-[10px] font-bold rounded-lg hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-1 transition-colors"
                        >
                          <ArrowUpTrayIcon className="h-3 w-3" /> Upload Invoice
                        </button>
                      )}
                      {hasInvoice && (
                         <div className="mt-3 w-full py-2 bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1">
                            <CheckCircleIcon className="h-3 w-3" /> Invoice Saved
                         </div>
                      )}
                   </div>
                </div>
              );
           })}
           <Link href="/add-appliance" className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 bg-gray-50/50">
              <PlusIcon className="h-8 w-8 mb-2" />
              <span className="font-bold text-sm">Register New Product</span>
           </Link>
        </div>
      )}
    </section>
  );
};

// --- INVOICE VAULT ---
const InvoiceVault = ({ products }) => {
  const productsWithInvoices = products.filter(p => p.invoiceUrl);
  return (
    <section className="bg-gray-50 py-16 md:py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-8"><DocumentTextIcon className="h-6 w-6 text-blue-600" /> Document Vault</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
           <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                 <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Action</th></tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                 {productsWithInvoices.length === 0 ? <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">No invoices yet. Upload from product card.</td></tr> : 
                    productsWithInvoices.map(p => (
                       <tr key={p._id} className="border-b border-gray-100">
                          <td className="px-6 py-4 font-semibold">{p.name} Invoice</td>
                          <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Verified</span></td>
                          <td className="px-6 py-4"><a href={p.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold flex items-center gap-1 hover:underline"><ArrowDownTrayIcon className="h-4 w-4"/> View / Download</a></td>
                       </tr>
                    ))
                 }
              </tbody>
           </table>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 pt-16 pb-8 text-center text-gray-400 text-sm">
    <p>&copy; 2025 ElectroCare Services Pvt Ltd. All rights reserved.</p>
  </footer>
);

// --- MAIN PAGE EXPORT ---
export default function ProductListingPage() {
  const { data: session, status } = useSession(); 
  const router = useRouter();
  const queryClient = useQueryClient();

  // ✅ 1. React Query for Products
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products', session?.user?.email],
    queryFn: () => fetchProducts(session?.user?.email),
    enabled: !!session?.user?.email,
    staleTime: 60000, 
  });

  // ✅ 2. React Query for Services (Auto-refresh)
  const { data: services = [] } = useQuery({
    queryKey: ['services', session?.user?.email],
    queryFn: () => fetchServices(session?.user?.email),
    enabled: !!session?.user?.email,
    refetchInterval: 5000, 
  });

  // ✅ 3. Mutation for Invoice Upload
  const uploadMutation = useMutation({
    mutationFn: async (productId) => {
      const res = await fetch("/api/invoice/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Upload Failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']); // Refresh products to show "Invoice Saved"
      alert("Invoice Uploaded Successfully! (Mock)");
    }
  });

  // Handler for Upload Button
  const handleUploadClick = (productId) => {
    // In real app, you would open file dialog here.
    // For now, we simulate upload directly.
    if(confirm("Upload invoice for this product?")) {
        uploadMutation.mutate(productId);
    }
  };

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (status === "unauthenticated") { router.push("/Login"); return null; }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <GarageHero />
      <ActiveServiceSection requests={services} />
      <ProductGrid 
        products={products} 
        loading={productsLoading} 
        onUpload={handleUploadClick} 
      />
      <InvoiceVault products={products} />
      <Footer />
    </div>
  );
}