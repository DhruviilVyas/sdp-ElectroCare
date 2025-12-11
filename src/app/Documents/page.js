// src/app/my-account/page.js
"use client";

import  { useState } from "react";
import {
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  QrCodeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

// --- SAMPLE DATA (replace with API later) ---
const purchasedWarranties = [
  {
    id: "warr_01",
    productName: "Sony Bravia TV",
    model: 'X90J 65"',
    planName: "2-Year Total Care",
    startDate: "2025-10-25",
    endDate: "2027-10-25",
    status: "Active",
  },
  {
    id: "warr_02",
    productName: 'MacBook Pro 14"',
    model: "M2 Pro",
    planName: "1-Year Protection Plan",
    startDate: "2026-08-15",
    endDate: "2027-08-15",
    status: "Active",
  },
  {
    id: "warr_03",
    productName: "LG Washing Machine",
    model: "WM3900HWA",
    planName: "1-Year Protection Plan",
    startDate: "2024-09-22",
    endDate: "2025-09-22",
    status: "Expired",
  },
];

const serviceHistory = [
  {
    id: "serv_01",
    productName: "Sony Bravia TV",
    issue: "Screen Flickering",
    date: "2025-09-20",
    status: "Completed",
  },
  {
    id: "serv_02",
    productName: "LG Washing Machine",
    issue: "Loud Noise During Spin",
    date: "2025-08-12",
    status: "Completed",
  },
  {
    id: "serv_03",
    productName: "Daikin AC",
    issue: "Not Cooling",
    date: "2025-05-02",
    status: "Cancelled",
  },
];

// --- WARRANTY CARD ---
const WarrantyCard = ({ warranty }) => {
  const isActive = warranty.status === "Active";
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 uppercase">ElectroCare Plan</p>
          <h3 className="text-lg font-semibold text-gray-800">
            {warranty.productName}
          </h3>
          <p className="text-sm text-gray-600">{warranty.model}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${
            isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {warranty.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500">Valid From</p>
          <p className="text-sm font-medium text-gray-700">
            {new Date(warranty.startDate).toLocaleDateString("en-GB")}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Valid Until</p>
          <p className="text-sm font-medium text-gray-700">
            {new Date(warranty.endDate).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <QrCodeIcon className="h-14 w-14 text-gray-500" />
        <div className="space-x-4">
          <button className="text-sm text-blue-600 hover:underline">
            Terms
          </button>
          <Link
            href="/request-service"
            className="text-sm text-blue-600 hover:underline"
          >
           Extend
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- SERVICE HISTORY ITEM ---
const ServiceItem = ({ item }) => {
  const statusIcons = {
    Completed: (
      <CheckCircleIcon className="h-5 w-5 text-green-600" />
    ),
    "In Progress": (
      <ClockIcon className="h-5 w-5 text-yellow-600" />
    ),
    Cancelled: <XCircleIcon className="h-5 w-5 text-red-600" />,
  };

  return (
    <div className="border-l-2 border-gray-200 pl-4 mb-6">
      <div className="flex items-center space-x-2">
        {statusIcons[item.status]}
        <p className="text-xs text-gray-500">
          {new Date(item.date).toLocaleDateString("en-GB")}
        </p>
      </div>
      <p className="font-medium text-gray-800">{item.productName}</p>
      <p className="text-sm text-gray-600 italic">{item.issue}</p>
      <p className="text-xs font-semibold text-gray-700 mt-1">
        {item.status}
      </p>
    </div>
  );
};

// --- MAIN PAGE ---
export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("warranties");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="ElectroCare Logo"
            className="h-10 w-10 rounded-full"
               height={30}
                  width={30}
          />
        </Link>
        <span className="text-lg font-bold text-blue-900">
          ElectroCare
        </span>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            My Documents
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track your warranties and service history.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("warranties")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "warranties"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            <ShieldCheckIcon className="h-5 w-5 inline mr-1" />
            Warranties
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`ml-6 px-4 py-2 text-sm font-medium ${
              activeTab === "services"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            <WrenchScrewdriverIcon className="h-5 w-5 inline mr-1" />
            Service History
          </button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "warranties" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {purchasedWarranties.map((w) => (
              <WarrantyCard key={w.id} warranty={w} />
            ))}
          </div>
        )}

        {activeTab === "services" && (
          <div className="max-w-2xl mx-auto">
            {serviceHistory.map((item) => (
              <ServiceItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
