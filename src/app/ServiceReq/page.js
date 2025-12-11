// src/app/request-service/page.js
"use client";

import  { useState } from 'react';
import { 
  ComputerDesktopIcon, 
  TvIcon, 
  ChevronRightIcon,
  ArrowLeftIcon,
  PhotoIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

// --- DUMMY DATA ---
// In a real app, you would fetch this from your API.
const initialUserDetails = {
    name: "Kailashsinh Rajput",
    address: "A-123, Satellite Road, Ahmedabad, Gujarat, 380015",
    phone: "+91 9712360092",
    email: "kailash@example.com"
};

const userProducts = [
  { id: 'prod_1', name: 'Samsung Refrigerator', model: 'RF28R7351SG', icon: <ComputerDesktopIcon className="h-12 w-12 text-gray-500" /> },
  { id: 'prod_2', name: 'LG Washing Machine', model: 'WM3900HWA', icon: <TvIcon className="h-12 w-12 text-gray-500" /> },
  { id: 'prod_3', name: 'Sony Bravia TV', model: 'X90J 65"', icon: <TvIcon className="h-12 w-12 text-gray-500" /> },
  { id: 'prod_4', name: 'MacBook Pro 14"', model: 'M2 Pro', icon: <ComputerDesktopIcon className="h-12 w-12 text-gray-500" /> },
];

// --- Main Component ---
export default function ServiceRequestPage() {
  // Start at Step 1 (Confirm Contact Details)
  const [currentStep, setCurrentStep] = useState(1);
  
  // State for user details to allow editing
  const [userDetails, setUserDetails] = useState(initialUserDetails);
  
  // State to manage which field is being edited
  const [editingField, setEditingField] = useState(null);
  
  // Form data for the service request
  const [formData, setFormData] = useState({
    selectedProduct: null,
    issueDescription: '',
    preferredSlot: '',
    uploadedFiles: [],
  });

  // Handlers for user details editing
  const handleEditClick = (field) => {
    setEditingField(field);
  };

  const handleSaveField = () => {
    setEditingField(null);
    // In a real app, you would make an API call here to update the user's details permanently.
    console.log(`Saved ${editingField}:`, userDetails[editingField]);
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Step Navigation Handlers
  const handleProductSelect = (product) => {
    setFormData({ ...formData, selectedProduct: product });
    setCurrentStep(3); // Move to Issue Description
  };

  const handleNextStep = () => {
    // Perform validation for contact details step
    if (currentStep === 1) {
      if (!userDetails.address.trim() || !userDetails.phone.trim() || !userDetails.email.trim()) {
        alert("Please fill in all contact details before proceeding.");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Updated Step Tracker for 4 steps
  const StepTracker = () => (
    <div className="w-full max-w-3xl mx-auto mb-12">
        <ol className="flex items-center w-full">
            {[1, 2, 3, 4].map((step) => (
                <li key={step} className={`flex w-full items-center ${currentStep >= step ? 'text-blue-600' : 'text-gray-500'} ${step < 4 ? `after:content-[''] after:w-full after:h-1 after:border-b ${currentStep > step ? 'after:border-blue-600' : 'after:border-gray-200'} after:border-4 after:inline-block` : 'w-fit'}`}>
                    <span className={`flex items-center justify-center w-10 h-10 ${currentStep >= step ? 'bg-blue-100' : 'bg-gray-100'} rounded-full lg:h-12 lg:w-12 shrink-0`}>
                        {currentStep > step ? <CheckCircleIcon className="w-6 h-6 text-blue-600"/> : <span className="font-bold">{step}</span>}
                    </span>
                </li>
            ))}
        </ol>
    </div>
  );

  // Helper for rendering editable fields
  const renderEditableField = (field, label, icon) => {
    const isEditing = editingField === field;
    return (
      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex-grow flex items-center">
          {icon}
          {isEditing ? (
            <input
              type="text"
              name={field}
              value={userDetails[field]}
              onChange={handleInputChange}
              className="ml-3 p-2 border border-gray-300 rounded w-full text-gray-800"
            />
          ) : (
            <p className="ml-3 text-gray-700 break-all">{userDetails[field]}</p>
          )}
        </div>
        {isEditing ? (
          <button onClick={handleSaveField} className="ml-4 text-green-600 font-semibold hover:underline">Save</button>
        ) : (
          <button onClick={() => handleEditClick(field)} className="ml-4 text-blue-600 font-semibold hover:underline">Change</button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Link href={"/Dashboard"}> <Image src="/logo.jpg" alt="ElectroCare Logo" className="h-12 w-12 rounded-full"    height={30}
                  width={30} /></Link>
        <span className="text-xl md:text-2xl font-bold text-blue-900 tracking-wide">ElectroCare</span>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Request a Service</h1>
        <p className="text-center text-gray-600 mb-12 max-w-xl mx-auto">Follow these simple steps to get a certified technician at your doorstep.</p>
        
        <StepTracker />
        
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
          
          {/* NEW Step 1: Confirm Contact Details */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 1: Confirm Your Contact Details</h2>
              <p className="text-gray-600 mb-6">Please review and ensure your contact information is up-to-date for our technician.</p>
              
              <div className="space-y-4">
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 flex items-center">
                  <UserIcon className="h-5 w-5 mr-3 text-gray-500"/>
                  <p className="text-gray-700">{userDetails.name}</p>
                  <span className="ml-auto text-sm text-gray-500">(Name not editable)</span>
                </div>
                {renderEditableField('address', 'Address', <MapPinIcon className="h-5 w-5 text-gray-500"/>)}
                {renderEditableField('phone', 'Phone Number', <PhoneIcon className="h-5 w-5 text-gray-500"/>)}
                {renderEditableField('email', 'Email Address', <EnvelopeIcon className="h-5 w-5 text-gray-500"/>)}
              </div>

              <div className="flex justify-end mt-8">
                <button onClick={handleNextStep} className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Product (formerly Step 1) */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 2: Which product needs service?</h2>
              <div className="space-y-4">
                {userProducts.map(product => (
                  <button key={product.id} onClick={() => handleProductSelect(product)} className="w-full flex items-center text-left p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <div className="mr-5 shrink-0">{product.icon}</div>
                    <div className="flex-grow">
                      <p className="font-bold text-lg text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.model}</p>
                    </div>
                    <ChevronRightIcon className="h-6 w-6 text-gray-400" />
                  </button>
                ))}
              </div>
              <div className="flex justify-start mt-8">
                <button onClick={handlePrevStep} className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back
                </button>
              </div>
              <p className="text-center text-sm text-gray-500 mt-6">
                Can&apos;t find your product? <a href="/RegisterProduct" className="font-semibold text-blue-600 hover:underline">Register it here.</a>
              </p>
            </div>
          )}

          {/* Step 3: Describe Issue (formerly Step 2) */}
          {currentStep === 3 && (
            <div>
              <h2 className=" text-black text-2xl font-semibold text-gray-900 mb-2">Step 3: Describe the Issue</h2>
              <p className="text-gray-600 mb-6">Provide as much detail as possible for a faster diagnosis.</p>
              
              <div className="mb-6">
                <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 mb-2">Issue Description</label>
                <textarea
                  id="issueDescription"
                  rows="4"
                  className="text-black w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., The washing machine is making a loud banging noise during the spin cycle. It started 2 days ago."
                  value={formData.issueDescription}
                  onChange={e => setFormData({...formData, issueDescription: e.target.value})}
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos or Video (Optional)</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Service Slot</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Morning (9am-12pm)', 'Afternoon (1pm-4pm)', 'Evening (5pm-8pm)'].map(slot => (
                    <button key={slot} onClick={() => setFormData({...formData, preferredSlot: slot})} className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${formData.preferredSlot === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 hover:border-blue-500'}`}>
                      <span className="text-3xl mb-2">{slot.includes('Morning') ? '☀️' : slot.includes('Afternoon') ? '🕑' : '🌙'}</span>
                      <span className="font-semibold">{slot.split(' ')[0]}</span>
                      <span className="text-xs">{slot.match(/\(([^)]+)\)/)[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={handlePrevStep} className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back
                </button>
                <button onClick={handleNextStep} disabled={!formData.issueDescription || !formData.preferredSlot} className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-300">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation & Deposit (formerly Step 3) */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Step 4: Confirm Details</h2>
              <div className="space-y-6 border border-gray-200 rounded-lg p-6">
                <div>
                  <h3 className="text-black font-bold text-lg mb-4">Service Details:</h3>
                  <div className="text-gray-700 space-y-2">
                    <p><strong>Product:</strong> {formData.selectedProduct.name} ({formData.selectedProduct.model})</p>
                    <p><strong>Issue:</strong> {formData.issueDescription}</p>
                    <p><strong>Time Slot:</strong> {formData.preferredSlot}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-black font-bold text-lg mb-4">Contact & Address:</h3>
                  <div className="text-gray-700 space-y-3">
                    <p className="flex items-center"><UserIcon className="h-5 w-5 mr-3 text-gray-400"/> {userDetails.name}</p>
                    <p className="flex items-center"><MapPinIcon className="h-5 w-5 mr-3 text-gray-400"/> {userDetails.address}</p>
                    <p className="flex items-center"><PhoneIcon className="h-5 w-5 mr-3 text-gray-400"/> {userDetails.phone}</p>
                    <p className="flex items-center"><EnvelopeIcon className="h-5 w-5 mr-3 text-gray-400"/> {userDetails.email}</p>
                  </div>
                  <button onClick={() => setCurrentStep(1)} className="text-sm text-blue-600 hover:underline mt-2">Edit details</button>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-8">
                <h3 className="font-bold text-blue-800">Technician Visit Deposit</h3>
                <p className="text-sm text-blue-700 mt-1">
                  A refundable security deposit of **₹2000** is required to confirm the technician&apos;s visit. This amount will be adjusted against your final service bill or refunded as per our cancellation policy.
                </p>
              </div>
              
              <div className="mt-6">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-600">I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and the deposit policy.</span>
                </label>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={handlePrevStep} className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back
                </button>
                <Link href="/Payment">
                  <button className="px-6 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 w-full md:w-auto ml-4">
                    Proceed to Pay ₹2000
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}