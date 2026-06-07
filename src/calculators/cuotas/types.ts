export type CuotasInput = {
  cashPrice: number;
  initialPayment: number;
  installmentsCount: number;
  installmentAmount: number;
  administrativeCost: number;
};

export type CuotasComparisonStatus = "over" | "equal" | "under";

export type CuotasResult = {
  totalFinanced: number;
  totalPaid: number;
  difference: number;
  overcostPercentage: number;
  status: CuotasComparisonStatus;
};
