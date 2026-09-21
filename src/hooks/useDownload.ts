"use client";

import { useState } from "react";

export function useDownload() {
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
