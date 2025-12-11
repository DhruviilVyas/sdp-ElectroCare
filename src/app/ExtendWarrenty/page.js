// src/app/extend-warranty/page.js
"use client";
import  { useState } from 'react';
import {
    TvIcon,
    ComputerDesktopIcon,
    ArrowLeftIcon,
    ShieldCheckIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { addYears, format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';


// --- DUMMY DATA ---
// In a real app, this data would be fetched from your API.
const userProducts = [
  { id: 'prod_1', name: 'Sony Bravia TV', model: 'X90J 65"', icon: <TvIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-500" />, warrantyEndDate: '2025-10-25' },
  { id: 'prod_2', name: 'MacBook Pro 14"', model: 'M2 Pro', icon: <ComputerDesktopIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-500" />, warrantyEndDate: '2026-08-15' },
  { id: 'prod_3', name: 'LG Washing Machine', model: 'WM3900HWA', icon: <TvIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-500" />, warrantyEndDate: '2025-09-22' },
];

const warrantyPlans = [
    { id: 'plan_1', name: '1-Year Protection Plan', durationYears: 1, price: 2499, features: ['Parts & Labor Coverage', 'Power Surge Protection', 'No Deductibles'] },
    { id: 'plan_2', name: '2-Year Total Care', durationYears: 2, price: 4499, features: ['Everything in 1-Year Plan', '2 Free Maintenance Visits', 'Priority Support'] },
];

const getWarrantyStatus = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    if (end < today) {
        return { text: 'Expired', color: 'bg-red-100 text-red-800' };
    }
    const diffDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    if (diffDays <= 60) {
        return { text: `Expires in ${diffDays} days`, color: 'bg-yellow-100 text-yellow-800' };
    }
    return { text: 'Active', color: 'bg-green-100 text-green-800' };
};

// --- HELPER COMPONENT: Progress Indicator ---
const ProgressIndicator = ({ currentStep, totalSteps }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-blue-700">Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
        </div>
    </div>
);


// --- MAIN COMPONENT ---
export default function ExtendWarrantyPage() {
    const [step, setStep] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setStep(2);
    };
    
    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setStep(3);
    };

    const handleProceedToPayment = () => {
        // In a real app, integrate a payment gateway here.
        // For this demo, we simulate a successful payment.
        console.log("Processing payment for:", selectedPlan, selectedProduct);
        setStep(4);
    };


    const newWarrantyStartDate = selectedProduct ? new Date(selectedProduct.warrantyEndDate) : new Date();
    const newWarrantyEndDate = (selectedProduct && selectedPlan) ? addYears(newWarrantyStartDate, selectedPlan.durationYears) : new Date();


    // --- RENDER FUNCTIONS FOR EACH STEP ---
    const renderStepOne = () => (
        <div>
            <ProgressIndicator currentStep={1} totalSteps={3} />
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">Step 1: Choose a Product</h2>
            <p className="text-gray-600 mb-6">Select a product to extend its warranty.</p>
            <div className="space-y-3">
                {userProducts.map(product => {
                    const status = getWarrantyStatus(product.warrantyEndDate);
                    return (
                        <button key={product.id} onClick={() => handleProductSelect(product)} className="w-full flex items-center text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <div className="mr-4 shrink-0">{product.icon}</div>
                            <div className="flex-grow min-w-0">
                                <p className="font-bold text-md sm:text-lg text-gray-800 truncate">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.model}</p>
                            </div>
                            <div className="text-right ml-2 shrink-0">
                                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                                    {status.text}
                                </span>
                                <p className="text-xs text-gray-500 mt-1">Ends: {format(new Date(product.warrantyEndDate), 'dd MMM yyyy')}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
    
    const renderStepTwo = () => (
        <div>
            <ProgressIndicator currentStep={2} totalSteps={3} />
            <div className="flex items-start mb-6">
                <button type="button" onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-gray-100 mr-3 mt-1">
                    <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Step 2: Choose a Plan</h2>
                    <p className="text-gray-600">For your <span className="font-bold text-blue-600">{selectedProduct.name}</span>.</p>
                </div>
            </div>
            <div className="space-y-4">
                {warrantyPlans.map(plan => (
                    <button key={plan.id} onClick={() => handlePlanSelect(plan)} className="w-full text-left p-4 sm:p-5 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{plan.name}</h3>
                            <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{plan.price.toLocaleString('en-IN')}</p>
                        </div>
                        <ul className="mt-4 space-y-2">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-center text-gray-600 text-sm sm:text-base">
                                    <CheckBadgeIcon className="h-5 w-5 text-green-500 mr-2 shrink-0"/>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderStepThree = () => (
        <div>
            <ProgressIndicator currentStep={3} totalSteps={3} />
            <div className="flex items-center mb-6">
                 <button type="button" onClick={() => setStep(2)} className="p-2 rounded-full hover:bg-gray-100 mr-3">
                    <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                 <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Step 3: Review & Pay</h2>
            </div>
            <div className="space-y-5 border border-gray-200 rounded-lg p-4 sm:p-6">
                <div>
                    <h3 className="font-semibold text-gray-500 uppercase tracking-wider text-xs sm:text-sm mb-2">Product</h3>
                    <div className="flex items-center">
                        <div className="mr-4 shrink-0">{selectedProduct.icon}</div>
                        <div>
                            <p className="font-bold text-md sm:text-lg text-gray-800">{selectedProduct.name}</p>
                            <p className="text-sm text-gray-500">{selectedProduct.model}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200"></div>

                 <div>
                    <h3 className="font-semibold text-gray-500 uppercase tracking-wider text-xs sm:text-sm mb-2">Plan Selected</h3>
                     <div className="flex items-center">
                         <div className="mr-4 shrink-0"><ShieldCheckIcon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500"/></div>
                         <div>
                            <p className="font-bold text-md sm:text-lg text-gray-800">{selectedPlan.name}</p>
                             <p className="text-sm text-gray-500">New coverage: <span className="font-medium text-gray-900">{format(newWarrantyStartDate, 'dd MMM yyyy')}</span> to <span className="font-medium text-gray-900">{format(newWarrantyEndDate, 'dd MMM yyyy')}</span></p>
                         </div>
                     </div>
                 </div>

                <div className="border-t border-gray-200"></div>

                <div>
                    <h3 className="font-semibold text-gray-500 uppercase tracking-wider text-xs sm:text-sm mb-2">Price Details</h3>
                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between">
                            <span>Plan Cost</span>
                            <span>₹{selectedPlan.price.toLocaleString('en-IN')}</span>
                        </div>
                         <div className="flex justify-between">
                            <span>Taxes (GST 18%)</span>
                            <span>₹{(selectedPlan.price * 0.18).toLocaleString('en-IN')}</span>
                        </div>
                         <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-dashed mt-2">
                            <span>Total Amount</span>
                            <span>₹{(selectedPlan.price * 1.18).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
             <div className="pt-6">
                <button onClick={handleProceedToPayment} className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg focus:outline-none focus:ring-4 focus:ring-green-300">
                    Proceed to Payment
                </button>
            </div>
        </div>
    );

 const renderStepFour = () => (
    <div className="text-center py-8 px-2 sm:px-4">
      <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
      <p className="text-gray-600 mb-8">Your warranty has been successfully extended.</p>

      {/* Flex container for Details and QR Code */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">
        
        {/* Details Box */}
        <div className="bg-gray-50 border border-gray-200  rounded-lg p-6 text-left space-y-3 flex-grow w-full md:w-auto">
          <p><strong className="font-semibold text-black ">Product:</strong> {selectedProduct.name}</p>
          <p><strong className="font-semibold text-black ">Plan:</strong> {selectedPlan.name}</p>
          <p><strong className="font-semibold text-black ">New End Date:</strong> {format(newWarrantyEndDate, 'dd MMMM, yyyy')}</p>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm shrink-0">
          {/* Static QR Code Image (Just for display) */}
          <Image
            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ElectroCare-Warranty-Confirmed" 
            alt="Warranty QR Code" 
            className="h-32 w-32 object-contain"
               height={30}
                  width={30}
          />
          <p className="text-sm text-gray-500 mt-2 font-medium">Scan for details</p>
        </div>

      </div>

      <Link href="/Dashboard" className="inline-block w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Back to Dashboard
      </Link>
    </div>
);
// ... rest of your component code

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
             <header className="absolute top-4 left-4">
                <Link href="/Dashboard" className="flex items-center space-x-2 group">
                    <Image src="/logo.jpg" alt="ElectroCare Logo" className="h-10 w-10 sm:h-12 sm:w-12 rounded-full"    height={30}
                  width={30} />
                    <span className="text-xl md:text-2xl font-bold text-blue-900 tracking-wide group-hover:text-blue-600 transition-colors">ElectroCare</span>
                </Link>
            </header>
            
            <main className="container mx-auto px-4 py-24 sm:py-28">
                 <div className="text-center mb-8 md:mb-12">
                     <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Extend Your Product&apos;s Warranty</h1>
                     <p className="text-md md:text-lg text-gray-600 mt-2">Get continued peace of mind with our protection plans.</p>
                 </div>
                 
                 <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto transition-all duration-300">
                     {step === 1 && renderStepOne()}
                     {step === 2 && selectedProduct && renderStepTwo()}
                     {step === 3 && selectedProduct && selectedPlan && renderStepThree()}
                     {step === 4 && selectedProduct && selectedPlan && renderStepFour()}
                 </div>
            </main>
        </div>
    );
}