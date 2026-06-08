import type { ImportacionInput } from "./types";

export type ImportacionValidationErrors = Partial<
  Record<keyof ImportacionInput, string>
>;

export function parseAmount(value: string, fallbackForEmpty = Number.NaN) {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    return fallbackForEmpty;
  }

  const normalized = trimmed.replace(/\./g, "").replace(",", ".");
  const amount = Number(normalized);

  return Number.isFinite(amount) ? amount : Number.NaN;
}

export function parseOptionalAmount(value: string) {
  return parseAmount(value, 0);
}

export function validateImportacionInput(
  input: ImportacionInput
): ImportacionValidationErrors {
  const errors: ImportacionValidationErrors = {};

  if (!Number.isFinite(input.productPriceUsd)) {
    errors.productPriceUsd = "Ingresá un precio del producto válido.";
  } else if (input.productPriceUsd <= 0) {
    errors.productPriceUsd = "El precio del producto debe ser mayor a cero.";
  }

  if (!Number.isFinite(input.shippingUsd)) {
    errors.shippingUsd = "Ingresá un envío válido.";
  } else if (input.shippingUsd < 0) {
    errors.shippingUsd = "El envío no puede ser negativo.";
  }

  if (!Number.isFinite(input.exchangeRate)) {
    errors.exchangeRate = "Ingresá un tipo de cambio válido.";
  } else if (input.exchangeRate <= 0) {
    errors.exchangeRate = "El tipo de cambio debe ser mayor a cero.";
  }

  if (!Number.isFinite(input.estimatedChargesPercentage)) {
    errors.estimatedChargesPercentage =
      "Ingresá un porcentaje de cargos válido.";
  } else if (input.estimatedChargesPercentage < 0) {
    errors.estimatedChargesPercentage =
      "El porcentaje de cargos no puede ser negativo.";
  }

  if (!Number.isFinite(input.fixedChargeGs)) {
    errors.fixedChargeGs = "Ingresá un cargo fijo válido.";
  } else if (input.fixedChargeGs < 0) {
    errors.fixedChargeGs = "El cargo fijo no puede ser negativo.";
  }

  return errors;
}

export function hasValidationErrors(errors: ImportacionValidationErrors) {
  return Object.keys(errors).length > 0;
}
