"use client";

import React, { useState, useEffect, Suspense } from "react"; // ✅ Added Suspense
import { useSession } from "next-auth/react"; 
import { useRouter, useSearchParams } from "next/navigation"; 
import {
  CheckCircleIcon, ArrowLeftIcon,
  ShieldCheckIcon, CreditCardIcon, SparklesIcon,
  EyeIcon 
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

// --- CONFIG ---
const PLANS_CONFIG = [
  { id: 'gold', name: 'Gold Shield', duration: 1, multiplier: 0.08, features: ['100% Parts & Labor', '2 Free Service Visits', 'Cashless Claims'] },
  { id: 'platinum', name: 'Platinum Care', duration: 2, multiplier: 0.14, features: ['All Gold Benefits', 'Accidental Damage', 'Instant Replacement'], recommended: true },
];

const calculatePrice = (originalPrice, multiplier) => {
  const base = (originalPrice || 20000) * multiplier; 
  return Math.floor(base / 100) * 100 + 99; 
};

// --- COMPONENTS ---
const Stepper = ({ currentStep }) => (
  <div className="w-full max-w-3xl mx-auto mb-10 pt-8">
    <div className="flex justify-between relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
      <div className={`absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500`} style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
      {['Select Device', 'Choose Plan', 'Payment', 'Active'].map((label, i) => (
        <div key={i} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
            {i + 1 < currentStep ? <CheckCircleIcon className="h-5 w-5"/> : i + 1}
          </div>
          <span className={`text-xs font-semibold ${i + 1 <= currentStep ? 'text-blue-700' : 'text-gray-400'}`}>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
    <div className="flex items-center shrink-0">
      <Link href="/Dashboard" className="flex items-center gap-3">
        <Image src="/logo2.png" alt="ElectroCare" height={30} width={30} className="rounded-full shadow-sm"/>
        <div className="flex items-center"><span className="text-red-500 font-bold text-2xl">Electro</span><span className="text-blue-600 font-bold text-2xl">Care</span></div>
      </Link>
    </div>
  </nav>
);

// --- MAIN CONTENT LOGIC (Moved here) ---
function PurchaseContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ Safe to use here now
  
  const preSelectedId = searchParams.get('productId');

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const [dbProducts, setDbProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [finalWarranty, setFinalWarranty] = useState(null);

  const planPrice = selectedProduct && selectedPlan ? calculatePrice(selectedProduct.price, selectedPlan.multiplier) : 0;
  const gst = Math.floor(planPrice * 0.18);
  const totalAmount = planPrice + gst;

  // --- 1. Fetch Products ---
  useEffect(() => {
    if (status === "unauthenticated") {
        router.push("/Login");
        return;
    }

    const fetchProducts = async () => {
      if (!session?.user?.email) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/products?userId=${session.user.email}`);
        if (res.ok) {
          const data = await res.json();
          setDbProducts(data);

          if (preSelectedId) {
             const preProd = data.find(p => p._id === preSelectedId);
             if (preProd && !preProd.hasActiveWarranty) {
                 setSelectedProduct(preProd);
                 setStep(2);
             }
          }
        }
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
        fetchProducts();
    }
  }, [status, session, router, preSelectedId]);

  // --- 2. Handle Payment ---
  const handlePayment = async () => {
    setLoading(true);
    try {
      const payload = {
        productId: selectedProduct._id,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planDuration: selectedPlan.duration,
        amount: totalAmount
      };

      const res = await fetch("/api/warranty/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
         throw new Error(result.error || "Payment failed");
      }

      setFinalWarranty(result); 
      setStep(4);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- STEPS RENDERERS ---
  const StepProduct = () => (
    <div className="animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Protect a Device</h2>
      <p className="text-gray-500 mb-6">Select an eligible product from your digital garage.</p>
      
      {loading ? (
        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>
      ) : dbProducts.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">No products found in your account.</p>
          <Link href="/add-appliance" className="text-blue-600 font-bold hover:underline">Register a Product First</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dbProducts.map((prod) => {
            const isProtected = prod.hasActiveWarranty || prod.warrantyStatus === 'active';

            return (
                <div 
                  key={prod._id} 
                  onClick={() => { 
                      if (isProtected) {
                          router.push(`/products/${prod._id}`);
                      } else {
                          setSelectedProduct(prod); 
                          setStep(2); 
                      }
                  }}
                  className={`
                    relative border-2 rounded-2xl p-5 transition-all cursor-pointer
                    ${isProtected 
                      ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-400' 
                      : 'hover:border-blue-500 hover:shadow-lg border-gray-200 bg-white'
                    }
                    ${selectedProduct?._id === prod._id ? 'border-blue-600 bg-blue-50' : ''}
                  `}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-4xl">{prod.image || "📦"}</span>
                    {isProtected ? (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full font-bold uppercase bg-emerald-200 text-emerald-800">
                            <ShieldCheckIcon className="h-3 w-3" /> Active
                        </span>
                    ) : (
                        <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase bg-blue-100 text-blue-600">
                            Eligible
                        </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 line-clamp-1">{prod.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{prod.model}</p>
                  
                  {isProtected ? (
                     <div className="mt-3 pt-3 border-t border-emerald-200">
                        <p className="text-xs text-emerald-700 font-bold flex items-center gap-1 mb-1">
                           <CheckCircleIcon className="h-3 w-3" /> Coverage Active
                        </p>
                        <p className="text-[10px] text-emerald-600 flex items-center gap-1">
                           <EyeIcon className="h-3 w-3" /> View Details
                        </p>
                     </div>
                  ) : (
                     <p className="text-xs text-gray-400 mt-2 font-mono">₹{prod.price?.toLocaleString()}</p>
                  )}
                </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const StepPlan = () => (
    <div className="animate-fade-in-up">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setStep(1)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeftIcon className="h-5 w-5"/></button>
        <div><h2 className="text-2xl font-bold text-gray-900">Choose Plan</h2><p className="text-sm text-gray-500">For {selectedProduct.name}</p></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PLANS_CONFIG.map((plan) => {
          const price = calculatePrice(selectedProduct.price, plan.multiplier);
          return (
            <div key={plan.id} onClick={() => { setSelectedPlan(plan); setStep(3); }}
                 className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all hover:scale-105 ${plan.recommended ? 'border-blue-500 shadow-xl ring-4 ring-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
              {plan.recommended && <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">BEST VALUE</div>}
              <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mt-2 mb-6">
                <span className="text-3xl font-extrabold text-gray-900">₹{price.toLocaleString()}</span>
                <span className="text-gray-500 text-sm">/ {plan.duration} Year{plan.duration > 1 && 's'}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feat, i) => (<li key={i} className="flex items-center gap-3 text-sm text-gray-600"><CheckBadgeIcon className="h-5 w-5 text-green-500" /> {feat}</li>))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold text-sm ${plan.recommended ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Select Plan</button>
            </div>
          );
        })}
      </div>
    </div>
  );

  const StepPayment = () => (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => setStep(2)} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeftIcon className="h-5 w-5"/></button>
        <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex gap-4 items-center mb-6 pb-6 border-b border-gray-100">
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">{selectedProduct.image || "📦"}</div>
          <div>
            <h4 className="font-bold text-gray-900 line-clamp-1">{selectedProduct.name}</h4>
            <p className="text-xs text-gray-500">{selectedPlan.name} ({selectedPlan.duration} Years)</p>
          </div>
        </div>
        <div className="space-y-3 text-sm text-gray-600 mb-6">
          <div className="flex justify-between"><span>Plan Price</span> <span>₹{planPrice.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>GST (18%)</span> <span>₹{gst.toLocaleString()}</span></div>
          <div className="flex justify-between text-green-600"><span>Discount</span> <span>- ₹0</span></div>
        </div>
        <div className="flex justify-between font-bold text-lg text-gray-900 pt-4 border-t border-dashed border-gray-300">
          <span>Total To Pay</span>
          <span>₹{totalAmount.toLocaleString()}</span>
        </div>
      </div>
      <button 
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : <><CreditCardIcon className="h-5 w-5" /> Pay Securely</>}
      </button>
      <p className="text-center text-xs text-gray-400 mt-4 flex justify-center items-center gap-1"><ShieldCheckIcon className="h-3 w-3"/> 256-bit SSL Encrypted</p>
    </div>
  );

  const StepSuccess = () => (
    <div className="animate-scale-in text-center max-w-xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><SparklesIcon className="h-8 w-8" /></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Protection Activated!</h2>
        <p className="text-gray-500 mb-8">Warranty saved successfully to database.</p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-100 relative">
          <ShieldCheckIcon className="absolute right-4 top-4 h-24 w-24 text-gray-100 -z-10" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-gray-400 text-xs uppercase font-bold">Policy Number</p><p className="font-mono font-bold text-gray-800">{finalWarranty?.policyNumber}</p></div>
            <div><p className="text-gray-400 text-xs uppercase font-bold">Valid Until</p><p className="font-bold text-gray-800">{finalWarranty ? format(new Date(finalWarranty.endDate), 'dd MMM yyyy') : '...'}</p></div>
            <div className="col-span-2 pt-2 border-t border-gray-200 mt-2">
              <p className="text-gray-400 text-xs uppercase font-bold">Covered Device</p>
              <p className="font-bold text-gray-800">{finalWarranty?.productName}</p>
            </div>
          </div>
        </div>
        <Link href="/Dashboard"><button className="w-full py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors">Go to Dashboard</button></Link>
      </div>
    </div>
  );

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <main className="max-w-4xl mx-auto">
          <Stepper currentStep={step} />
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 min-h-[500px]">
            {step === 1 && <StepProduct />}
            {step === 2 && <StepPlan />}
            {step === 3 && <StepPayment />}
            {step === 4 && <StepSuccess />}
          </div>
        </main>
      </div>
    </div>
  );
}

// --- MAIN EXPORT WITH SUSPENSE (This Fixes the Build) ---
export default function WarrantyPurchaseFlow() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Page...</div>}>
      <PurchaseContent />
    </Suspense>
  );
}