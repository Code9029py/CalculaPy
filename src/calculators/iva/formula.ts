import type { IvaInput, IvaResult } from "./types";

export const IVA_RATES = [10, 5] as const;

export function roundGuaranies(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateIva(input: IvaInput): IvaResult {
  const rateFactor = input.rate / 100;

  if (input.mode === "add") {
    const ivaAmount = roundGuaranies(input.amount * rateFactor);
    const grossAmount = roundGuaranies(input.amount + ivaAmount);

    return {
      netAmount: roundGuaranies(input.amount),
      ivaAmount,
      grossAmount,
      rate: input.rate,
      mode: input.mode
    };
  }

  const netAmount = roundGuaranies(input.amount / (1 + rateFactor));
  const ivaAmount = roundGuaranies(input.amount - netAmount);

  return {
    netAmount,
    ivaAmount,
    grossAmount: roundGuaranies(input.amount),
    rate: input.rate,
    mode: input.mode
  };
}
