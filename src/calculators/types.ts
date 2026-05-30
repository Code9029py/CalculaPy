export type CalculatorRiskLevel = "bajo" | "medio" | "alto";

export type CalculatorStatus = "publicada" | "borrador" | "revision-pendiente";

export type CalculatorMetadata = {
  title: string;
  description: string;
  slug: string;
  category: string;
  riskLevel: CalculatorRiskLevel;
  status: CalculatorStatus;
  lastReviewedAt: string;
};
