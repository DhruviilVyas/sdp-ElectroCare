"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation"; 
import { useQuery } from "@tanstack/react-query"; // ✅ React Query
import Navbar from "@/components/Navbar";
import { 
  ArrowLeftIcon,
  CalendarDaysIcon, 
  QrCodeIcon, 
  ShieldCheckIcon, 
  WrenchScrewdriverIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  DocumentCheckIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { format } from "date-fns";

// --- 1. TYPES ---
interface ServiceDetails {
  _id: string;
  status: string;
  issueDescription: string;
  preferredSlot: string;
  technicianName?: string;
  technicianPhone?: string;
}

interface WarrantyDetails {
  planName: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
}

interface ProductData {
  _id: string;
  name: string;
  model: string;
  image: string;
  serialNumber: string;
  purchaseDate: string;
  warrantyStatus: string;
  hasExtendedWarranty: boolean;
  extendedWarrantyDetails?: WarrantyDetails;
  hasActiveService: boolean;
  activeServiceDetails?: ServiceDetails;
}

// --- 2. FETCH FUNCTION ---
const fetchProductDetails = async (id: string): Promise<ProductData> => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) {
    throw new Error("Product not found");
  }
  return res.json();
};

// --- HELPER: Service Progress Bar ---
const ServiceStatusCard = ({ service }: { service: ServiceDetails }) => {
  const statusMap: Record<string, number> = {
    'pending': 1, 'upcoming': 2, 'technician_assigned': 2, 
    'accepted': 2, 'on_way': 3, 'in_progress': 4, 'completed': 5
  };
  
  const currentStepIndex = statusMap[service.status] || 1;
  
  const steps = [
    { id: 'pending', label: 'Request Sent', icon: <DocumentCheckIcon className="h-4 w-4"/> },
    { id: 'upcoming', label: 'Tech Assigned', icon: <UserIcon className="h-4 w-4"/> },
    { id: 'on_way', label: 'On The Way', icon: <TruckIcon className="h-4 w-4"/> },
    { id: 'in_progress', label: 'Repairing', icon: <WrenchScrewdriverIcon className="h-4 w-4"/> },
    { id: 'completed', label: 'Done', icon: <CheckCircleIcon className="h-4 w-4"/> },
  ];

  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm mb-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-blue-900 font-bold text-lg flex items-center gap-2">
            <WrenchScrewdriverIcon className="h-5 w-5 text-blue-600 animate-pulse"/> 
            Repair in Progress
          </h3>
          <p className="text-xs text-gray-500 mt-1">Ticket ID: <span className="font-mono font-bold text-gray-700">#{service._id.slice(-6).toUpperCase()}</span></p>
        </div>
        <div className="text-right">
             <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase block mb-1">
                {service.status.replace('_', ' ')}
             </span>
             {service.technicianName && (
                 <div className="flex items-center justify-end gap-2 text-xs text-gray-600">
                    <UserIcon className="h-3 w-3" /> {service.technicianName}
                 </div>
             )}
        </div>
      </div>

      <div className="flex items-center justify-between relative mt-6 px-2">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
        {steps.map((step, i) => {
            const isActive = i + 1 <= currentStepIndex;
            return (
              <div key={i} className="flex flex-col items-center bg-white px-2">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${isActive ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                    {step.icon}
                </div>
                <span className={`text-[9px] mt-1 font-bold uppercase ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
            );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
         <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Issue</p>
            <p className="text-sm font-semibold text-gray-800 line-clamp-1">{service.issueDescription}</p>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Visit Slot</p>
            <p className="text-sm font-semibold text-blue-600">{service.preferredSlot}</p>
         </div>
      </div>
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams(); 
  const id = params?.id as string; 
  const router = useRouter();

  // ✅ REACT QUERY HOOK
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id),
    enabled: !!id,
    
    // --- SPEED OPTIMIZATION SETTINGS ---
    staleTime: 1000 * 60 * 2, // 2 Minutes tak data "fresh" manega (Dubara API call nahi karega)
    refetchInterval: 10000,   // Har 10 sec me background update (Polling replacement)
    retry: 1,                 // Agar fail ho to bas 1 baar retry kare
  });

  // Redirect if error (e.g., Invalid ID)
  if (isError) {
    router.push("/products");
    return null;
  }

  if (isLoading) return <div className="h-screen flex items-center justify-center text-gray-500 font-medium">Loading Garage...</div>;
  if (!product) return null;

  const isWarrantyActive = product?.warrantyStatus === 'active' || product?.hasExtendedWarranty;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/products" className="flex items-center hover:text-blue-600 transition-colors">
             <ArrowLeftIcon className="h-4 w-4 mr-1"/> Back to Garage
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-semibold">{product?.name || "Product"}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: IMAGE & KEY STATS --- */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 flex flex-col items-center justify-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${isWarrantyActive ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <div className="absolute top-4 right-4">
                   {isWarrantyActive ? 
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><ShieldCheckIcon className="h-3 w-3"/> Protected</span> :
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"><XCircleIcon className="h-3 w-3"/> Expired</span>
                   }
                </div>
                <div className="text-8xl my-6 filter drop-shadow-lg transform hover:scale-105 transition-transform duration-300">
                   {product.image || "📦"}
                </div>
                <h1 className="text-xl font-bold text-center text-gray-900 leading-tight">{product?.name || "Product"}</h1>
                <p className="text-sm text-gray-500 mt-1">{product?.model || "N/A"}</p>
             </div>
             
             {/* Quick Stats Grid */}
             <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                   <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Purchase Date</p>
                   <p className="text-sm font-semibold flex items-center gap-1">
                      <CalendarDaysIcon className="h-4 w-4 text-gray-400"/>
                      {product?.purchaseDate ? format(new Date(product.purchaseDate), 'dd MMM yyyy') : "N/A"}
                   </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                   <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Serial No.</p>
                   <p className="text-sm font-semibold flex items-center gap-1 break-all">
                      <QrCodeIcon className="h-4 w-4 text-gray-400"/>
                      {product?.serialNumber || "N/A"}
                   </p>
                </div>
             </div>
          </div>

          {/* --- RIGHT COLUMN: STATUS & ACTIONS --- */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. SERVICE STATUS (If Request exists) */}
            {product?.hasActiveService && product?.activeServiceDetails ? (
               <ServiceStatusCard service={product.activeServiceDetails} />
            ) : (
               // If NO service active, show generic "All good" card
               <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                     <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                     <h3 className="font-bold text-gray-800">System Operational</h3>
                     <p className="text-sm text-gray-500">No reported issues. Your device is running smoothly.</p>
                  </div>
               </div>
            )}

            {/* 2. WARRANTY CARD */}
            {product?.hasExtendedWarranty && product?.extendedWarrantyDetails ? (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 shadow-sm relative">
                    <DocumentCheckIcon className="absolute right-4 top-4 h-16 w-16 text-emerald-100 -z-0" />
                    <div className="relative z-10">
                       <h3 className="text-emerald-900 font-bold text-lg flex items-center gap-2">
                          <ShieldCheckIcon className="h-5 w-5"/> {product.extendedWarrantyDetails?.planName || "Extended Warranty"}
                       </h3>
                       <p className="text-sm text-emerald-700 mt-1 mb-4">
                          Policy <span className="font-mono font-bold">{product.extendedWarrantyDetails?.policyNumber || "N/A"}</span> is currently active.
                       </p>
                       <div className="flex gap-6 text-sm text-emerald-800 font-medium">
                          <div>
                             <span className="block text-[10px] uppercase opacity-70">Valid From</span>
                             {product.extendedWarrantyDetails?.startDate ? format(new Date(product.extendedWarrantyDetails.startDate), 'dd MMM yyyy') : "N/A"}
                          </div>
                          <div>
                             <span className="block text-[10px] uppercase opacity-70">Valid Until</span>
                             {product.extendedWarrantyDetails?.endDate ? format(new Date(product.extendedWarrantyDetails.endDate), 'dd MMM yyyy') : "N/A"}
                          </div>
                       </div>
                    </div>
                </div>
            ) : (
               <div className="bg-white border border-orange-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                     <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <ShieldCheckIcon className="h-5 w-5 text-orange-500"/> Warranty Expired / Not Active
                     </h3>
                     <p className="text-sm text-gray-500 mt-1">Protect your device from unexpected repair costs.</p>
                  </div>
                  {/* Hide button if Service is already active to prevent confusion */}
                  {!product?.hasActiveService && product?._id && (
                     <Link href={`/ExtendWarrenty/purchase?productId=${product._id}`}>
                        <button className="px-6 py-2 bg-orange-500 text-white font-bold text-sm rounded-lg hover:bg-orange-600 transition-colors shadow-md shadow-orange-200">
                           Get Protection
                        </button>
                     </Link>
                  )}
               </div>
            )}

            {/* 3. MAIN ACTION BUTTON */}
            {!product?.hasActiveService && (
               <Link href="/ServiceReq" className="block">
                  <button className="w-full py-4 bg-black text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 transform active:scale-95">
                     <WrenchScrewdriverIcon className="h-6 w-6 text-blue-400" />
                     {isWarrantyActive ? "Book Free Repair (Warranty)" : "Book Service / Repair"}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-2">
                     {isWarrantyActive ? "Covered under warranty. No service charge." : "Standard inspection charges may apply."}
                  </p>
               </Link>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}