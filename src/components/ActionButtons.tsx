"use client";

import { IconEye, IconDownload, IconSpin } from "@/components/icons";

interface Props {
  file: string;
  filename: string;
  label: string;
  color: string;
  loading: string | null;
  onDownload: (file: string, filename: string) => void;
  size?: "sm" | "md";
  dark: boolean;
}

export function ActionButtons({ file, filename, label, color, loading, onDownload, size = "md", dark }: Props) {
  const px = size === "sm" ? "px-2.5 py-1.5" : "px-2.5 py-1.5 sm:px-3 sm:py-2";
  const text = size === "sm" ? "text-xs" : "text-xs sm:text-sm";
  const viewCls = dark
    ? `flex items-center gap-1 ${px} ${text} rounded-lg border-2 border-gray-600 text-gray-300 font-semibold hover:border-gray-400 hover:bg-gray-700 transition-all cursor-pointer`
    : `flex items-center gap-1 ${px} ${text} rounded-lg border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer`;

  return (
    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={() => window.open(file, "_blank", "noopener,noreferrer")}
        aria-label={`View ${label}`}
        className={viewCls}
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
