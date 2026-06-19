"use client";

import { useState } from "react";

interface Brochure {
  label: string;
  file: string;
}

interface Brand {
  id: string;
  brand: string;
  priceFile: string;
  color: string;
  stripColor: string;
  iconBg: string;
  brochures: Brochure[];
}

const brands: Brand[] = [
  {
    id: "csm",
    brand: "CSM",
    priceFile: "/csm-pricelist.pdf",
    color: "#1a1a1a",
    stripColor: "#4b5563",
    iconBg: "#f3f4f6",
    brochures: [],
  },
  {
    id: "hyundai",
    brand: "Hyundai",
    priceFile: "/hyundai-pricelist.pdf",
    color: "#002C5F",
    stripColor: "#002C5F",
    iconBg: "#e8f0f8",
    brochures: [
      { label: "CN7", file: "/CN7-Brochure.pdf" },
      { label: "DN8 N-Line", file: "/DN8-N-Line-Brochure.pdf" },
      { label: "Elantra 1.6 SP", file: "/Hyundai-Elantra-1.6-SP-Leaflet.pdf" },
      { label: "PALISADE 2026", file: "/Hyundai-PALISADE-2026.pdf" },
      { label: "Porter", file: "/Porter-Leaflet-Mar-23.pdf" },
      { label: "Santa Fe TM", file: "/Santa-Fe-TM-Brochure.pdf" },
      { label: "Sonata 2.0", file: "/Sonata-2.0.pdf" },
    ],
  },
  {
    id: "jetour",
    brand: "Jetour",
    priceFile: "/jetour-pricelist.pdf",
    color: "#111111",
    stripColor: "#111111",
    iconBg: "#f4f4f4",
    brochures: [
      { label: "Karachi Dashing", file: "/Jetour-Karachi-Dashing-Brochure.pdf" },
      { label: "X70 Plus 2025", file: "/Jetour-X70-Plus-2025-PK.pdf" },
    ],
  },
];

/* ── Reusable icons ─────────────────────────────────────── */

function IconPDF({ stroke }: { stroke: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconDownload() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconSpin() {
  return (
    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="15" height="15"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Download helper ────────────────────────────────────── */

function useDownload() {
  const [loading, setLoading] = useState<string | null>(null);

  const download = (file: string, filename: string) => {
    setLoading(file);
    const a = document.createElement("a");
    a.href = file;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setLoading(null), 1800);
  };

  return { loading, download };
}

/* ── Action buttons pair ────────────────────────────────── */

function ActionButtons({
  file,
  filename,
  color,
  loading,
  onDownload,
  size = "md",
}: {
  file: string;
  filename: string;
  color: string;
  loading: string | null;
  onDownload: (file: string, filename: string) => void;
  size?: "sm" | "md";
}) {
  const isSm = size === "sm";
  const px = isSm ? "px-2.5 py-1.5" : "px-3 py-2";
  const text = isSm ? "text-xs" : "text-sm";

  return (
    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={() => window.open(file, "_blank", "noopener,noreferrer")}
        className={`flex items-center gap-1 ${px} ${text} rounded-lg border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer`}
      >
        <IconEye />
        View
      </button>
      <button
        onClick={() => onDownload(file, filename)}
        disabled={loading === file}
        className={`flex items-center gap-1 ${px} ${text} rounded-lg text-white font-semibold transition-all cursor-pointer disabled:opacity-60`}
        style={{ background: loading === file ? "#9ca3af" : color }}
      >
        {loading === file ? <><IconSpin />Saving…</> : <><IconDownload />Download</>}
      </button>
    </div>
  );
}

/* ── Brand card ─────────────────────────────────────────── */

function BrandCard({ brand }: { brand: Brand }) {
  const [open, setOpen] = useState(false);
  const { loading, download } = useDownload();

  const hasBrochures = brand.brochures.length > 0;

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
      {/* Colour strip */}
      <div className="h-3 w-full" style={{ background: brand.stripColor }} />

      {/* Price list row */}
      <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: brand.iconBg }}>
            <IconPDF stroke={brand.color} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-0.5">
              Price List
            </p>
            <h2 className="text-lg font-extrabold leading-tight truncate" style={{ color: brand.color }}>
              {brand.brand}
            </h2>
          </div>
        </div>

        <ActionButtons
          file={brand.priceFile}
          filename={`${brand.id}-pricelist.pdf`}
          color={brand.color}
          loading={loading}
          onDownload={download}
        />
      </div>

      {/* Brochures section */}
      {hasBrochures && (
        <>
          {/* Toggle row */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
            style={{ color: brand.color }}
          >
            <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Brochures
              <span className="bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 text-[10px] font-bold">
                {brand.brochures.length}
              </span>
            </span>
            <IconChevron open={open} />
          </button>

          {/* Brochure list */}
          {open && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {brand.brochures.map((b) => (
                <div
                  key={b.file}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                  style={{ background: brand.iconBg + "60" }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: brand.color + "15" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                        fill="none" stroke={brand.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 truncate">{b.label}</span>
                  </div>

                  <ActionButtons
                    file={b.file}
                    filename={b.file.replace("/", "")}
                    color={brand.color}
                    loading={loading}
                    onDownload={download}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* Title */}
        <div className="text-center mb-7">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Ittehad Automotive
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View or download price lists &amp; brochures
          </p>
        </div>

        {/* Brand cards */}
        <div className="flex flex-col gap-4">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
