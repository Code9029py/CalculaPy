import type { CuotasInput, CuotasResult } from "./types";

export function roundGuaranies(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function roundPercentage(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateCuotas(input: CuotasInput): CuotasResult {
  const totalFinanced = roundGuaranies(
    input.installmentsCount * input.installmentAmount +
      input.administrativeCost
  );
  const totalPaid = roundGuaranies(input.initialPayment + totalFinanced);
  const difference = roundGuaranies(totalPaid - input.cashPrice);
  const overcostPercentage = roundPercentage(
    (difference / input.cashPrice) * 100
  );

  const status =
    difference > 0 ? "over" : difference < 0 ? "under" : "equal";

  return {
    totalFinanced,
    totalPaid,
    difference,
    overcostPercentage,
    status
  };
}
