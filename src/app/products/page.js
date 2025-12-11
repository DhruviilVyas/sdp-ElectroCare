"use client";

import {
  MagnifyingGlassIcon,
  BellIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  PlusIcon,
  ShieldCheckIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

// --- DUMMY DATA ---

const serviceItems = [
  {
    id: "SRV-9928",
    product: "Samsung 253L Refrigerator",
    issue: "Compressor Coil Issue",
    status: "Repair in Progress",
    progress: 60,
    technician: "Rajesh Kumar",
    date: "10 Dec, 2025",
    icon: "❄️"
  }
];

const registeredProducts = [
  {
    id: 1,
    name: "Sony Bravia 55' 4K Smart LED TV",
    model: "KD-55X80J",
    purchaseDate: "12 Aug 2024",
    warrantyStatus: "Active",
    warrantyColor: "text-emerald-600 bg-emerald-50",
    image: "📺",
    price: "₹64,990"
  },
  {
    id: 2,
    name: "Apple MacBook Air M2",
    model: "A2681",
    purchaseDate: "05 Jan 2023",
    warrantyStatus: "Expired",
    warrantyColor: "text-red-600 bg-red-50",
    image: "💻",
    price: "₹1,14,900"
  },
  {
    id: 3,
    name: "Daikin 1.5 Ton Split AC",
    model: "MTKM50U",
    purchaseDate: "20 Mar 2025",
    warrantyStatus: "Active",
    warrantyColor: "text-emerald-600 bg-emerald-50",
    image: "💨",
    price: "₹45,500"
  },
  {
    id: 4,
    name: "Canon EOS 1500D",
    model: "DS126741",
    purchaseDate: "11 Nov 2023",
    warrantyStatus: "Extended",
    warrantyColor: "text-blue-600 bg-blue-50",
    image: "📷",
    price: "₹38,990"
  }
];

const invoices = [
  { id: "INV-2024-001", name: "Sony_TV_Invoice.pdf", size: "2.4 MB", date: "12 Aug 2024", product: "Sony Bravia TV" },
  { id: "INV-2023-882", name: "Macbook_Bill_Croma.pdf", size: "1.1 MB", date: "05 Jan 2023", product: "MacBook Air" },
  { id: "INV-2025-112", name: "Daikin_AC_Invoice.jpg", size: "4.5 MB", date: "20 Mar 2025", product: "Daikin AC" },
];

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center shrink-0">
        {" "}
        <Link href="/Dashboard" className="flex items-center gap-3">
          {" "}
          <Image
            src="/logo2.png"
            alt="ElectroCare Logo"
            className="h-10 w-10 object-contain rounded-full border border-gray-100 shadow-sm"
     height={30}
                  width={30}
/>{" "}
          <div className="flex items-center">
            {" "}
            <span className="text-red-500 font-bold text-2xl tracking-tighter">
              Electro
            </span>{" "}
            <span className="text-blue-600 font-bold text-2xl tracking-tighter">
              Care
            </span>{" "}
          </div>{" "}
        </Link>{" "}
      </div>{" "}
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
        <input type="text" placeholder="Search your products..." className="bg-transparent border-none focus:ring-0 text-sm w-64 outline-none" />
      </div>
      <button className="p-2 relative hover:bg-gray-100 rounded-full transition-colors">
        <BellIcon className="h-6 w-6 text-gray-600" />
        <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        AP
      </div>
    </div>
  </nav>
);

// 1. HERO SUMMARY SECTION
const GarageHero = () => (
  <section className="bg-gray-900 text-white py-16 px-6 md:px-12 relative overflow-hidden">
    {/* Abstract Shapes */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

    <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
      <div>
        <p className="text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">My Digital Garage</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All your devices,<br/>managed in one place.</h1>
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-gray-800 rounded-lg"><ShieldCheckIcon className="h-5 w-5 text-green-400" /></div>
             <div><p className="text-xs text-gray-400">Protection Value</p><p className="font-bold">₹2,64,380</p></div>
          </div>
          <div className="flex items-center gap-2">
             <div className="p-2 bg-gray-800 rounded-lg"><DocumentTextIcon className="h-5 w-5 text-blue-400" /></div>
             <div><p className="text-xs text-gray-400">Total Documents</p><p className="font-bold">12 Files</p></div>
          </div>
        </div>
      </div>
      
      <Link href="/add-appliance">
        <button className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl">
          <PlusIcon className="h-5 w-5" /> Add New Product
        </button>
      </Link>
    </div>
  </section>
);

// 2. ACTIVE SERVICE SECTION (High Priority)
const ActiveServiceSection = () => (
  <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 mb-16">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-orange-50 px-6 py-3 border-b border-orange-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-orange-800 font-bold">
          <WrenchScrewdriverIcon className="h-5 w-5 animate-pulse" />
          <span>Live Service Updates</span>
        </div>
        <span className="text-xs font-semibold bg-white px-2 py-1 rounded text-orange-600">1 Active</span>
      </div>
      
      {serviceItems.map((item) => (
        <div key={item.id} className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
           {/* Icon & Info */}
           <div className="flex items-center gap-6 w-full md:w-1/3">
              <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{item.product}</h3>
                <p className="text-red-500 text-sm font-medium">{item.issue}</p>
                <p className="text-gray-400 text-xs mt-1">ID: {item.id}</p>
              </div>
           </div>

           {/* Progress Tracker */}
           <div className="flex-1 w-full">
              <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                 <span>Request</span>
                 <span className="text-blue-600 font-bold">Repairing</span>
                 <span>QC Check</span>
                 <span>Delivery</span>
              </div>
              <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full relative" style={{ width: `${item.progress}%` }}>
                    <div className="absolute right-0 top-0 h-full w-full bg-white/20 animate-[shimmer_2s_infinite]"></div>
                 </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                 <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="h-8 w-8 bg-gray-200 rounded-full overflow-hidden">
                     <Image
  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh"
  alt="Avatar"
  width={60}
  height={60}
  unoptimized
  className="rounded-full"
/>
</div>
                    <span>Technician: <b>{item.technician}</b></span>
                 </div>
                 <button className="text-blue-600 text-xs font-bold hover:underline">Track Live Location</button>
              </div>
           </div>
        </div>
      ))}
    </div>
  </section>
);

// 3. REGISTERED PRODUCTS GRID
const ProductGrid = () => (
  <section className="max-w-7xl mx-auto px-6 mb-20">
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Your Products</h2>
        <p className="text-gray-500 text-sm mt-1">Manage warranty, book service, or view details.</p>
      </div>
      <div className="flex gap-2">
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"><FunnelIcon className="h-5 w-5" /></button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-semibold text-gray-700">Sort by: Date</button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {registeredProducts.map((product) => (
        <div key={product.id} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 relative">
          
          {/* Card Header (Image) */}
          <div className="h-48 bg-gray-50 flex items-center justify-center relative overflow-hidden">
             <span className="text-7xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">{product.image}</span>
             <div className={`absolute top-4 left-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${product.warrantyColor}`}>
                {product.warrantyStatus} Warranty
             </div>
             <button className="absolute top-4 right-4 p-1.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-blue-600">
                <EllipsisHorizontalIcon className="h-5 w-5" />
             </button>
          </div>

          {/* Card Body */}
          <div className="p-5">
             <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 line-clamp-1" title={product.name}>{product.name}</h3>
             </div>
             <p className="text-xs text-gray-500 mb-4">{product.model}</p>
             
             <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3 mb-4">
                <span>Purchased: {product.purchaseDate}</span>
                <span className="font-semibold text-gray-900">{product.price}</span>
             </div>

             {/* Action Buttons */}
             <div className="grid grid-cols-2 gap-2">
                <button className="w-full py-2 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-100 border border-gray-200">
                   View Details
                </button>
                <button className={`w-full py-2 text-white text-xs font-bold rounded-lg transition-colors ${product.warrantyStatus === 'Expired' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                   {product.warrantyStatus === 'Expired' ? 'Renew Plan' : 'Book Service'}
                </button>
             </div>
          </div>
        </div>
      ))}
      
      {/* "Add New" Placeholder Card */}
      <Link href="/add-appliance" className="flex flex-col items-center justify-center h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
         <div className="p-4 bg-white rounded-full shadow-sm mb-4">
            <PlusIcon className="h-8 w-8" />
         </div>
         <span className="font-bold">Register New Product</span>
      </Link>
    </div>
  </section>
);

// 4. INVOICE VAULT SECTION
const InvoiceVault = () => (
  <section className="bg-gray-50 py-20 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
         <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
               <DocumentTextIcon className="h-7 w-7 text-blue-600" />
               Document Vault
            </h2>
            <p className="text-gray-500 text-sm mt-1">Securely accessed invoices and warranty cards.</p>
         </div>
         <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 shadow-sm">
            Upload New Document
         </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-200">
               <tr>
                  <th className="px-6 py-4">Document Name</th>
                  <th className="px-6 py-4">Linked Product</th>
                  <th className="px-6 py-4 hidden md:table-cell">Date Added</th>
                  <th className="px-6 py-4 hidden sm:table-cell">Size</th>
                  <th className="px-6 py-4 text-right">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
               {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-blue-50/50 transition-colors">
                     <td className="px-6 py-4 font-medium flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded text-red-600"><DocumentTextIcon className="h-5 w-5" /></div>
                        {inv.name}
                     </td>
                     <td className="px-6 py-4 text-gray-500">{inv.product}</td>
                     <td className="px-6 py-4 hidden md:table-cell">{inv.date}</td>
                     <td className="px-6 py-4 hidden sm:table-cell text-gray-400">{inv.size}</td>
                     <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 hover:text-blue-800 font-bold flex items-center justify-end gap-1 w-full">
                           <ArrowDownTrayIcon className="h-4 w-4" /> <span className="hidden sm:inline">Download</span>
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div className="p-4 border-t border-gray-100 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">View All Documents</button>
         </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
      <p>&copy; 2025 ElectroCare Services Pvt Ltd. All rights reserved.</p>
    </div>
  </footer>
);

// --- MAIN PAGE ---
export default function ProductListingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Navbar />
      <GarageHero />
      <ActiveServiceSection />
      <ProductGrid />
      <InvoiceVault />
      <Footer />
    </div>
  );
}