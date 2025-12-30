
"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { 
 ChevronRightIcon, ArrowLeftIcon,
  UserIcon, MapPinIcon, PhoneIcon, CheckCircleIcon,
  SparklesIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

// --- SUB-COMPONENT: Step Tracker ---
const StepTracker = ({ currentStep }) => (
  <div className="w-full max-w-3xl mx-auto mb-10 pt-4">
      <div className="flex justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
          <div className={`absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 rounded-full transition-all duration-500`} style={{ width: `${((currentStep - 1) / 3) * 100}%` }}></div>
          {['Select Device', 'Describe Issue', 'Confirm', 'Success'].map((label, i) => (
              <div key={i} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}>
                      {i + 1 < currentStep ? <CheckCircleIcon className="h-5 w-5"/> : i + 1}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${i + 1 <= currentStep ? 'text-blue-700' : 'text-gray-400'}`}>{label}</span>
              </div>
          ))}
      </div>
  </div>
);

// --- MAIN PAGE ---
export default function ServiceRequestPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Data State
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Form Data
  const [issueDescription, setIssueDescription] = useState("");
  const [preferredSlot, setPreferredSlot] = useState("");
  const [contactDetails, setContactDetails] = useState({
    name: "", phone: "", address: "", email: ""
  });

  // 1. Fetch User Data & Products
  useEffect(() => {
    if (status === "unauthenticated") router.push("/Login");

    if (status === "authenticated" && session?.user?.email) {
      setContactDetails(prev => ({
        ...prev,
        name: session.user.name,
        email: session.user.email,
        phone: "9876543210", 
        address: "Ahmedabad, Gujarat" 
      }));

      const fetchProducts = async () => {
        try {
          const res = await fetch(`/api/products?userId=${session.user.email}`);
          if (res.ok) {
            const data = await res.json();
            setProducts(data);
          }
        } catch (e) { console.error(e); }
      };
      fetchProducts();
    }
  }, [status, session, router]);


  // 2. Handle Submission (Without Payment Gateway)
  const handleSubmitRequest = async () => {
    setLoading(true);
    
    try {
        const res = await fetch("/api/service/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                productId: selectedProduct._id,
                productName: selectedProduct.name,
                productModel: selectedProduct.model,
                issueDescription,
                preferredSlot,
                contactName: contactDetails.name,
                contactPhone: contactDetails.phone,
                contactAddress: contactDetails.address,
                // Simulating payment success
                isDepositPaid: true, 
                depositAmount: 2000 
            }),
        });

        if (res.ok) {
            setCurrentStep(4); // Success Step
        } else {
            alert("Failed to submit request. Please try again.");
        }
    } catch (error) {
        console.error(error);
        alert("Network Error");
    } finally {
        setLoading(false);
    }
  };

  if (status === "loading") return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm flex items-center gap-3">
         <Link href="/Dashboard"><Image src="/logo2.png" width={40} height={40} alt="Logo" className="rounded-full"/></Link>
         <h1 className="text-xl font-bold text-gray-800">Request Service</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <StepTracker currentStep={currentStep} />
        
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 max-w-3xl mx-auto min-h-[500px]">
          
          {/* STEP 1: SELECT PRODUCT */}
          {currentStep === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Which device needs repair?</h2>
              
              {products.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-xl">
                  <p className="text-gray-500">No products found.</p>
                  <Link href="/add-appliance" className="text-blue-600 font-bold hover:underline">Register Device First</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map(prod => (
                    <div 
                      key={prod._id} 
                      onClick={() => { setSelectedProduct(prod); setCurrentStep(2); }}
                      className="flex items-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group"
                    >
                      <div className="text-4xl mr-4">{prod.image || "📦"}</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-700">{prod.name}</h3>
                        <p className="text-xs text-gray-500">{prod.model}</p>
                        {prod.hasActiveWarranty && <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1"><ShieldCheckIcon className="h-3 w-3"/> Warranty Active</span>}
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-600"/>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: ISSUE DESCRIPTION */}
          {currentStep === 2 && (
            <div className="animate-fade-in-up">
              <button onClick={() => setCurrentStep(1)} className="flex items-center text-sm text-gray-500 mb-4 hover:text-black"><ArrowLeftIcon className="h-4 w-4 mr-1"/> Back</button>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What&apos;s wrong?</h2>
              <div className="bg-blue-50 p-3 rounded-lg mb-6 flex items-center gap-3">
                 <span className="text-2xl">{selectedProduct.image}</span>
                 <div>
                    <p className="font-bold text-sm text-blue-900">{selectedProduct.name}</p>
                    <p className="text-xs text-blue-700">{selectedProduct.model}</p>
                 </div>
              </div>

              <label className="block text-sm font-medium text-gray-700 mb-2">Describe the issue</label>
              <textarea 
                rows="4" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-6 text-gray-800"
                placeholder="e.g. Not cooling properly..."
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
              ></textarea>

              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Visit Slot</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                 {['Morning (9-12)', 'Afternoon (12-4)', 'Evening (4-8)'].map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setPreferredSlot(slot)}
                      className={`p-3 rounded-lg border text-sm font-semibold transition-all ${preferredSlot === slot ? 'bg-black text-white border-black' : 'bg-white text-gray-600 hover:border-gray-400'}`}
                    >
                      {slot}
                    </button>
                 ))}
              </div>

              <button 
                onClick={() => setCurrentStep(3)} 
                disabled={!issueDescription || !preferredSlot}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* STEP 3: CONFIRM (No Payment Gateway) */}
          {currentStep === 3 && (
            <div className="animate-fade-in-up">
              <button onClick={() => setCurrentStep(2)} className="flex items-center text-sm text-gray-500 mb-4 hover:text-black"><ArrowLeftIcon className="h-4 w-4 mr-1"/> Back</button>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Request</h2>

              <div className="border border-gray-200 rounded-xl p-5 mb-6">
                 <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Service Address</h3>
                 <div className="flex gap-3 items-start">
                    <MapPinIcon className="h-5 w-5 text-gray-600 mt-1"/>
                    <div>
                       <input 
                         className="w-full font-semibold text-gray-800 border-b border-dashed border-gray-300 focus:outline-none focus:border-blue-500 bg-transparent"
                         value={contactDetails.address}
                         onChange={(e) => setContactDetails({...contactDetails, address: e.target.value})}
                       />
                       <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1"><UserIcon className="h-4 w-4"/> {contactDetails.name}</span>
                          <span className="flex items-center gap-1"><PhoneIcon className="h-4 w-4"/> {contactDetails.phone}</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-6">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-800 font-bold">Estimated Visit Charge</span>
                    <span className="text-emerald-800 font-bold">₹2,000</span>
                 </div>
                 <p className="text-xs text-emerald-600">
                    * Amount payable to technician after service.
                 </p>
              </div>

              <button 
                onClick={handleSubmitRequest}
                disabled={loading}
                className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2 transition-all"
              >
                {loading ? "Processing..." : <>Confirm Booking</>}
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {currentStep === 4 && (
            <div className="text-center animate-scale-in py-10">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SparklesIcon className="h-10 w-10 text-green-600"/>
               </div>
               <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
               <p className="text-gray-500 mb-8">
                 Your request has been sent to our technicians. You will be notified once a technician accepts the job.
               </p>
               
               <Link href="/Dashboard">
                 <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700">
                    Go to Dashboard
                 </button>
               </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}