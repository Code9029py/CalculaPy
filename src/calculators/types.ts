import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

export type CalculatorRiskLevel = "bajo" | "medio" | "alto";

export type CalculatorStatus = "publicada" | "borrador" | "revision-pendiente";

export type CalculatorIcon = ComponentType<LucideProps>;

export type CalculatorMetadata = {
  title: string;
  description: string;
  slug: string;
  category: string;
  riskLevel: CalculatorRiskLevel;
  status: CalculatorStatus;
  lastReviewedAt: string;
  icon: CalculatorIcon;
};
