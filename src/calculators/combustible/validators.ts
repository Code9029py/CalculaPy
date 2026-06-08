import type { CombustibleInput } from "./types";

export type CombustibleValidationErrors = Partial<
  Record<keyof CombustibleInput, string>
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

export function validateCombustibleInput(
  input: CombustibleInput
): CombustibleValidationErrors {
  const errors: CombustibleValidationErrors = {};

  if (!Number.isFinite(input.distanceKm)) {
    errors.distanceKm = "Ingresá una distancia válida.";
  } else if (input.distanceKm <= 0) {
    errors.distanceKm = "La distancia debe ser mayor a cero.";
  }

  if (!Number.isFinite(input.consumptionPer100Km)) {
    errors.consumptionPer100Km = "Ingresá un consumo válido.";
  } else if (input.consumptionPer100Km <= 0) {
    errors.consumptionPer100Km =
      "El consumo cada 100 km debe ser mayor a cero.";
  }

  if (!Number.isFinite(input.pricePerLiter)) {
    errors.pricePerLiter = "Ingresá un precio por litro válido.";
  } else if (input.pricePerLiter <= 0) {
    errors.pricePerLiter = "El precio por litro debe ser mayor a cero.";
  }

  if (!Number.isFinite(input.tripsPerMonth)) {
    errors.tripsPerMonth = "Ingresá una cantidad de viajes válida.";
  } else if (input.tripsPerMonth < 0) {
    errors.tripsPerMonth = "Los viajes por mes no pueden ser negativos.";
  }

  return errors;
}

export function hasValidationErrors(errors: CombustibleValidationErrors) {
  return Object.keys(errors).length > 0;
}
