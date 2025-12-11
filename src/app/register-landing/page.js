"use client";

import {
  QrCodeIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  UserGroupIcon,
  BellAlertIcon,
  GiftIcon,
  CloudArrowUpIcon,
  HomeModernIcon,
  InformationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

// --- COMPONENTS ---

// 1. Navigation (Matches the clean top bar style)
const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
    <div className="flex items-center gap-8">
      <div className="flex items-center shrink-0">
        {" "}
        <Link href="/" className="flex items-center gap-3">
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
      <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-800">
        <Link href="#" className="hover:text-blue-600 transition-colors">Shop</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Mobile</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">TV & AV</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Appliances</Link>
        <Link href="#" className="hover:text-blue-600 transition-colors">Support</Link>
      </div>
    </div>
    <div className="flex items-center gap-6 text-xs font-bold text-gray-800">
      <Link href="#" className="hover:text-blue-600 transition-colors">Support</Link>
      <Link href="#" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        For Business <ArrowRightIcon className="h-3 w-3" />
      </Link>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      </button>
    </div>
  </nav>
);

// 2. HERO SECTION (Replicates the "Registration. Easy from start to finish." image)
const HeroSection = () => (
  <div className="relative h-[600px] w-full bg-gray-100 flex items-center justify-center overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0">
      <Image 
        src="/landingRegister.png" 
        alt="Woman in kitchen with laptop" 
        fill
        className="object-cover object-center"
      />
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10"></div>
    </div>

    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
      <p className="text-white font-bold mb-4 tracking-wide uppercase text-sm drop-shadow-md">Product Registration</p>
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-tight drop-shadow-lg">
        Registration. Easy from start to finish.
      </h1>
      <Link href="/add-appliance">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl text-lg">
          Start registration
        </button>
      </Link>
    </div>
  </div>
);

// 3. BENEFITS SECTION (Replicates "Why register?" + 4 icons layout)
const BenefitsSection = () => (
  <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-white">
    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Benefits of registration</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Large Left Card: Image Background with Overlay */}
      <div className="lg:col-span-1 relative h-[500px] lg:h-auto rounded-[32px] overflow-hidden group shadow-lg">
        <Image 
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop" 
          alt="Modern Kitchen" 
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-10">
          <div className="border-2 border-white rounded-full p-2 mb-6">
             <InformationCircleIcon className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-4xl font-bold text-white mb-6">Why register?</h3>
          <p className="text-white/90 text-lg mb-8 leading-relaxed font-medium">
            Keep track of your purchases, get confirmation of ownership and enjoy the benefits of registering your products.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
            Learn more <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Right Grid: 4 Icon Cards */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { icon: BellAlertIcon, color: "text-orange-400", title: "Exclusive Notifications", desc: "Get product notifications, exclusive offers, update alerts, and all the latest news." },
          { icon: GiftIcon, color: "text-yellow-400", title: "Sweepstakes", desc: "Register your product for a chance to win ₹50,000 ElectroCare Credit!" },
          { icon: CloudArrowUpIcon, color: "text-blue-400", title: "Device Backup", desc: "You can backup and restore your data anytime, anywhere securely." },
          { icon: HomeModernIcon, color: "text-indigo-400", title: "SmartHub", desc: "SmartHub allows you to track lost devices or control other products in your home from the app." },
        ].map((item, idx) => (
          <div key={idx} className="bg-gray-50 p-10 rounded-[32px] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
             <item.icon className={`h-12 w-12 ${item.color} mb-6`} />
             <h4 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h4>
             <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// 4. EASY WAYS SECTION (Replicates the Dark Theme Bento Grid)
const EasyWaysSection = () => (
  <section className="py-24 px-4 md:px-8 max-w-[1400px] mx-auto bg-gray-50 rounded-[40px] mb-20">
    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">Easy ways to register</h2>
    
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:h-[600px]">
      
      {/* Left Column */}
      <div className="lg:col-span-1 flex flex-col gap-6 h-full">
        <div className="flex-1 bg-[#1f1f1f] rounded-[32px] p-8 flex flex-col items-center justify-center text-center text-white hover:bg-black transition-colors cursor-pointer group">
           <QrCodeIcon className="h-12 w-12 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
           <h4 className="text-xl font-bold mb-2">QR code</h4>
           <p className="text-gray-400 text-sm mb-6 px-4">Scan a QR code to register your product</p>
           <span className="text-xs font-bold underline decoration-white/50 underline-offset-4 hover:decoration-white">Learn more</span>
        </div>
        <div className="flex-1 bg-[#1f1f1f] rounded-[32px] p-8 flex flex-col items-center justify-center text-center text-white hover:bg-black transition-colors cursor-pointer group">
           <DevicePhoneMobileIcon className="h-12 w-12 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
           <h4 className="text-xl font-bold mb-2">Device activation</h4>
           <p className="text-gray-400 text-sm mb-6 px-4">Register while setting up your product</p>
           <span className="text-xs font-bold underline decoration-white/50 underline-offset-4 hover:decoration-white">Learn more</span>
        </div>
      </div>

      {/* Center Large Card */}
      <div className="lg:col-span-2 relative bg-black rounded-[32px] overflow-hidden group h-[500px] lg:h-auto">
         <Image 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
            alt="Person registering on laptop" 
            fill
            className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
         />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
            <div className="border-2 border-white rounded-full p-2 mb-6">
                <InformationCircleIcon className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Get confirmation<br/>of ownership</h3>
            <p className="text-gray-300 mb-10 max-w-md text-lg">There are multiple ways to register your product, and it only takes three easy steps.</p>
            <Link href="/add-appliance">
              <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors text-sm">
                Register your product
              </button>
            </Link>
         </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-1 flex flex-col gap-6 h-full">
        <div className="flex-1 bg-[#1f1f1f] rounded-[32px] p-8 flex flex-col items-center justify-center text-center text-white hover:bg-black transition-colors cursor-pointer group">
           <UserGroupIcon className="h-12 w-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
           <h4 className="text-xl font-bold mb-2">Members</h4>
           <p className="text-gray-400 text-sm mb-6 px-4">Register with the ElectroCare Members app</p>
           <span className="text-xs font-bold underline decoration-white/50 underline-offset-4 hover:decoration-white">Learn more</span>
        </div>
        <div className="flex-1 bg-[#1f1f1f] rounded-[32px] p-8 flex flex-col items-center justify-center text-center text-white hover:bg-black transition-colors cursor-pointer group">
           <GlobeAltIcon className="h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
           <h4 className="text-xl font-bold mb-2">ElectroCare.com</h4>
           <p className="text-gray-400 text-sm mb-6 px-4">Register online instantly</p>
           <span className="text-xs font-bold underline decoration-white/50 underline-offset-4 hover:decoration-white">Learn more</span>
        </div>
      </div>

    </div>
  </section>
);

// 5. TESTIMONIALS (Matches the specific design: Big quote mark + text)
const Testimonials = () => (
  <section className="py-20 px-4 md:px-8 max-w-[1400px] mx-auto bg-white mb-20">
     <h2 className="text-3xl font-bold text-gray-800 mb-12 text-left">What our customers have to say</h2>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { 
            quote: "Provides doorstep delivery", 
            text: "Can order from anywhere and any time since ElectroCare provides doorstep delivery.", 
            author: "Subhash Sehgal" 
          },
          { 
            quote: "Used the app and found it easy to use", 
            text: "Excellent app. Have used this regularly and found it very easy to use. All info is readily available and the response after order placement is prompt.", 
            author: "Snehal Shah" 
          },
          { 
            quote: "Best, Very customer friendly app by nature", 
            text: "ElectroCare is the best... during the Lockdown, this app does not reduce the discount, which shows the customer-friendly nature of the ElectroCare. Thank You!!", 
            author: "Laksh Kankariya" 
          },
        ].map((t, i) => (
          <div key={i} className="relative group">
             {/* Large Quote Mark */}
             <div className="text-blue-100 text-[120px] font-serif absolute -top-20 -left-6 select-none -z-10 group-hover:text-blue-200 transition-colors">“</div>
             
             <div className="relative z-10 pt-4">
                {/* Highlighted Title */}
                <div className="inline-block relative mb-4">
                   <div className="absolute inset-0 bg-blue-50/50 -skew-x-6 h-3/4 bottom-0 top-auto w-full -z-10"></div>
                   <h4 className="text-xl font-bold text-gray-900 leading-tight">{t.quote}</h4>
                </div>
                
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">{t.text}</p>
                <div className="flex items-center gap-2">
                   <div className="w-6 h-[2px] bg-gray-300"></div>
                   <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{t.author}</p>
                </div>
             </div>
          </div>
        ))}
     </div>
  </section>
);

// 6. SUPPORT BANNER (Replicates the "Were here for you" wide banner)
const SupportBanner = () => (
  <section className="px-4 md:px-8 max-w-[1400px] mx-auto mb-24">
    <div className="bg-gray-100 rounded-[32px] overflow-hidden flex flex-col md:flex-row items-center relative">
       {/* Text Content */}
       <div className="p-12 md:p-20 md:w-1/2 z-10">
          <p className="text-sm font-bold text-gray-600 mb-2">We&apos;re here for you</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact ElectroCare Support</h2>
          <p className="text-gray-600 mb-8 max-w-md text-sm leading-relaxed">
             Contact us online through chat and get support from an expert on your computer, mobile device or tablet. Support is also available on your mobile device through the ElectroCare Members App.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors">
             Get support
          </button>
       </div>

       {/* Image Content (Right Side) */}
       <div className="md:w-1/2 h-[400px] md:h-[500px] relative w-full">
          <Image 
             src="https://images.unsplash.com/photo-1556740758-90de2929e50a?q=80&w=2070&auto=format&fit=crop" 
             alt="Support Staff" 
             fill
             className="object-cover object-top"
          />
          {/* Gradient Overlay for seamless blending on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent md:bg-gradient-to-r md:from-gray-100 md:via-transparent md:to-transparent"></div>
       </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-12">
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 text-xs text-gray-500">
      <div className="mb-8 leading-relaxed max-w-4xl">
        * ElectroCare Account required for network-based smart services, including streaming apps and other smart features. Separate [connected] computer, mobile or other device may be necessary to create/log in to ElectroCare Account. Without Account log in, only external device connections (e.g., via HDMI) and terrestrial/over-the-air TV (only for TVs with tuners) available.
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-100">
         <div className="flex gap-6 font-bold text-gray-800">
            <Link href="/Dashboard" className="hover:underline">Home</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">Support</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:underline">Register Product</Link>
         </div>
         <p>&copy; 2025 ElectroCare India Pvt Ltd. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- MAIN PAGE ---
export default function RegisterLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <EasyWaysSection />
      <Testimonials />
      <SupportBanner />
      <Footer />
    </div>
  );
}