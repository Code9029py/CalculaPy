export type PresupuestoInput = {
  monthlyIncome: number;
  fixedExpenses: number;
  variableExpenses: number;
  desiredSavings: number;
};

export type PresupuestoStatus =
  | "negative"
  | "healthy"
  | "tight"
  | "low-margin";

export type PresupuestoResult = {
  totalExpenses: number;
  availableBalance: number;
  balanceAfterSavings: number;
  incomeUsagePercentage: number;
  desiredSavingsPercentage: number;
  status: PresupuestoStatus;
};
