import { PiggyBank } from "lucide-react";

import type { CalculatorMetadata } from "../types";

export const presupuestoMetadata: CalculatorMetadata = {
  title: "Calculadora de presupuesto mensual",
  description:
    "Estimá ingresos contra gastos y revisá saldo disponible, margen y ahorro objetivo.",
  slug: "presupuesto",
  category: "Organización",
  riskLevel: "bajo",
  status: "publicada",
  lastReviewedAt: "2026-06-07",
  icon: PiggyBank
};
