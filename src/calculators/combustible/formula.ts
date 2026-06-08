import type { CombustibleInput, CombustibleResult } from "./types";

export function roundLiters(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function roundGuaranies(value: number) {
  return Math.round(value + Number.EPSILON);
}

export function calculateCombustible(
  input: CombustibleInput
): CombustibleResult {
  const estimatedLiters = roundLiters(
    (input.distanceKm * input.consumptionPer100Km) / 100
  );
  const estimatedCost = roundGuaranies(
    estimatedLiters * input.pricePerLiter
  );
  const estimatedMonthlyCost =
    input.tripsPerMonth > 0
      ? roundGuaranies(estimatedCost * input.tripsPerMonth)
      : 0;

  return {
    estimatedLiters,
    estimatedCost,
    estimatedMonthlyCost,
    status: input.tripsPerMonth > 0 ? "monthly" : "trip"
  };
}
