"use client";

import  { useState } from "react";
import {
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  CheckCircleIcon,
   
  XCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CheckBadgeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const testimonials = [
  { id: 1, quote: "Provides doorstep delivery", text: "Can order from anywhere...", author: "Subhash Sehgal", bg: "bg-blue-50" },
  { id: 2, quote: "Used the app and found it easy", text: "Excellent app...", author: "Snehal Shah", bg: "bg-green-50" },
  { id: 3, quote: "Customer friendly", text: "Best during lockdown...", author: "Laksh Kankariya", bg: "bg-purple-50" },
];

// --- NAVBAR ---
// 1. HERO SECTION
const WarrantyHero = () => (
  <section className="bg-gray-900 text-white py-16 px-6 md:px-12 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
    <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

    <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
      <div>
        <p className="text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">ElectroCare Shield</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Extend the life of<br />your favorite devices.
        </h1>
        <p className="text-gray-400 text-lg mb-6 max-w-lg leading-relaxed">
           Get 100% cashless repairs, genuine parts, and expert service after the manufacturer warranty ends.
        </p>

        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
             <div className="p-2 bg-gray-800 rounded-lg"><ShieldCheckIcon className="h-5 w-5 text-green-400" /></div>
             <div><p className="text-xs text-gray-400">Claims Settled</p><p className="font-bold">100% Cashless</p></div>
          </div>
          <div className="flex items-center gap-2">
             <div className="p-2 bg-gray-800 rounded-lg"><WrenchScrewdriverIcon className="h-5 w-5 text-blue-400" /></div>
             <div><p className="text-xs text-gray-400">Service Time</p><p className="font-bold">Within 24hrs</p></div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <Link href="/ExtendWarrenty/purchase">
            <button className="w-full md:w-auto bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl">
            <CheckBadgeIcon className="h-5 w-5" /> Check Eligibility
            </button>
        </Link>
                <Link href="/ExtendWarrenty/purchase">

        <button className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700 font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-blue-900/20">
           View Plans
        </button>
        </Link>
      </div>
    </div>
  </section>
);

// 2. WHY US SECTION
const WhyUsSection = () => (
    <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why ElectroCare Shield?</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">We take the &quot;stress&quot; out of distress. One tap service booking.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                        <CurrencyRupeeIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">100% Cashless</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Never pay a technician. We settle the bill directly with the service center. No hidden fees.
                    </p>
                </div>

                <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-200 hover:shadow-2xl transition-all transform md:-translate-y-4 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6">
                            <CheckBadgeIcon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Genuine Promise</h3>
                        <p className="text-blue-100 leading-relaxed">
                            We promise to use only OEM (Original Equipment Manufacturer) parts.
                        </p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                        <ClockIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">60-Min Response</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Breakdown? Just hit the &quot;SOS&quot; button. A technician is assigned within 60 minutes.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

// 3. COMPARISON SECTION
const ComparisonSection = () => (

    <section className="py-24 bg-white">
                    <Link href="/ExtendWarrenty/purchase">

        <div className="container mx-auto px-6 max-w-5xl">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Warranty vs. ElectroCare Shield</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="hidden md:flex flex-col gap-6 pt-16 text-gray-400 font-medium">
                            <div className="h-8">Coverage Period</div>
                            <div className="h-8">Physical Damage</div>
                            <div className="h-8">Power Surge Protection</div>
                            <div className="h-8">Free Service Visits</div>
                            <div className="h-8">Depreciation Deducted</div>
                        </div>
                        <div className="bg-gray-800 rounded-2xl p-6 text-center border border-gray-700">
                            <h3 className="text-xl font-bold text-gray-400 mb-6">Standard Warranty</h3>
                            <div className="space-y-6 text-sm text-gray-300">
                                <p className="h-8 flex items-center justify-center">1 Year</p>
                                <p className="h-8 flex items-center justify-center text-red-400"><XCircleIcon className="h-5 w-5 mr-1" /> No</p>
                                <p className="h-8 flex items-center justify-center text-red-400"><XCircleIcon className="h-5 w-5 mr-1" /> No</p>
                                <p className="h-8 flex items-center justify-center">Limited</p>
                                <p className="h-8 flex items-center justify-center text-red-400">Yes</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-2xl p-6 text-center shadow-lg relative transform md:scale-110">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1 rounded-b-lg">RECOMMENDED</div>
                            <h3 className="text-xl font-bold text-white mb-6">ElectroCare Shield</h3>
                            <div className="space-y-6 text-sm font-medium">
                                <p className="h-8 flex items-center justify-center">Up to 4 Years</p>
                                <p className="h-8 flex items-center justify-center text-green-300"><CheckCircleIcon className="h-5 w-5 mr-1" /> Covered</p>
                                <p className="h-8 flex items-center justify-center text-green-300"><CheckCircleIcon className="h-5 w-5 mr-1" /> Covered</p>
                                <p className="h-8 flex items-center justify-center">Unlimited</p>
                                <p className="h-8 flex items-center justify-center text-green-300">Zero</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    </Link>

    </section>
);

// 4. PRICING SECTION
const PricingSection = () => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-gray-500">Choose a plan that fits your gadgets.</p>
                </div>
                                    <Link href="/ExtendWarrenty/purchase">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        { name: "Starter", price: "₹1,999", device: "1 Device", color: "bg-white", btn: "bg-gray-100 text-gray-900 hover:bg-gray-200" },
                        { name: "Family Shield", price: "₹4,999", device: "3 Devices", color: "bg-white border-2 border-blue-500 relative", btn: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg", tag: true },
                        { name: "Whole Home", price: "₹9,999", device: "All Appliances", color: "bg-white", btn: "bg-gray-100 text-gray-900 hover:bg-gray-200" },
                    ].map((plan, i) => (
                        <div key={i} className={`p-8 rounded-3xl shadow-sm transition-all hover:shadow-xl ${plan.color} flex flex-col`}>
                            {plan.tag && <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase">Best Value</div>}
                            <h3 className="text-lg font-bold text-gray-500 mb-4">{plan.name}</h3>
                            <div className="flex items-end gap-1 mb-6">
                                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                <span className="text-gray-400 mb-1">/year</span>
                            </div>
                            <div className="border-t border-gray-100 my-6"></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm text-gray-700 font-bold"><DevicePhoneMobileIcon className="h-5 w-5 text-blue-500"/> {plan.device} Covered</li>
                                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircleIcon className="h-5 w-5 text-green-500"/> Unlimited Repairs</li>
                                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircleIcon className="h-5 w-5 text-green-500"/> 100% Parts & Labor</li>
                                <li className="flex items-center gap-3 text-sm text-gray-600"><CheckCircleIcon className="h-5 w-5 text-green-500"/> Free Pick & Drop</li>
                            </ul>
                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.btn}`}>
                                Select Plan
                            </button>
                        </div>
                    ))}
                </div>
                                    </Link>
            </div>
        </section>
    );
};

// 5. TESTIMONIAL BANNER
const TestimonialsSection = () => (
  <section className="  mb-12">
    <h3 className="text-2xl font-bold text-gray-800 mb-6">What our customers have to say</h3>
    <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x no-scrollbar">
      {testimonials.map((t) => (
        <div key={t.id} className="relative bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif leading-none">“</div>
          <div className="relative z-10">
            <h4 className="font-bold text-gray-800 text-lg mb-2 relative">
              <span className={`absolute inset-0 opacity-20 -skew-y-2 rounded ${t.bg}`}></span>
              <span className="relative">{t.quote}</span>
            </h4>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">{t.text}</p>
            <p className="text-sm font-bold text-gray-400">- {t.author}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);


// 6. FAQ SECTION
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
        { q: "What appliances are covered?", a: "We cover ACs, Refrigerators, Washing Machines, Televisions, and Microwave Ovens under the standard plan." },
        { q: "Is physical damage covered?", a: "No, the warranty covers mechanical and electrical breakdowns. Physical or accidental damage is not covered." },
        { q: "How do I claim the warranty?", a: "Simply log in to your dashboard, select the registered appliance, and click 'Request Service'. Our team will handle the rest." },
        { q: "Can I cancel my plan?", a: "Yes, you can cancel within 15 days of purchase for a full refund if no services have been availed." },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-bold text-gray-800">{faq.q}</span>
                                {openIndex === i ? <ChevronUpIcon className="h-5 w-5 text-blue-600" /> : <ChevronDownIcon className="h-5 w-5 text-gray-400" />}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 p-5 pt-0' : 'max-h-0'}`}>
                                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm">
            <span className="font-bold text-white text-lg">ElectroCare</span> <br/>
            Your Digital Garage & Protection Partner.
        </div>
        <div className="flex gap-8 text-sm font-medium">
            <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Support</Link>
        </div>
        <p className="text-xs">&copy; 2025 ElectroCare India. All rights reserved.</p>
    </div>
  </footer>
);

// --- MAIN PAGE ---
export default function ExtendWarrantyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
      <Navbar />
      <WarrantyHero />
      <WhyUsSection />
      <ComparisonSection />
      <PricingSection />
        <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}