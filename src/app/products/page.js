"use client";
import Navbar from "@/components/Navbar";

import React, { useState, useEffect } from "react";
import {
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  PlusIcon,
  ShieldCheckIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { format } from "date-fns";

// --- HELPERS ---
const getStatusColor = (status) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("active")) return "text-emerald-600 bg-emerald-50";
  if (s.includes("expired")) return "text-red-600 bg-red-50";
  return "text-blue-600 bg-blue-50";
};

// --- COMPONENTS ---

const GarageHero = () => (
  <section className="bg-gray-900 text-white py-12 md:py-16 px-6 md:px-12 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

    <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
      <div>
        <p className="text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">My Digital Garage</p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">All your devices,<br/>managed in one place.</h1>
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-gray-800 rounded-lg"><ShieldCheckIcon className="h-5 w-5 text-green-400" /></div>
             <div><p className="text-xs text-gray-400">Protection Value</p><p className="font-bold text-sm md:text-base">₹2,64,380</p></div>
          </div>
          <div className="flex items-center gap-2">
             <div className="p-2 bg-gray-800 rounded-lg"><DocumentTextIcon className="h-5 w-5 text-blue-400" /></div>
             <div><p className="text-xs text-gray-400">Total Documents</p><p className="font-bold text-sm md:text-base">Safe & Secure</p></div>
          </div>
        </div>
      </div>
      
      <Link href="/add-appliance" className="w-full md:w-auto">
        <button className="w-full md:w-auto bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl">
          <PlusIcon className="h-5 w-5" /> Add New Product
        </button>
      </Link>
    </div>
  </section>
);

// Placeholder for future Service integration (Static for now)
const ActiveServiceSection = () => (
  <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-12">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-800 font-bold text-sm md:text-base">
          <WrenchScrewdriverIcon className="h-5 w-5 animate-pulse" />
          <span>Live Service Updates</span>
        </div>
        <span className="text-xs font-semibold bg-white px-2 py-1 rounded text-orange-600">Demo</span>
      </div>
      <div className="p-6 text-center text-gray-500 text-sm">
        No active service requests at the moment.
      </div>
    </div>
  </section>
);

const ProductGrid = ({ products, loading }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
          <p className="text-gray-500 text-sm mt-1">Manage warranty, book service, or view details.</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><FunnelIcon className="h-5 w-5" /></button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by: Date</button>
        </div>
      </div>

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
             const statusColor = getStatusColor(product.warrantyStatus);
             const date = product.purchaseDate ? format(new Date(product.purchaseDate), 'dd MMM yyyy') : "N/A";

             return (
              <div key={product._id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
                
                <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden shrink-0">
                    <span className="text-7xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                        {product.image || "📦"}
                    </span>
                    <div className={`absolute top-4 left-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${statusColor}`}>
                       {product.warrantyStatus}
                    </div>
                    <button className="absolute top-4 right-4 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-blue-600">
                       <EllipsisHorizontalIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold text-gray-900 line-clamp-1 text-sm md:text-base" title={product.name}>{product.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-1">{product.model}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3 mb-4 mt-auto">
                       <span>Purchased: {date}</span>
                       <span className="font-semibold text-gray-900">₹{product.price?.toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-auto">
                       <button className="w-full py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors">
                          Details
                       </button>
                       {product.warrantyStatus === 'Expired' ? (
                           <Link href="/ExtendWarrenty/purchase" className="w-full">
                               <button className="w-full h-full py-2 bg-orange-500 text-white text-xs font-bold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-1">
                                   <ShieldCheckIcon className="h-3 w-3" /> Renew
                               </button>
                           </Link>
                       ) : (
                           <Link href="/ServiceReq" className="w-full">
                               <button className="w-full h-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                                   <WrenchScrewdriverIcon className="h-3 w-3" /> Repair
                               </button>
                           </Link>
                       )}
                    </div>
                </div>
              </div>
            )})}
            
            <Link href="/add-appliance" className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer bg-gray-50/50">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                   <PlusIcon className="h-8 w-8" />
                </div>
                <span className="font-bold text-sm md:text-base">Register New Product</span>
            </Link>
        </div>
      )}
    </section>
  );
};

// --- UPDATED INVOICE VAULT (Now Uses Real Data) ---
const InvoiceVault = ({ products }) => {
  // Filter products that actually have an invoiceUrl
  const productsWithInvoices = products.filter(p => p.invoiceUrl);

  return (
    <section className="bg-gray-50 py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <DocumentTextIcon className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
                    Document Vault
                </h2>
                <p className="text-gray-500 text-xs md:text-sm mt-1">Securely accessed invoices and warranty cards.</p>
            </div>
            <Link href="/add-appliance">
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm transition-colors w-full md:w-auto">
                    Upload New Document
                </button>
            </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4">Document Name</th>
                        <th className="px-6 py-4">Linked Product</th>
                        <th className="px-6 py-4 hidden md:table-cell">Date Added</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {productsWithInvoices.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                                No invoices found. Register a product with an invoice to see it here.
                            </td>
                        </tr>
                    ) : (
                        productsWithInvoices.map((product) => (
                        <tr key={product._id} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-6 py-4 font-medium flex items-center gap-3">
                                <div className="p-2 bg-red-50 rounded text-red-600 shrink-0"><DocumentTextIcon className="h-5 w-5" /></div>
                                <span className="truncate max-w-[150px] md:max-w-none">
                                    Invoice_{product.model}.pdf
                                </span>
                            </td>
                            <td className="px-6 py-4 text-gray-500">{product.name}</td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                {product.createdAt ? format(new Date(product.createdAt), 'dd MMM yyyy') : "-"}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href={product.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-bold flex items-center justify-end gap-1 w-full">
                                    <ArrowDownTrayIcon className="h-4 w-4" /> <span className="hidden sm:inline">View / Download</span>
                                </a>
                            </td>
                        </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
      <p>&copy; 2025 ElectroCare Services Pvt Ltd. All rights reserved.</p>
    </div>
  </footer>
);

// --- MAIN PAGE ---
export default function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DATA FROM DB
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

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Navbar />
      <GarageHero />
      <ActiveServiceSection />
      
      {/* Pass fetched data to components */}
      <ProductGrid products={products} loading={loading} />
      <InvoiceVault products={products} />
      
      <Footer />
    </div>
  );
}