import { ReceiptText } from "lucide-react";

import type { CalculatorMetadata } from "../types";

export const ivaMetadata: CalculatorMetadata = {
  title: "Calculadora de IVA",
  description:
    "Calculá IVA 5% o 10% en Paraguay para agregarlo a un monto neto o separarlo de un monto con IVA incluido.",
  slug: "iva",
  category: "Tributos",
  riskLevel: "bajo",
  status: "publicada",
  lastReviewedAt: "2026-05-29",
  icon: ReceiptText
};
