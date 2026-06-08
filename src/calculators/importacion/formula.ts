import type { ImportacionInput, ImportacionResult } from "./types";

export function roundUsd(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function roundGuaranies(value: number) {
  return Math.round(value + Number.EPSILON);
}

export function calculateImportacion(
  input: ImportacionInput
): ImportacionResult {
  const subtotalUsd = roundUsd(input.productPriceUsd + input.shippingUsd);
  const subtotalGs = roundGuaranies(subtotalUsd * input.exchangeRate);
  const estimatedCharges = roundGuaranies(
    (subtotalGs * input.estimatedChargesPercentage) / 100
  );
  const totalEstimated = roundGuaranies(
    subtotalGs + estimatedCharges + input.fixedChargeGs
  );

  return {
    subtotalUsd,
    subtotalGs,
    estimatedCharges,
    totalEstimated,
    status:
      input.estimatedChargesPercentage > 0 || input.fixedChargeGs > 0
        ? "with-charges"
        : "base-only"
  };
}
