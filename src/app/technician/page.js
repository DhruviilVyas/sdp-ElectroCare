// src/app/technician-dashboard/page.js
"use client";

import  { useState } from 'react';
import { 
    BellIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    CheckCircleIcon,
    
    Cog6ToothIcon,
    CurrencyRupeeIcon,
    HomeIcon,
    MapPinIcon,
    UserCircleIcon,
    XCircleIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

// --- DUMMY DATA ---
const newRequests = [
    { id: 'req_01', userName: 'Priya Sharma', distance: '2.5km away', address: 'Satellite, Ahmedabad', product: 'LG Washing Machine', issue: 'Loud noise during spin cycle. It happens every time on the high-speed setting.', photos: true, slot: 'Afternoon (1pm-4pm)' },
    { id: 'req_02', userName: 'Amit Patel', distance: '8km away', address: 'Bopal, Ahmedabad', product: 'Sony Bravia TV', issue: 'Screen has a thin vertical green line on the right side.', photos: false, slot: 'Morning (9am-12pm)' },
];

const scheduledJobs = [
    { id: 'job_01', time: '10:00 AM', userName: 'Rohan Mehta', address: 'Navrangpura', product: 'Daikin AC', status: 'Upcoming' },
    { id: 'job_02', time: '02:30 PM', userName: 'Sneha Dave', address: 'Maninagar', product: 'Bosch Dishwasher', status: 'Upcoming' },
];

const completedJobs = [
     { id: 'comp_01', date: '2025-09-22', userName: 'Anjali Desai', product: 'Macbook Air', earnings: 1200 },
     { id: 'comp_02', date: '2025-09-21', userName: 'Vikram Singh', product: 'Samsung Refrigerator', earnings: 850 },
];

// --- SUB-COMPONENTS ---
const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
        <div className={`rounded-full p-3 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const NewRequestCard = ({ request }) => (
    <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
        <div className="flex justify-between items-start">
            <div>
                <p className="font-bold text-lg text-gray-800">{request.userName}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-2 mt-1">
                    <MapPinIcon className="h-4 w-4"/>
                    <span>{request.address} ({request.distance})</span>
                </div>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">{request.slot}</span>
        </div>
        <div className="mt-4 border-t pt-4">
            <p className="text-sm font-semibold text-gray-600">Product: {request.product}</p>
            <p className="text-gray-700 mt-2 text-sm">{request.issue}</p>
            {request.photos && (
                 <div className="flex items-center text-xs text-blue-600 mt-2">
                    <PhotoIcon className="h-4 w-4 mr-1"/>
                    <span>Photos attached by user</span>
                </div>
            )}
        </div>
        <div className="flex space-x-3 mt-4">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                <CheckCircleIcon className="h-5 w-5 mr-2"/> Accept
            </button>
            <button className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                 <XCircleIcon className="h-5 w-5 mr-2"/> Reject
            </button>
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---
export default function TechnicianDashboardPage() {
    const [activeTab, setActiveTab] = useState('new');

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-gray-300 flex flex-col fixed h-full">
                 <div className="flex items-center justify-center space-x-3 p-4 border-b border-gray-700">
       <Link href={"/Dashboard"}> <Image src="/logo.jpg" alt="ElectroCare Logo" className="h-12 w-12 rounded-full"     height={30}
                  width={30}/></Link>
                    <span className="font-bold text-xl text-white">Technician Panel</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="#" className="flex items-center space-x-3 px-3 py-2 bg-gray-700 text-white rounded-lg"><HomeIcon className="h-6 w-6" /><span>Dashboard</span></Link>
                    <Link href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-lg"><CalendarDaysIcon className="h-6 w-6" /><span>My Schedule</span></Link>
                    <Link href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-lg"><CurrencyRupeeIcon className="h-6 w-6" /><span>Earnings</span></Link>
                    <Link href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-lg"><ChartBarIcon className="h-6 w-6" /><span>Performance</span></Link>
                </nav>
                 <div className="p-4 border-t border-gray-700">
                    <Link href="#" className="flex items-center space-x-3 px-3 py-2 hover:bg-gray-700 rounded-lg"><Cog6ToothIcon className="h-6 w-6" /><span>Settings</span></Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Rohan!</h1>
                        <p className="text-gray-500 mt-1">Here&apos;s your summary for today, 23rd September 2025.</p>
                    </div>
                    <div className="flex items-center space-x-5">
                        <BellIcon className="h-6 w-6 text-gray-500" />
                        <div className="flex items-center space-x-2">
                            <UserCircleIcon className="h-9 w-9 text-gray-700"/>
                            <div>
                                <p className="font-semibold text-sm text-black">Rohan Sharma</p>
                                <p className="text-xs text-gray-500">Technician ID: T-1024</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="New Job Requests" value="2" icon={<BellIcon className="h-6 w-6 text-blue-600"/>} color="bg-blue-100"/>
                    <StatCard title="Today's Schedule" value="2 Jobs" icon={<CalendarDaysIcon className="h-6 w-6 text-green-600"/>} color="bg-green-100"/>
                    <StatCard title="This Week's Earnings" value="₹8,450" icon={<CurrencyRupeeIcon className="h-6 w-6 text-yellow-600"/>} color="bg-yellow-100"/>
                    <StatCard title="Performance Rating" value="4.8/5.0" icon={<ChartBarIcon className="h-6 w-6 text-purple-600"/>} color="bg-purple-100"/>
                </div>

                {/* Job Queue Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Action Center</h2>
                    <div className="flex border-b border-gray-300">
                        <button onClick={() => setActiveTab('new')} className={`px-4 py-2 font-semibold ${activeTab === 'new' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>New Requests ({newRequests.length})</button>
                        <button onClick={() => setActiveTab('schedule')} className={`px-4 py-2 font-semibold ${activeTab === 'schedule' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>My Schedule ({scheduledJobs.length})</button>
                        <button onClick={() => setActiveTab('completed')} className={`px-4 py-2 font-semibold ${activeTab === 'completed' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Completed Jobs</button>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="mt-6">
                        {activeTab === 'new' && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {newRequests.map(req => <NewRequestCard key={req.id} request={req}/>)}
                            </div>
                        )}
                         {activeTab === 'schedule' && (
                            <div className="bg-white p-5 rounded-lg shadow">
                                <ul className="space-y-4">
                                    {scheduledJobs.map(job => (
                                        <li key={job.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                                            <div className="bg-blue-100 text-blue-700 font-bold p-3 rounded-lg">{job.time}</div>
                                            <div>
                                                <p className="font-bold">{job.userName}</p>
                                                <p className="text-sm text-gray-600">{job.address} - {job.product}</p>
                                            </div>
                                            <button className="ml-auto bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">View Details</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                         {activeTab === 'completed' && (
                            <div className="bg-white p-5 rounded-lg shadow">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b text-sm text-gray-500">
                                            <th className="py-2">Date</th>
                                            <th className="py-2">Customer</th>
                                            <th className="py-2">Product</th>
                                            <th className="py-2 text-right">Earnings</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {completedJobs.map(job => (
                                            <tr key={job.id} className="border-b">
                                                <td className="py-3">{job.date}</td>
                                                <td className="py-3 font-semibold">{job.userName}</td>
                                                <td className="py-3 text-gray-600">{job.product}</td>
                                                <td className="py-3 font-bold text-green-600 text-right">₹{job.earnings.toLocaleString('en-IN')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}