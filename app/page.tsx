"use client";

import { useState } from "react";
import Image from "next/image";

interface Doc {
  label: string;
  file: string;
  /** Optional second line — e.g. tenure and down-payment for an EMI plan. */
  sub?: string;
}


interface Brand {
  id: string;
  brand: string;
  note?: string;
  priceFile?: string;
  color: string;
  stripColor: string;
  iconBg: string;
  brochures: Doc[];
  emiPlans: Doc[];
  brandPriceLists?: Doc[];
}

const brands: Brand[] = [
  {
    id: "jetour",
    brand: "Jetour Ittehad",
    priceFile: "/jetour/pricelist.pdf",
    color: "#111111",
    stripColor: "#111111",
    iconBg: "#f4f4f4",
    brochures: [
      { label: "Dashing", file: "/jetour/dashing.pdf" },
      { label: "X70 Plus", file: "/jetour/x70-plus.pdf" },
      { label: "T1 Brochure", file: "/jetour/t1-brochure.pdf" },
      { label: "T2 Brochure", file: "/jetour/t2-brochure.pdf" },
    ],
    emiPlans: [],
  },
  {
    id: "hyundai",
    brand: "Hyundai Islamabad",
    priceFile: "/hyundai/pricelist.pdf",
    color: "#002C5F",
    stripColor: "#002C5F",
    iconBg: "#e8f0f8",
    brochures: [
      { label: "Elantra Hybrid", file: "/hyundai/brochures/elantra-hybrid.pdf" },
      { label: "Sonata N-Line", file: "/hyundai/brochures/sonata-n-line.pdf" },
      { label: "Elantra 1.6", file: "/hyundai/brochures/elantra-1.6.pdf" },
      { label: "PALISADE 2026", file: "/hyundai/brochures/palisade-2026.pdf" },
      { label: "Tucson", file: "/hyundai/brochures/tucson.pdf" },
      { label: "Porter", file: "/hyundai/brochures/porter.pdf" },
      { label: "Santa Fe Hybrid", file: "/hyundai/brochures/santa-fe-hybrid.pdf" },
      { label: "Sonata 2.0", file: "/hyundai/brochures/sonata-2.0.pdf" },
    ],
    emiPlans: [
      { label: "Elantra Hybrid", sub: "18 months · 40% down", file: "/hyundai/emi-plans/elantra-hybrid-18m.pdf" },
      { label: "Elantra Hybrid", sub: "24 months · 60% down", file: "/hyundai/emi-plans/elantra-hybrid-24m.pdf" },
      { label: "Tucson FWD", sub: "18 & 24 months · 50% down", file: "/hyundai/emi-plans/tucson-fwd.pdf" },
      { label: "Tucson AWD", sub: "18 months · 50% down", file: "/hyundai/emi-plans/tucson-awd.pdf" },
      { label: "Santa Fe FWD", sub: "18 months · 45% down", file: "/hyundai/emi-plans/santa-fe-fwd.pdf" },
      { label: "Santa Fe AWD", sub: "18 & 24 months · 45% down", file: "/hyundai/emi-plans/santa-fe-awd.pdf" },
    ],
  },
  {
    id: "csm",
    brand: "CSM Ittehad",
    priceFile: "/csm/pricelist.pdf",
    color: "#1a1a1a",
    stripColor: "#4b5563",
    iconBg: "#f3f4f6",
    brochures: [
      { label: "EV3 Brochure", file: "/csm/ev3-brochure.pdf" },
    ],
    emiPlans: [],
    brandPriceLists: [
      { label: "EV3 Price List", file: "/csm/ev3-pricelist.pdf" },
    ],
  },
  {
    id: "ppf",
    brand: "PPF",
    note: "Valid across CSM, Hyundai & Jetour",
    priceFile: "/ppf/pricelist.pdf",
    color: "#0f766e",
    stripColor: "#0f766e",
    iconBg: "#f0fdfa",
    brochures: [],
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
  file, filename, label, color, loading, onDownload, size = "md",
}: {
  file: string; filename: string; label: string; color: string;
  loading: string | null; onDownload: (f: string, n: string) => void;
  size?: "sm" | "md";
}) {
  // The "md" size stays compact on phones and only grows once there is room.
  const px = size === "sm" ? "px-2.5 py-1.5" : "px-2.5 py-1.5 sm:px-3 sm:py-2";
  const text = size === "sm" ? "text-xs" : "text-xs sm:text-sm";
  return (
    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={() => window.open(file, "_blank", "noopener,noreferrer")}
        aria-label={`View ${label}`}
        className={`flex items-center gap-1 ${px} ${text} rounded-lg border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer`}
      >
        <IconEye />View
      </button>
      <button
        onClick={() => onDownload(file, filename)}
        disabled={loading === file}
        aria-label={`Download ${label}`}
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
        aria-expanded={open}
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
              className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-4 py-3"
              style={{ background: iconBg + "60" }}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-[8.5rem]">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "15" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-700 leading-tight break-words">{d.label}</p>
                  {d.sub && (
                    <p className="text-[11px] text-gray-500 leading-snug mt-0.5 break-words">{d.sub}</p>
                  )}
                </div>
              </div>
              <div className="ml-auto flex-shrink-0">
                <ActionButtons
                  file={d.file} filename={d.file.split("/").pop() ?? d.label}
                  label={d.sub ? `${d.label}, ${d.sub}` : d.label}
                  color={color} loading={loading} onDownload={onDownload} size="sm"
                />
              </div>
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
      <div className="px-4 pt-4 pb-3 flex flex-wrap items-center gap-x-3 gap-y-3">
        <div className="flex items-center gap-3 flex-1 min-w-[8.5rem]">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: brand.iconBg }}>
            <IconPDF stroke={brand.color} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-0.5 whitespace-nowrap">
              {brand.priceFile ? "Price List" : "Brochure"}
            </p>
            <h2 className="text-lg font-extrabold leading-tight break-words" style={{ color: brand.color }}>
              {brand.brand}
            </h2>
            {brand.note && (
              <p className="text-[11px] text-gray-400 leading-tight mt-0.5">{brand.note}</p>
            )}
          </div>
        </div>
        {brand.priceFile && (
          <div className="ml-auto flex-shrink-0">
            <ActionButtons
              file={brand.priceFile} filename={`${brand.id}-pricelist.pdf`}
              label={`${brand.brand} price list`}
              color={brand.color} loading={loading} onDownload={download}
            />
          </div>
        )}
      </div>

      {/* Brand-specific price lists */}
      <DocSection
        title="Brand Price Lists"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        }
        docs={brand.brandPriceLists ?? []}
        color={brand.color}
        iconBg={brand.iconBg}
        loading={loading}
        onDownload={download}
      />

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
          <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "'Times New Roman', Times, serif", fontStyle: "italic" }}>
            An Ittehad Steel Company
          </p>
          <div className="w-10 h-0.5 bg-gray-300 mx-auto mt-2 rounded-full" />
          <p className="text-gray-400 text-sm mt-2">
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
