"use client";

import { useState, useEffect } from 'react';
import { 
  CheckCircleIcon, 
    MapPinIcon, UserCircleIcon, XCircleIcon, BriefcaseIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function TechnicianDashboardPage() {
    const [activeTab, setActiveTab] = useState('new');
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Real Data
    const fetchRequests = async () => {
        try {
            const res = await fetch('/api/technician/requests');
            if (res.ok) {
                setRequests(await res.json());
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // 2. Handle Actions (Accept/Complete)
    const handleAction = async (requestId, action) => {
        if (!confirm(`Are you sure you want to ${action} this request?`)) return;

        try {
            const res = await fetch('/api/technician/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ requestId, action })
            });
            if (res.ok) {
                alert(`Request ${action}ed successfully!`);
                fetchRequests(); // Refresh list
            }
        } catch (error) {
            alert("Action failed",error);
        }
    };

    // Filter Data based on status
    const newRequests = requests.filter(r => r.status === 'pending');
    const upcomingJobs = requests.filter(r => r.status === 'upcoming');
    const completedJobs = requests.filter(r => r.status === 'completed');

    // --- Sub-components inside to access handlers ---
    const NewRequestCard = ({ req }) => (
        <div className="bg-white p-5 rounded-lg shadow border border-gray-200">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-gray-800">{req.userName}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mt-1">
                        <MapPinIcon className="h-4 w-4"/>
                        <span>{req.contactAddress}</span>
                    </div>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">{req.preferredSlot}</span>
            </div>
            <div className="mt-4 border-t pt-4">
                <p className="text-sm font-semibold text-gray-600">Product: {req.productName}</p>
                <p className="text-gray-700 mt-2 text-sm">{req.issueDescription}</p>
            </div>
            <div className="flex space-x-3 mt-4">
                <button onClick={() => handleAction(req._id, 'accept')} className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2"/> Accept
                </button>
                <button onClick={() => handleAction(req._id, 'reject')} className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                     <XCircleIcon className="h-5 w-5 mr-2"/> Reject
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-gray-300 flex flex-col fixed h-full">
                 <div className="flex items-center justify-center space-x-3 p-4 border-b border-gray-700">
                    <Link href="/Dashboard"><Image src="/logo2.png" alt="Logo" width={30} height={30} className="rounded-full"/></Link>
                    <span className="font-bold text-xl text-white">Tech Panel</span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <button className="flex items-center w-full space-x-3 px-3 py-2 bg-gray-700 text-white rounded-lg"><BriefcaseIcon className="h-6 w-6" /><span>Jobs</span></button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <div className="flex items-center space-x-2">
                        <UserCircleIcon className="h-9 w-9 text-gray-700"/>
                        <div><p className="font-semibold text-sm text-black">Technician</p></div>
                    </div>
                </header>

                <div>
                    <div className="flex border-b border-gray-300 mb-6">
                        <button onClick={() => setActiveTab('new')} className={`px-4 py-2 font-semibold ${activeTab === 'new' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>New Requests ({newRequests.length})</button>
                        <button onClick={() => setActiveTab('schedule')} className={`px-4 py-2 font-semibold ${activeTab === 'schedule' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Upcoming ({upcomingJobs.length})</button>
                        <button onClick={() => setActiveTab('completed')} className={`px-4 py-2 font-semibold ${activeTab === 'completed' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>Completed</button>
                    </div>
                    
                    {loading ? <div className="text-center py-10">Loading...</div> : (
                        <>
                            {activeTab === 'new' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {newRequests.length === 0 ? <p className="text-gray-500">No new requests.</p> : newRequests.map(req => <NewRequestCard key={req._id} req={req}/>)}
                                </div>
                            )}

                            {activeTab === 'schedule' && (
                                <div className="space-y-4">
                                    {upcomingJobs.length === 0 ? <p className="text-gray-500">No upcoming jobs.</p> : upcomingJobs.map(job => (
                                        <div key={job._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                            <div>
                                                <p className="font-bold text-gray-800">{job.productName} Issue</p>
                                                <p className="text-sm text-gray-600">{job.userName} • {job.contactAddress}</p>
                                            </div>
                                            <button 
                                                onClick={() => handleAction(job._id, 'complete')}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-700"
                                            >
                                                Mark Complete (+Points)
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'completed' && (
                                <div className="bg-white rounded-lg shadow overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead className="bg-gray-50 text-gray-500 text-sm">
                                            <tr><th className="p-4">Customer</th><th className="p-4">Product</th><th className="p-4">Status</th></tr>
                                        </thead>
                                        <tbody>
                                            {completedJobs.map(job => (
                                                <tr key={job._id} className="border-b">
                                                    <td className="p-4 font-semibold">{job.userName}</td>
                                                    <td className="p-4">{job.productName}</td>
                                                    <td className="p-4 text-green-600 font-bold">Completed</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}