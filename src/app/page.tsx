"use client";

import { useState, useMemo } from "react";
import { IconSun, IconMoon, IconSearch, IconX } from "@/components/icons";
import { BrandCard } from "@/components/BrandCard";
import { brands } from "@/data/brands";
import type { Brand } from "@/data/brands";

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
  const titleCls = dark ? "text-white" : "text-gray-800";
  const subtitleCls = dark ? "text-gray-400" : "text-gray-500";
  const dividerCls = dark ? "bg-gray-700" : "bg-gray-300";
  const descCls = dark ? "text-gray-400" : "text-gray-400";
  const toggleCls = dark ? "bg-gray-700 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300";
  const searchCls = dark
    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-gray-600"
    : "bg-white border-gray-200 text-gray-700 placeholder-gray-400 focus:ring-gray-300";
  const searchIconCls = dark ? "text-gray-500" : "text-gray-400";
  const clearBtnCls = dark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600";
  const emptyStateCls = dark ? "text-gray-500" : "text-gray-400";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* Header */}
      <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
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
            className={`w-full pl-9 pr-9 py-2 rounded-xl border text-xs ${searchCls} focus:outline-none focus:ring-2 transition-all`}
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

      {/* Brand cards */}
      <div className="max-w-lg mx-auto px-4 pb-8">
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
