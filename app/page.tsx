"use client";

import { useState } from "react";

const priceLists = [
  {
    id: "csm",
    brand: "CSM",
    file: "/csm-pricelist.pdf",
    color: "#1a1a1a",
    stripColor: "#4b5563",
    iconBg: "#f3f4f6",
    iconStroke: "#1a1a1a",
  },
  {
    id: "hyundai",
    brand: "Hyundai",
    file: "/hyundai-pricelist.pdf",
    color: "#002C5F",
    stripColor: "#002C5F",
    iconBg: "#e8eef5",
    iconStroke: "#002C5F",
  },
  {
    id: "jetour",
    brand: "Jetour",
    file: "/jetour-pricelist.pdf",
    color: "#111111",
    stripColor: "#111111",
    iconBg: "#f9fafb",
    iconStroke: "#111111",
  },
];

function Card({ item }: { item: (typeof priceLists)[0] }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = item.file;
    link.download = `${item.brand.toLowerCase()}-pricelist.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1800);
  };

  const handleView = () => {
    window.open(item.file, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
      {/* Top colour strip */}
      <div className="h-3 w-full" style={{ background: item.stripColor }} />

      <div className="p-5 flex items-center justify-between gap-4">
        {/* Left: icon + brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: item.iconBg }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke={item.iconStroke}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Price List
            </p>
            <h2
              className="text-xl font-extrabold leading-tight"
              style={{ color: item.color }}
            >
              {item.brand}
            </h2>
          </div>
        </div>

        {/* Right: buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleView}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white font-semibold text-sm transition-all cursor-pointer disabled:opacity-70"
            style={{ background: downloading ? "#9ca3af" : item.color }}
          >
            {downloading ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                Saving…
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Ittehad Automotive
          </h1>
          <p className="text-gray-400 text-sm mt-1">Select a price list to view or download</p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {priceLists.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
