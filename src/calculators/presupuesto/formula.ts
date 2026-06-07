import type { PresupuestoInput, PresupuestoResult } from "./types";

export function roundGuaranies(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function roundPercentage(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculatePresupuesto(
  input: PresupuestoInput
): PresupuestoResult {
  const totalExpenses = roundGuaranies(
    input.fixedExpenses + input.variableExpenses
  );
  const availableBalance = roundGuaranies(
    input.monthlyIncome - totalExpenses
  );
  const balanceAfterSavings = roundGuaranies(
    availableBalance - input.desiredSavings
  );
  const incomeUsagePercentage = roundPercentage(
    (totalExpenses / input.monthlyIncome) * 100
  );
  const desiredSavingsPercentage = roundPercentage(
    (input.desiredSavings / input.monthlyIncome) * 100
  );

  let status: PresupuestoResult["status"] = "healthy";

  if (availableBalance < 0) {
    status = "negative";
  } else if (incomeUsagePercentage > 90) {
    status = "low-margin";
  } else if (incomeUsagePercentage > 70) {
    status = "tight";
  }

  return {
    totalExpenses,
    availableBalance,
    balanceAfterSavings,
    incomeUsagePercentage,
    desiredSavingsPercentage,
    status
  };
}
