import { ShoppingBag } from "lucide-react";

import type { CalculatorMetadata } from "../types";

export const importacionMetadata: CalculatorMetadata = {
  title: "Calculadora de importación",
  description:
    "Estimá el costo final de una compra internacional cargando precio, envío, tipo de cambio y cargos estimados.",
  slug: "importacion",
  category: "Compras",
  riskLevel: "bajo",
  status: "publicada",
  lastReviewedAt: "2026-06-07",
  icon: ShoppingBag
};
