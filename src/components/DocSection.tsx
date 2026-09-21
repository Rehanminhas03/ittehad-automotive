"use client";

import { useState, useEffect } from "react";
import { IconChevron, IconDoc } from "@/components/icons";
import { ActionButtons } from "@/components/ActionButtons";
import type { Doc } from "@/data/brands";

interface Props {
  title: string;
  icon: React.ReactNode;
  docs: Doc[];
  color: string;
  iconBg: string;
  loading: string | null;
  onDownload: (file: string, filename: string) => void;
  forceOpen?: boolean;
  dark: boolean;
}

export function DocSection({ title, icon, docs, color, iconBg, loading, onDownload, forceOpen = false, dark }: Props) {
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
        style={{ color: dark ? "white" : color }}
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
                  <IconDoc color={color} />
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${labelCls} leading-tight break-words`}>{d.label}</p>
                  {d.sub && <p className={`text-[11px] ${subCls} leading-snug mt-0.5 break-words`}>{d.sub}</p>}
                </div>
              </div>
              <div className="ml-auto flex-shrink-0">
                <ActionButtons
                  file={d.file}
                  filename={d.file.split("/").pop() ?? d.label}
                  label={d.sub ? `${d.label}, ${d.sub}` : d.label}
                  color={color}
                  loading={loading}
                  onDownload={onDownload}
                  size="sm"
                  dark={dark}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
