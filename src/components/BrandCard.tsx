"use client";

import { IconPDF, IconShield, IconBook, IconCard } from "@/components/icons";
import { ActionButtons } from "@/components/ActionButtons";
import { DocSection } from "@/components/DocSection";
import { useDownload } from "@/hooks/useDownload";
import type { Brand } from "@/data/brands";

interface Props {
  brand: Brand;
  dark: boolean;
  openSections: string[];
}

export function BrandCard({ brand, dark, openSections }: Props) {
  const { loading, download } = useDownload();

  const cardCls = dark
    ? "rounded-2xl overflow-hidden shadow-md border border-gray-700 bg-gray-800"
    : "rounded-2xl overflow-hidden shadow-md border border-gray-300 bg-white";
  const metaLabelCls = dark ? "text-gray-400" : "text-gray-400";
  const noteCls = dark ? "text-gray-400" : "text-gray-400";

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
            <h2 className="text-lg font-extrabold leading-tight break-words"
              style={{ color: dark ? "white" : brand.color }}>
              {brand.brand}
            </h2>
            {brand.note && <p className={`text-[11px] ${noteCls} leading-tight mt-0.5`}>{brand.note}</p>}
          </div>
        </div>
        {brand.priceFile && (
          <div className="ml-auto flex-shrink-0">
            <ActionButtons
              file={brand.priceFile}
              filename={`${brand.id}-pricelist.pdf`}
              label={`${brand.brand} price list`}
              color={brand.color}
              loading={loading}
              onDownload={download}
              dark={dark}
            />
          </div>
        )}
      </div>

      <DocSection
        title="Brand Price Lists"
        icon={<IconShield />}
        docs={brand.brandPriceLists ?? []}
        color={brand.color}
        iconBg={brand.iconBg}
        loading={loading}
        onDownload={download}
        forceOpen={openSections.includes("pricelists")}
        dark={dark}
      />

      <DocSection
        title="Brochures"
        icon={<IconBook />}
        docs={brand.brochures}
        color={brand.color}
        iconBg={brand.iconBg}
        loading={loading}
        onDownload={download}
        forceOpen={openSections.includes("brochures")}
        dark={dark}
      />

      <DocSection
        title="EMI Plans"
        icon={<IconCard />}
        docs={brand.emiPlans}
        color={brand.color}
        iconBg={brand.iconBg}
        loading={loading}
        onDownload={download}
        forceOpen={openSections.includes("emi")}
        dark={dark}
      />
    </div>
  );
}
