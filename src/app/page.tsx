// src/components/HomePage.js

import React from 'react';
import { 
  ShieldCheckIcon, 
  WrenchScrewdriverIcon, 
  CloudArrowUpIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CpuChipIcon,
  TvIcon,
  CameraIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import Header from './header/page';
import Link from 'next/link';
import Image from 'next/image';

// --- Individual Section Components for better organization ---

const HeroSection = () => (
   <>
   <Header/> 
    <section 
    className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
    style={{ backgroundImage: "url('/hero.png')" }}
  >
    
    <div className="container mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 lg:w-3/5 mb-10 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white-800 mb-4 leading-tight">
            Simplify Your Appliance Care.
          </h1>
          <p className="text-lg text-black-600 mb-8">
            Register products, track warranties, and book services instantly. Never lose a receipt or miss an expiry date again.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="/Dashboard" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
       
      </div>
    </div>
  </section>
  </>
);

const ServicesSection = () => (
  <section className="bg-gray-50">
    <div className="container mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Core Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform">
          <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Warranty Management</h3>
          <p className="text-gray-600">Track all your warranties in one place. Get automatic expiry reminders so you&apos;re always covered.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform">
          <WrenchScrewdriverIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">On-Demand Repairs</h3>
          <p className="text-gray-600">Book verified technicians for repairs and maintenance. Track your service request in real-time.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform">
          <CloudArrowUpIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Digital Documents</h3>
          <p className="text-gray-600">Securely upload and store your invoices and warranty cards. Access them anytime, anywhere.</p>
        </div>
      </div>
    </div>
  </section>
);

const ProductCategoriesSection = () => {
    const categories = [
        { name: 'Smartphones', icon: <DevicePhoneMobileIcon className="h-10 w-10 text-gray-600" /> },
        { name: 'Laptops & PCs', icon: <ComputerDesktopIcon className="h-10 w-10 text-gray-600" /> },
        { name: 'TV & Audio', icon: <TvIcon className="h-10 w-10 text-gray-600" /> },
        { name: 'AC & Coolers', icon: <CpuChipIcon className="h-10 w-10 text-gray-600" /> }, // Placeholder icon
        { name: 'Washing Machines', icon: <MusicalNoteIcon className="h-10 w-10 text-gray-600" /> }, // Placeholder icon
        { name: 'Kitchen Appliances', icon: <CameraIcon className="h-10 w-10 text-gray-600" /> }, // Placeholder icon
    ];

    return (
        <section className="bg-white py-20">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">We Service All Your Devices</h2>
                <p className="text-gray-600 mb-12 max-w-2xl mx-auto">From your phone to your refrigerator, we have certified technicians for every major electronic appliance.</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {categories.map(category => (
                        <div key={category.name} className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6 w-32 h-32 md:w-40 md:h-40 hover:bg-blue-100 hover:shadow-md transition-all">
                            {category.icon}
                            <span className="mt-2 text-sm font-semibold text-gray-700">{category.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const CallToActionSection = () => (
  <section className="bg-blue-600 text-white">
    <div className="container mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-3">All Your Appliances, One Dashboard</h2>
      <h1 className="text-xl text-black font-bold mb-3">ElectroCare</h1>
      <p className="mb-8 max-w-xl mx-auto">
        Stop searching through drawers for papers. Log in to your personal dashboard to see everything at a glance.
      </p>
      <Link href="/Dashboard" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105">
        Go to My Dashboard
      </Link>
    </div>
  </section>
);


const TestimonialsSection = () => (
  <section className="bg-gray-50 py-20">
    <div className="container mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">What Our Customers Say</h2>
      <p className='text-black  py-3'>ElectroCare is not just a Platform,it&apos;s a million of user&apos;s trust✨.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 italic mb-4">ElectroCare is a lifesaver! I got a reminder that my TV warranty was about to expire and saved hundreds on an extended plan. Highly recommend!</p>
            <div className="flex items-center justify-center">
                <Image className="w-12 h-12 rounded-full mr-4" 
                src="https://i.pravatar.cc/150?Image=1" alt="Avatar of Priya S."
                height={30}
                width={30}/>
                <div className="text-sm">
                    <p className="text-gray-900 font-semibold">Priya S.</p>
                    <p className="text-gray-600">Ahmedabad</p>
                </div>
            </div>
        </div>
         <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 italic mb-4">&quot;The service booking was incredibly smooth. The technician arrived on time, and I could track his location from the app. 5-star experience!&quot;</p>
            <div className="flex items-center justify-center">
                <Image className="w-12 h-12 rounded-full mr-4" src="https://i.pravatar.cc/150?Image=2" alt="Avatar of Rohan M."
                   height={30}
                  width={30}/>
                <div className="text-sm">
                    <p className="text-gray-900 font-semibold">Rohan M.</p>
                    <p className="text-gray-600">Surat</p>
                </div>
            </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 italic mb-4">&quot;Finally, no more lost receipts. I just scanned all my invoices into the app. It feels so organized and secure.&quot;</p>
            <div className="flex items-center justify-center">
                <Image className="w-12 h-12 rounded-full mr-4" src="https://i.pravatar.cc/150?Image=3" alt="Avatar of Anjali V."
                  height={30}
                  width={30}
                />
                <div className="text-sm">
                    <p className="text-gray-900 font-semibold">Anjali V.</p>
                    <p className="text-gray-600">Vadodara</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">ElectroCare</h3>
          <p className="text-gray-400">Your single point of contact for managing and servicing all your electronic appliances.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul>
            <li className="mb-2"><Link href="/" className="hover:text-blue-400">Home</Link></li>
            <li className="mb-2"><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
            <li className="mb-2"><Link href="/request-service" className="hover:text-blue-400">Book a Service</Link></li>
            <li className="mb-2"><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul>
            <li className="mb-2"><a href="/privacy" className="hover:text-blue-400">Privacy Policy</a></li>
            <li className="mb-2"><a href="/terms" className="hover:text-blue-400">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact Info</h4>
          <p className="text-gray-400">Ahmedabad, Gujarat, India</p>
          <p className="text-gray-400">Email: info@electrocare.com</p>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
        <p>© 2025 ElectroCare. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
);


// --- Main Page Component ---
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <ProductCategoriesSection />
      <CallToActionSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}