// src/app/payment/page.js
"use client";

import  { useState, useEffect } from 'react';
import { LockClosedIcon, CreditCardIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

// --- DUMMY DATA / CONTEXT SIMULATION ---
// In a real app, you would pass ONE of these objects to this page based on user action.
// For example, using URL query params: /payment?context=warranty
const paymentContexts = {
    serviceDeposit: {
        title: "Technician Visit Deposit",
        description: "For 'Samsung Refrigerator' service request.",
        items: [
            { name: 'Refundable Security Deposit', price: 2000 },
        ],
        totalAmount: 2000,
    },
    extendedWarranty: {
        title: "Extended Warranty Purchase",
        description: "For your 'Sony Bravia TV'.",
        items: [
            { name: '2-Year Total Care Plan', price: 4499 },
            { name: 'Taxes (GST 18%)', price: 810 },
        ],
        totalAmount: 5309,
    }
};

// --- MAIN PAYMENT PAGE COMPONENT ---
export default function UniversalPaymentPage() {
    // We use state to simulate switching between payment contexts.
    // In a real app, this data would come from the previous page.
    const [paymentDetails, setPaymentDetails] = useState(paymentContexts.extendedWarranty);

    // This useEffect hook is for DEMO purposes to show how the page adapts.
    // In a real app, you'd get this data from URL params or state management.
    useEffect(() => {
        // Example of how you might read from a URL:
        // const urlParams = new URLSearchParams(window.location.search);
        // const context = urlParams.get('context');
        // if (context === 'serviceDeposit') {
        //     setPaymentDetails(paymentContexts.serviceDeposit);
        // }
    }, []);

    const InputField = ({ id, label, placeholder, icon }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans p-4">
            <div className="w-full max-w-4xl mx-auto">
                {/* Demo buttons to switch context */}
                <div className="flex justify-center mb-4 space-x-2">
                    <button onClick={() => setPaymentDetails(paymentContexts.serviceDeposit)} className="text-black bg-white border border-gray-300 px-3 py-1 rounded-md text-sm">Simulate Service Deposit</button>
                </div>

                <div className="bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2">
                    {/* Left Side: Order Summary */}
                    <div className="p-8 bg-gray-50 rounded-l-lg">
                        <div className="flex items-center space-x-3 mb-8">
                            <Image
                             src="/logo.jpg" alt="ElectroCare Logo" className="h-8 w-8 object-contain"
                                height={30}
                  width={30} />
                            <span className="font-bold text-xl text-gray-800">ElectroCare</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{paymentDetails.title}</h2>
                        <p className="text-gray-500 mt-2 mb-6">{paymentDetails.description}</p>
                        
                        <div className="space-y-3 border-t border-gray-200 pt-4">
                            {paymentDetails.items.map(item => (
                                <div key={item.name} className="flex justify-between text-gray-700">
                                    <span>{item.name}</span>
                                    <span className="font-medium">₹{item.price.toLocaleString('en-IN')}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between text-xl font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
                            <span>Total Payable</span>
                            <span>₹{paymentDetails.totalAmount.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    {/* Right Side: Payment Form */}
                    <div className="p-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Payment Details</h3>
                        <div className="text-black space-y-5">
                            <InputField 
                                id="cardName"
                                label="Name on card"
                                placeholder="Your Good Name"
                                icon={<UserCircleIcon className="h-5 w-5 text-gray-400" />}
                            />
                             <InputField 
                                id="cardNumber"
                                label="Card number"
                                placeholder="0000 0000 0000 0000"
                                icon={<CreditCardIcon className="h-5 w-5 text-gray-400" />}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField 
                                    id="expiryDate"
                                    label="Expiry date"
                                    placeholder="MM / YY"
                                />
                                <InputField 
                                    id="cvc"
                                    label="CVC / CVV"
                                    placeholder="123"
                                />
                            </div>

                            <div className="pt-4">
                                <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors text-lg flex items-center justify-center">
                                    <LockClosedIcon className="h-5 w-5 mr-2" />
                                    Pay ₹{paymentDetails.totalAmount.toLocaleString('en-IN')}
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-500 mt-4">
                                <p>Your payment is secure and encrypted.</p>
                                <Image src="logo.jpg" alt="Payment methods" className="h-6 mx-auto mt-2"
                                   height={30}
                  width={30} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// A placeholder icon component, as UserCircleIcon is not imported
const UserCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);