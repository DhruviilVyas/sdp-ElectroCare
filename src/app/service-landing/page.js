"use client";

import {
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  MapPinIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  TvIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
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
    <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-600">
      <Link href="ServiceReq" className="hover:text-blue-600">Repairs</Link>
      <Link href="products" className="hover:text-blue-600"> Plans</Link>
      <Link href="#" className="hover:text-blue-600">Business</Link>
    </div>
    <div className="flex gap-4">
        <Link href="/Dashboard" className="hidden md:block px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            Home
        </Link>
        <Link href="/ServiceReq">
            <button className="px-6 py-2.5 text-sm font-bold text-white bg-black rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                Book Repair
            </button>
        </Link>
    </div>
  </nav>
);

// 1. HERO SECTION (High Trust & Conversion)
const HeroSection = () => (
  <section className="relative pt-20 pb-32 overflow-hidden bg-gray-50">
    <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-bold mb-8 animate-fade-in-up">
            <CheckBadgeIcon className="h-5 w-5" />
            <span>#1 Trusted Electronics Repair Service in Gujarat</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight max-w-4xl mx-auto">
            Expert Repairs, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Delivered to Your Doorstep.</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            We fix your devices with <strong>original parts</strong>, <strong>certified experts</strong>, and a <strong>30-day service warranty</strong>. Track your technician in real-time.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/ServiceReq">
                <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 text-lg flex items-center justify-center gap-2">
                    <WrenchScrewdriverIcon className="h-5 w-5" /> Book a Service
                </button>
            </Link>
            <Link href="/add-appliance">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-800 font-bold rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-lg">
                    Check Warranty Status
                </button>
            </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['Samsung', 'LG', 'Sony', 'Apple', 'Daikin'].map(brand => (
                <span key={brand} className="text-xl font-bold text-gray-400">{brand} Authorized</span>
            ))}
        </div>
    </div>

    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 pointer-events-none"></div>
  </section>
);

// 2. FEATURE SHOWCASE (The "Why Us")
const FeaturesSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why India Trusts ElectroCare</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We&apos;ve reimagined the repair experience. No more hidden costs, no more waiting in line.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <MapPinIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Live Technician Tracking</h3>
                <p className="text-gray-600 leading-relaxed">
                    Know exactly when help arrives. Track your assigned expert on a live map, just like ordering a cab.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                    <ShieldCheckIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">100% Genuine Parts</h3>
                <p className="text-gray-600 leading-relaxed">
                    We use only OEM-certified components. Every repair comes with a 30-day unconditional warranty.
                </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-lg transition-shadow group">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                    <UserGroupIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Background Verified Pros</h3>
                <p className="text-gray-600 leading-relaxed">
                    Safety first. All our technicians are background-checked, vaccinated, and rigorously trained experts.
                </p>
            </div>
        </div>
    </div>
  </section>
);

// 3. SERVICE CATEGORIES
const ServicesGrid = () => (
  <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
              <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">What we fix</h2>
                  <p className="text-gray-400">Comprehensive care for all your home electronics.</p>
              </div>
              <Link href="/products" className="text-blue-400 font-bold hover:text-blue-300 hidden md:flex items-center gap-2">
                  View all services <ArrowRightIcon className="h-4 w-4" />
              </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                  { name: "AC Repair", icon: <CpuChipIcon className="h-8 w-8" />, desc: "Cleaning & Gas Refill" },
                  { name: "Smart TV", icon: <TvIcon className="h-8 w-8" />, desc: "Display & Sound Issues" },
                  { name: "Laptops", icon: <ComputerDesktopIcon className="h-8 w-8" />, desc: "Hardware & Software" },
                  { name: "Mobiles", icon: <DevicePhoneMobileIcon className="h-8 w-8" />, desc: "Screen & Battery" },
              ].map((service, idx) => (
                  <div key={idx} className="bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition-colors cursor-pointer group border border-gray-700 hover:border-gray-600">
                      <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                      <h4 className="font-bold text-lg mb-1">{service.name}</h4>
                      <p className="text-sm text-gray-400">{service.desc}</p>
                  </div>
              ))}
          </div>
      </div>
  </section>
);

// 4. HOW IT WORKS
const HowItWorks = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">Simple 3-Step Process</h2>
            
            <div className="relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        { step: "01", title: "Book Online", desc: "Choose your device and preferred time slot in 60 seconds." },
                        { step: "02", title: "Expert Arrives", desc: "Our verified technician arrives at your doorstep on time." },
                        { step: "03", title: "Relax & Pay", desc: "Pay securely only after the job is done to your satisfaction." },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-6 text-center">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg shadow-blue-200">
                                {s.step}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                            <p className="text-gray-500">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

// 5. CTA BANNER
const CtaBanner = () => (
    <section className="py-20 px-6">
        <div className="container mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[40px] p-10 md:p-16 text-center md:text-left relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to fix your device?</h2>
                    <p className="text-blue-100 text-lg max-w-xl">Join 50,000+ happy customers in Ahmedabad who trust ElectroCare.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/ServiceReq">
                        <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-12 text-center text-sm text-gray-500">
    <div className="container mx-auto px-6">
        <div className="flex justify-center gap-6 mb-8 font-semibold text-gray-700">
            <Link href="#" className="hover:text-blue-600">About Us</Link>
            <Link href="#" className="hover:text-blue-600">Careers</Link>
            <Link href="#" className="hover:text-blue-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-600">Contact</Link>
        </div>
        <p>&copy; 2025 ElectroCare Services Pvt Ltd. All rights reserved. Made with ❤️ in India.</p>
    </div>
  </footer>
);

// --- MAIN PAGE ---
export default function ServiceLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesGrid />
      <HowItWorks />
      <CtaBanner />
      <Footer />
    </div>
  );
}