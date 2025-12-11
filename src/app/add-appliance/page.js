"use client";
import  { useState } from "react"; 
import { 
    DevicePhoneMobileIcon, 
    ComputerDesktopIcon, 
    TvIcon,
    PhotoIcon,
    ArrowLeftIcon,
    CheckCircleIcon,
    CpuChipIcon,
    CameraIcon,
    MusicalNoteIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from "next/image";

// --- CONFIGURATION ---
const productCategories = [
    { name: 'Smartphone', icon: <DevicePhoneMobileIcon className="h-8 w-8" />, needsImei: true, emoji: "📱" },
    { name: 'Laptop & PC', icon: <ComputerDesktopIcon className="h-8 w-8" />, emoji: "💻" },
    { name: 'TV & Audio', icon: <TvIcon className="h-8 w-8" />, emoji: "📺" },
    { name: 'AC & Cooling', icon: <CpuChipIcon className="h-8 w-8" />, emoji: "❄️" },
    { name: 'Washing Machine', icon: <MusicalNoteIcon className="h-8 w-8" />, emoji: "🧺" },
    { name: 'Camera', icon: <CameraIcon className="h-8 w-8" />, emoji: "📷" },
];

const InputField = ({ id, label, type = 'text', placeholder, required = true }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
        <input 
            type={type} 
            id={id} 
            name={id} 
            placeholder={placeholder} 
            required={required}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
        />
    </div>
);

// --- MAIN COMPONENT ---
export default function AddProductPage() {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [invoiceFile, setInvoiceFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setInvoiceFile(e.target.files[0]);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const modelName = formData.get("model_id");
        const serial = formData.get("serial_number");
        const statusText = formData.get("warranty_status") || "Active Warranty";

        // Create the product object
        const newProduct = {
            id: Date.now(), // Unique ID
            name: `${selectedCategory.name} - ${modelName}`,
            model: `SN: ${serial}`,
            condition: "Working Perfectly", // Default condition
            status: statusText,
            statusColor: statusText === "Expired" ? "bg-red-500" : "bg-emerald-600",
            img: selectedCategory.emoji || "🔌"
        };

        // SAVE TO LOCAL STORAGE
        if (typeof window !== "undefined") {
            const existing = JSON.parse(localStorage.getItem("userRegisteredProducts") || "[]");
            existing.push(newProduct);
            localStorage.setItem("userRegisteredProducts", JSON.stringify(existing));
        }

        // Simulate API delay
        setTimeout(() => {
            setLoading(false);
            setStep(3);
        }, 1000); 
    };

    // --- STEP 1: CATEGORY SELECTION ---
    const renderStepOne = () => (
        <div className="animate-fade-in-up">
             <div className="text-center mb-8">
                <h1 className='text-2xl font-bold text-gray-900'>What are you registering?</h1>
                <p className="text-gray-500 mt-2">Select the category of your device to get started.</p>
             </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {productCategories.map(category => (
                    <button 
                        key={category.name} 
                        onClick={() => handleCategorySelect(category)}
                        className="group flex flex-col items-center justify-center bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                    >
                        <div className="p-3 bg-gray-100 rounded-full group-hover:bg-white text-gray-600 group-hover:text-blue-600 transition-colors">
                           {category.icon}
                        </div>
                        <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-700">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    // --- STEP 2: DETAILS FORM ---
    const renderStepTwo = () => (
        <form onSubmit={handleSubmit} className="animate-fade-in-right">
            <div className="flex items-center mb-8 pb-4 border-b border-gray-100">
                <button type="button" onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-gray-100 mr-3 -ml-2 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Add {selectedCategory.name} Details</h2>
                    <p className="text-xs text-gray-500">Provide accurate details for better service support.</p>
                </div>
            </div>
            
            <div className="space-y-4">
                <InputField id="model_id" label="Brand & Model Name" placeholder="e.g. Samsung Galaxy S23 Ultra" />
                <InputField id="serial_number" label="Serial Number" placeholder="Check back of device or box" />
                {selectedCategory.needsImei && (
                    <InputField id="imei_number" label="IMEI Number" placeholder="Dial *#06# to check" required={false} />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField id="purchase_date" label="Purchase Date" type="date" />
                      <div>
                        <label htmlFor="warranty_status" className="block text-sm font-semibold text-gray-700 mb-1.5">Warranty Status</label>
                         <select id="warranty_status" name="warranty_status" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                            <option value="Active Warranty">Active (Under 1 Year)</option>
                            <option value="Expired">Expired</option>
                            <option value="Extended Warranty">Extended Warranty</option>
                        </select>
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Invoice / Proof</label>
                    <label htmlFor="invoice-upload" className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${invoiceFile ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {invoiceFile ? (
                                <>
                                    <CheckCircleIcon className="w-8 h-8 text-green-500 mb-2" />
                                    <p className="text-sm text-gray-700 font-medium">{invoiceFile.name}</p>
                                    <p className="text-xs text-green-600">File attached successfully</p>
                                </>
                            ) : (
                                <>
                                    <PhotoIcon className="w-8 h-8 mb-2 text-gray-400" />
                                    <p className="mb-1 text-sm text-gray-500"><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-400">PDF, JPG, PNG (Max 5MB)</p>
                                </>
                            )}
                        </div>
                        <input id="invoice-upload" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                    </label>
                </div>

                <div className="pt-6">
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 disabled:bg-gray-400">
                        {loading ? "Registering..." : "Register Product"}
                    </button>
                </div>
            </div>
        </form>
    );
    
    // --- STEP 3: SUCCESS ---
    const renderStepThree = () => (
        <div className="text-center py-6 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircleIcon className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Registered!</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Your <strong>{selectedCategory?.name}</strong> has been added to your digital garage. What would you like to do next?
            </p>

            <div className="space-y-3">
                <Link href="/dashboard" className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Return to Dashboard
                </Link>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex flex-col items-center justify-center p-4">
            {/* Header / Logo */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
                <Link href="/Dashboard" className="flex items-center gap-2 group">
                     <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                        <Image src="/logo.jpg" alt="ElectroCare" className="h-8 w-8 rounded-full object-cover"
                           height={30}
                  width={30}
                        />
                     </div>
                     <span className="text-xl font-bold text-gray-900 tracking-tight">Electro<span className="text-blue-600">Care</span></span>
                </Link>
            </div>

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-10 transition-all duration-300">
                {/* Stepper Dots */}
                <div className="flex justify-center gap-2 mb-8">
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200'}`}></div>
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-8 bg-blue-600' : 'w-2 bg-gray-200'}`}></div>
                    <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 3 ? 'w-8 bg-green-500' : 'w-2 bg-gray-200'}`}></div>
                </div>

                {step === 1 && renderStepOne()}
                {step === 2 && renderStepTwo()}
                {step === 3 && renderStepThree()}
            </div>
        </div>
    );
}