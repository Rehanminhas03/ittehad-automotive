"use client";

import { useState, useEffect, useMemo } from "react";

interface Doc {
  label: string;
  file: string;
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

function IconSun() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconX() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
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
  file, filename, label, color, loading, onDownload, size = "md", dark,
}: {
  file: string; filename: string; label: string; color: string;
  loading: string | null; onDownload: (f: string, n: string) => void;
  size?: "sm" | "md"; dark: boolean;
}) {
  const px = size === "sm" ? "px-2.5 py-1.5" : "px-2.5 py-1.5 sm:px-3 sm:py-2";
  const text = size === "sm" ? "text-xs" : "text-xs sm:text-sm";
  const viewCls = dark
    ? `flex items-center gap-1 ${px} ${text} rounded-lg border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-400 hover:bg-gray-700 transition-all cursor-pointer`
    : `flex items-center gap-1 ${px} ${text} rounded-lg border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer`;
  return (
    <div className="flex gap-2 flex-shrink-0">
      <button onClick={() => window.open(file, "_blank", "noopener,noreferrer")} aria-label={`View ${label}`} className={viewCls}>
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
  title, icon, docs, color, iconBg, loading, onDownload, forceOpen = false, dark,
}: {
  title: string; icon: React.ReactNode; docs: Doc[];
  color: string; iconBg: string;
  loading: string | null; onDownload: (f: string, n: string) => void;
  forceOpen?: boolean; dark: boolean;
}) {
  const [open, setOpen] = useState(forceOpen);
  useEffect(() => { setOpen(forceOpen); }, [forceOpen]);

  if (docs.length === 0) return null;

  const border = dark ? "border-gray-700" : "border-gray-100";
  const hover = dark ? "hover:bg-gray-700/50" : "hover:bg-gray-50";
  const badge = dark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500";
  const divide = dark ? "divide-gray-700" : "divide-gray-50";
  const labelCls = dark ? "text-gray-200" : "text-gray-700";
  const subCls = dark ? "text-gray-400" : "text-gray-500";

  return (
    <>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        className={`w-full flex items-center justify-between px-4 py-2.5 border-t ${border} ${hover} transition-colors cursor-pointer`}
        style={{ color }}
      >
        <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          {icon}
          {title}
          <span className={`${badge} rounded-full px-2 py-0.5 text-[10px] font-bold`}>{docs.length}</span>
        </span>
        <IconChevron open={open} />
      </button>

      {open && (
        <div className={`border-t ${border} divide-y ${divide}`}>
          {docs.map((d) => (
            <div
              key={d.file}
              className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-4 py-3"
              style={{ background: dark ? "rgba(255,255,255,0.03)" : `${iconBg}60` }}
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-[8.5rem]">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: color + "20" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                    fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${labelCls} leading-tight break-words`}>{d.label}</p>
                  {d.sub && <p className={`text-[11px] ${subCls} leading-snug mt-0.5 break-words`}>{d.sub}</p>}
                </div>
              </div>
              <div className="ml-auto flex-shrink-0">
                <ActionButtons
                  file={d.file} filename={d.file.split("/").pop() ?? d.label}
                  label={d.sub ? `${d.label}, ${d.sub}` : d.label}
                  color={color} loading={loading} onDownload={onDownload} size="sm" dark={dark}
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

function BrandCard({ brand, dark, openSections }: { brand: Brand; dark: boolean; openSections: string[] }) {
  const { loading, download } = useDownload();

  const cardCls = dark
    ? "rounded-2xl overflow-hidden shadow-md border border-gray-700 bg-gray-800"
    : "rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-white";
  const metaLabelCls = dark ? "text-gray-500" : "text-gray-400";
  const noteCls = dark ? "text-gray-500" : "text-gray-400";

  const priceListIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
  const brochureIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
  const emiIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );

  return (
    <div className={cardCls}>
      <div className="h-3 w-full" style={{ background: brand.stripColor }} />

      <div className="px-4 pt-4 pb-3 flex flex-wrap items-center gap-x-3 gap-y-3">
        <div className="flex items-center gap-3 flex-1 min-w-[8.5rem]">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: brand.iconBg }}>
            <IconPDF stroke={brand.color} />
          </div>
          <div className="min-w-0">
            <p className={`text-[10px] font-bold uppercase tracking-widest ${metaLabelCls} leading-none mb-0.5 whitespace-nowrap`}>
              {brand.priceFile ? "Price List" : "Brochure"}
            </p>
            <h2 className="text-lg font-extrabold leading-tight break-words" style={{ color: brand.color }}>
              {brand.brand}
            </h2>
            {brand.note && <p className={`text-[11px] ${noteCls} leading-tight mt-0.5`}>{brand.note}</p>}
          </div>
        </div>
        {brand.priceFile && (
          <div className="ml-auto flex-shrink-0">
            <ActionButtons
              file={brand.priceFile} filename={`${brand.id}-pricelist.pdf`}
              label={`${brand.brand} price list`}
              color={brand.color} loading={loading} onDownload={download} dark={dark}
            />
          </div>
        )}
      </div>

      <DocSection title="Brand Price Lists" icon={priceListIcon}
        docs={brand.brandPriceLists ?? []} color={brand.color} iconBg={brand.iconBg}
        loading={loading} onDownload={download}
        forceOpen={openSections.includes("pricelists")} dark={dark} />

      <DocSection title="Brochures" icon={brochureIcon}
        docs={brand.brochures} color={brand.color} iconBg={brand.iconBg}
        loading={loading} onDownload={download}
        forceOpen={openSections.includes("brochures")} dark={dark} />

      <DocSection title="EMI Plans" icon={emiIcon}
        docs={brand.emiPlans} color={brand.color} iconBg={brand.iconBg}
        loading={loading} onDownload={download}
        forceOpen={openSections.includes("emi")} dark={dark} />
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────── */

export default function Home() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");

  const filteredBrands = useMemo(() => {
    if (!query.trim()) return brands.map(b => ({ brand: b, openSections: [] as string[] }));
    const lq = query.toLowerCase();
    const results: { brand: Brand; openSections: string[] }[] = [];

    for (const b of brands) {
      if (b.brand.toLowerCase().includes(lq)) {
        results.push({ brand: b, openSections: [] });
        continue;
      }
      const brochures = b.brochures.filter(d => d.label.toLowerCase().includes(lq));
      const emiPlans = b.emiPlans.filter(d =>
        d.label.toLowerCase().includes(lq) || d.sub?.toLowerCase().includes(lq)
      );
      const brandPriceLists = (b.brandPriceLists ?? []).filter(d => d.label.toLowerCase().includes(lq));

      if (brochures.length || emiPlans.length || brandPriceLists.length) {
        const openSections: string[] = [];
        if (brochures.length) openSections.push("brochures");
        if (emiPlans.length) openSections.push("emi");
        if (brandPriceLists.length) openSections.push("pricelists");
        results.push({ brand: { ...b, brochures, emiPlans, brandPriceLists }, openSections });
      }
    }
    return results;
  }, [query]);

  const bg = dark ? "bg-gray-900" : "bg-gray-50";
  const headerBg = dark ? "bg-gray-900/95 border-gray-800" : "bg-gray-50/95 border-gray-100";
  const titleCls = dark ? "text-white" : "text-gray-800";
  const subtitleCls = dark ? "text-gray-400" : "text-gray-500";
  const dividerCls = dark ? "bg-gray-700" : "bg-gray-300";
  const descCls = dark ? "text-gray-500" : "text-gray-400";
  const toggleCls = dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300";
  const searchCls = dark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-gray-600"
    : "bg-white border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-gray-300";
  const searchIconCls = dark ? "text-gray-500" : "text-gray-400";
  const clearBtnCls = dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600";
  const emptyStateCls = dark ? "text-gray-500" : "text-gray-400";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* ── Sticky header ─────────────────────────────────── */}
      <div className={`sticky top-0 z-20 ${headerBg} backdrop-blur-md border-b shadow-sm transition-colors duration-300`}>
        <div className="max-w-lg mx-auto px-4 pt-5 pb-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 text-center">
              <h1 className={`text-2xl font-extrabold ${titleCls} tracking-tight transition-colors duration-300`}>
                Ittehad Automotive
              </h1>
              <p className={`text-sm ${subtitleCls} mt-0.5 transition-colors duration-300`}
                style={{ fontFamily: "'Times New Roman', Times, serif", fontStyle: "italic" }}>
                An Ittehad Steel Company
              </p>
              <div className={`w-10 h-0.5 ${dividerCls} mx-auto mt-2 rounded-full transition-colors duration-300`} />
              <p className={`${descCls} text-sm mt-1.5 transition-colors duration-300`}>
                View or download price lists, brochures &amp; EMI plans
              </p>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle dark mode"
              className={`flex-shrink-0 w-9 h-9 rounded-xl ${toggleCls} flex items-center justify-center transition-all cursor-pointer mt-0.5`}
            >
              {dark ? <IconSun /> : <IconMoon />}
            </button>
          </div>

          {/* Search bar */}
          <div className="mt-3 relative">
            <span className={`absolute left-3 top-1/2 -translate-y-1/2 ${searchIconCls} pointer-events-none`}>
              <IconSearch />
            </span>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search brochures, price lists, EMI plans…"
              className={`w-full pl-9 pr-9 py-2.5 rounded-xl border text-sm ${searchCls} focus:outline-none focus:ring-2 transition-all`}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${clearBtnCls} cursor-pointer`}
              >
                <IconX />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Brand cards ───────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {filteredBrands.length === 0 ? (
          <p className={`text-center ${emptyStateCls} text-sm py-12`}>
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredBrands.map(({ brand, openSections }) => (
              <BrandCard key={brand.id} brand={brand} dark={dark} openSections={openSections} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
