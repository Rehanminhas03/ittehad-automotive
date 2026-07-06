"use client";

import { useState } from "react";

interface Doc {
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
  brochures: Doc[];
  emiPlans: Doc[];
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
    emiPlans: [],
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
    emiPlans: [
      { label: "EMI Plan 1", file: "/hyundai-emi-plan-1.pdf" },
      { label: "EMI Plan 2", file: "/hyundai-emi-plan-2.pdf" },
      { label: "EMI Plan 3", file: "/hyundai-emi-plan-3.pdf" },
      { label: "EMI Plan 4", file: "/hyundai-emi-plan-4.pdf" },
      { label: "EMI Plan 5", file: "/hyundai-emi-plan-5.pdf" },
      { label: "EMI Plan 6", file: "/hyundai-emi-plan-6.pdf" },
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
      { label: "Dashing", file: "/Jetour-Karachi-Dashing-Brochure.pdf" },
      { label: "X70 Plus", file: "/Jetour-X70-Plus-2025-PK.pdf" },
    ],
    emiPlans: [],
  },
  {
    id: "t2-idm",
    brand: "T2 i-DM PHEV",
    priceFile: "/t2-idm.pdf",
    color: "#7c3aed",
    stripColor: "#7c3aed",
    iconBg: "#f3f0ff",
    brochures: [
      { label: "T2 i-DM Brochure", file: "/Jetour_T2_Brochure_Enhanced.pdf" },
    ],
    emiPlans: [],
  },
];

/* ── Icons ──────────────────────────────────────────────── */

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

/* ── Download hook ──────────────────────────────────────── */

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

/* ── Action buttons ─────────────────────────────────────── */

function ActionButtons({
  file, filename, color, loading, onDownload, size = "md",
}: {
  file: string; filename: string; color: string;
  loading: string | null; onDownload: (f: string, n: string) => void;
  size?: "sm" | "md";
}) {
  const px = size === "sm" ? "px-2.5 py-1.5" : "px-3 py-2";
  const text = size === "sm" ? "text-xs" : "text-sm";
  return (
    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={() => window.open(file, "_blank", "noopener,noreferrer")}
        className={`flex items-center gap-1 ${px} ${text} rounded-lg border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer`}
      >
        <IconEye />View
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

/* ── Expandable doc list ─────────────────────────────────── */

function DocSection({
  title, icon, docs, color, iconBg, loading, onDownload,
}: {
  title: string; icon: React.ReactNode; docs: Doc[];
  color: string; iconBg: string;
  loading: string | null; onDownload: (f: string, n: string) => void;
}) {
  const [open, setOpen] = useState(false);
  if (docs.length === 0) return null;
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-2.5 border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
        style={{ color }}
      >
        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          {icon}
          {title}
          <span className="bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 text-[10px] font-bold">
            {docs.length}
          </span>
        </span>
        <IconChevron open={open} />
      </button>

      {open && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {docs.map((d) => (
            <div
              key={d.file}
              className="flex items-center justify-between gap-3 px-4 py-3"
              style={{ background: iconBg + "60" }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "15" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-700 truncate">{d.label}</span>
              </div>
              <ActionButtons
                file={d.file} filename={d.file.replace("/", "")}
                color={color} loading={loading} onDownload={onDownload} size="sm"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ── Brand card ─────────────────────────────────────────── */

function BrandCard({ brand }: { brand: Brand }) {
  const { loading, download } = useDownload();

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
          file={brand.priceFile} filename={`${brand.id}-pricelist.pdf`}
          color={brand.color} loading={loading} onDownload={download}
        />
      </div>

      {/* Brochures */}
      <DocSection
        title="Brochures"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        }
        docs={brand.brochures}
        color={brand.color}
        iconBg={brand.iconBg}
        loading={loading}
        onDownload={download}
      />

      {/* EMI Plans */}
      <DocSection
        title="EMI Plans"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        }
        docs={brand.emiPlans}
        color={brand.color}
        iconBg={brand.iconBg}
        loading={loading}
        onDownload={download}
      />
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Ittehad Automotive
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            View or download price lists, brochures &amp; EMI plans
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
