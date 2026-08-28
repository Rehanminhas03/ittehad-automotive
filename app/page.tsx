"use client";

import { useState } from "react";
import Image from "next/image";

interface Doc {
  label: string;
  file: string;
}

const promotions: Doc[] = [
  { label: "Promotion 1", file: "/promotion/promo-1.jpeg" },
  { label: "Promotion 2", file: "/promotion/promo-2.jpeg" },
  { label: "Promotion 3", file: "/promotion/promo-3.jpeg" },
  { label: "Promotion 4", file: "/promotion/promo-4.jpeg" },
];

const PROMO_COLOR = "#dc2626";

interface Brand {
  id: string;
  brand: string;
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
    id: "ev3",
    brand: "CSM EV3",
    priceFile: "/ev3-pricelist.pdf",
    color: "#16a34a",
    stripColor: "#16a34a",
    iconBg: "#f0fdf4",
    brochures: [
      { label: "EV3 Brochure", file: "/CSM-EV3-Brochure.pdf" },
    ],
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
    id: "t1",
    brand: "Jetour T1",
    color: "#ea580c",
    stripColor: "#ea580c",
    iconBg: "#fff7ed",
    brochures: [
      { label: "T1 Folded Flyer", file: "/t1-folded-flyer.pdf" },
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
  {
    id: "ppf",
    brand: "PPF",
    priceFile: "/ppf.pdf",
    color: "#0f766e",
    stripColor: "#0f766e",
    iconBg: "#f0fdfa",
    brochures: [],
    emiPlans: [],
    brandPriceLists: [
      { label: "CSM", file: "/csm-ppf.pdf" },
      { label: "Hyundai", file: "/hyundai-ppf.pdf" },
      { label: "Jetour", file: "/jetour-ppf.pdf" },
    ],
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

/* ── Promotion card ─────────────────────────────────────── */

function IconTag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
      fill="none" stroke={PROMO_COLOR} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function PromotionCard() {
  const { loading, download } = useDownload();

  return (
    <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white">
      {/* Colour strip */}
      <div className="h-3 w-full" style={{ background: PROMO_COLOR }} />

      {/* Header */}
      <div className="px-4 pt-4 pb-3 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "#fef2f2" }}>
          <IconTag />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 leading-none mb-0.5">
            Latest Offers
          </p>
          <h2 className="text-lg font-extrabold leading-tight truncate" style={{ color: PROMO_COLOR }}>
            Promotion
          </h2>
        </div>
        <span className="ml-auto flex-shrink-0 bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 text-[10px] font-bold">
          {promotions.length}
        </span>
      </div>

      {/* Image grid — all promos share a 4:5 ratio, so nothing gets cropped */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {promotions.map((p, i) => (
          <div key={p.file} className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
            <a
              href={p.file}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${p.label} full size`}
              className="block relative aspect-[4/5]"
            >
              <Image
                src={p.file}
                alt={p.label}
                fill
                sizes="(max-width: 640px) 45vw, 240px"
                priority={i === 0}
                className="object-cover"
              />
            </a>
            <button
              onClick={() => download(p.file, p.file.split("/").pop() ?? p.label)}
              disabled={loading === p.file}
              aria-label={`Download ${p.label}`}
              className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md transition-all cursor-pointer disabled:opacity-60"
              style={{ background: loading === p.file ? "#9ca3af" : PROMO_COLOR }}
            >
              {loading === p.file ? <IconSpin /> : <IconDownload />}
            </button>
          </div>
        ))}
      </div>
    </div>
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
              {brand.priceFile ? "Price List" : "Brochure"}
            </p>
            <h2 className="text-lg font-extrabold leading-tight truncate" style={{ color: brand.color }}>
              {brand.brand}
            </h2>
          </div>
        </div>
        {brand.priceFile && (
          <ActionButtons
            file={brand.priceFile} filename={`${brand.id}-pricelist.pdf`}
            color={brand.color} loading={loading} onDownload={download}
          />
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
            View or download promotions, price lists, brochures &amp; EMI plans
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <PromotionCard />
          {brands.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
