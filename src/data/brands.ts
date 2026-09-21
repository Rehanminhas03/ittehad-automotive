export interface Doc {
  label: string;
  file: string;
  sub?: string;
}

export interface Brand {
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

export const brands: Brand[] = [
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
