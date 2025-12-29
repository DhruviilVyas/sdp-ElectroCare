"use client";
import { useState } from "react"; 
import { useSession } from "next-auth/react";
import { 
    DevicePhoneMobileIcon, ComputerDesktopIcon, TvIcon,
    PhotoIcon, ArrowLeftIcon, CheckCircleIcon,
    CpuChipIcon, CameraIcon, MusicalNoteIcon, StarIcon
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
            type={type} id={id} name={id} placeholder={placeholder} required={required}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
        />
    </div>
);

export default function AddProductPage() {
    const { data: session } = useSession();
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [invoiceFile, setInvoiceFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setInvoiceFile(e.target.files[0]);
        }
    };
    
    // --- REAL WORLD SUBMISSION LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        if (!session?.user?.email) {
            setErrorMsg("You must be logged in to register a product.");
            setLoading(false);
            return;
        }

        const formData = new FormData(e.currentTarget);
        
        // In a real production app, you would upload 'invoiceFile' to AWS S3 here 
        // and get a URL back. For now, we simulate it with a placeholder.


     const payload = {
            // 👇 3. REAL FIX: Session se email/id bhejein
            userId: session.user.email, 
            category: selectedCategory.name,
            // ... baaki fields same raheinge
            name: `${selectedCategory.name} - ${formData.get("model_id")}`,
            model: formData.get("model_id"),
            serialNumber: formData.get("serial_number"),
            imeiNumber: formData.get("imei_number") || "",
            purchaseDate: formData.get("purchase_date"),
            warrantyStatus: formData.get("warranty_status"),
            invoiceUrl: null, // Placeholder
            image: selectedCategory.emoji
        };

        try {
            const res = await fetch("/api/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            // Success! Move to next step
            setStep(3);
        } catch (error) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
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
            <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
                <button type="button" onClick={() => setStep(1)} className="p-2 rounded-full hover:bg-gray-100 mr-3 -ml-2 transition-colors">
                    <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
                </button>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Add {selectedCategory.name} Details</h2>
                    <p className="text-xs text-gray-500">Provide accurate details for better service support.</p>
                </div>
            </div>

            {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    {errorMsg}
                </div>
            )}
            
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
                            <option value="Active">Active (Under 1 Year)</option>
                            <option value="Expired">Expired</option>
                            <option value="Extended">Extended Warranty</option>
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
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {loading ? "Registering Device..." : "Register Product"}
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
                Your <strong>{selectedCategory?.name}</strong> has been added to the database.
            </p>

            <div className="space-y-3">
                <Link href="/Dashboard" className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    Return to Dashboard
                </Link>
                <button onClick={() => setStep(1)} className="block w-full py-3 text-gray-500 font-semibold hover:text-gray-800">
                    Register Another Device
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-white font-sans selection:bg-blue-100">
            <div className="hidden lg:flex w-1/2 relative bg-gray-900 overflow-hidden">
                {/* Background Image - Replace src with your actual image path */}
                <Image 
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" 
                    alt="Workspace Setup" 
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                
                {/* Branding Overlay */}
                <div className="relative z-10 flex flex-col justify-between w-full h-full p-12">
                  <br />
                  <br />
                  

                    <div className="space-y-6 max-w-lg">
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <h2 className="text-4xl font-bold text-white leading-tight">
                            &quot;The easiest way to track warranty and service history for all your electronics.&quot;
                        </h2>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500"></div>
                            <div>
                                <p className="text-white font-semibold">Dhruvil Vyas</p>
                                <p className="text-blue-200 text-sm">Product Designer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             
            <div className="absolute top-6 left-6 flex items-center gap-3 ">
                <Link href="/Dashboard" className="flex items-center gap-2 group">
                      <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                        <Image src="/logo.jpg" alt="ElectroCare" className="h-8 w-8 rounded-full object-cover" height={30} width={30} />
                      </div>
                      <span className="text-xl font-bold text-gray-900 tracking-tight">Electro<span className="text-blue-600">Care</span></span>
                </Link>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col relative justify-center p-8 md:p-16 lg:p-24">
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