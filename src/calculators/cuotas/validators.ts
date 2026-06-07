import type { CuotasInput } from "./types";

export type CuotasValidationErrors = Partial<
  Record<keyof CuotasInput | "totalPaid", string>
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

export function parseInstallmentsCount(value: string) {
  const normalized = value.trim().replace(/\./g, "").replace(",", ".");
  const amount = Number(normalized);

  return Number.isFinite(amount) ? amount : Number.NaN;
}

export function validateCuotasInput(
  input: CuotasInput
): CuotasValidationErrors {
  const errors: CuotasValidationErrors = {};

  if (!Number.isFinite(input.cashPrice)) {
    errors.cashPrice = "Ingresá un precio contado válido.";
  } else if (input.cashPrice <= 0) {
    errors.cashPrice = "El precio contado debe ser mayor a cero.";
  }

  if (!Number.isFinite(input.initialPayment)) {
    errors.initialPayment = "Ingresá una entrega inicial válida.";
  } else if (input.initialPayment < 0) {
    errors.initialPayment = "La entrega inicial no puede ser negativa.";
  }

  if (!Number.isFinite(input.installmentsCount)) {
    errors.installmentsCount = "Ingresá una cantidad de cuotas válida.";
  } else if (!Number.isInteger(input.installmentsCount)) {
    errors.installmentsCount = "La cantidad de cuotas debe ser un entero.";
  } else if (input.installmentsCount <= 0) {
    errors.installmentsCount =
      "La cantidad de cuotas debe ser mayor a cero.";
  }

  if (!Number.isFinite(input.installmentAmount)) {
    errors.installmentAmount = "Ingresá un monto de cuota válido.";
  } else if (input.installmentAmount < 0) {
    errors.installmentAmount = "El monto de cada cuota no puede ser negativo.";
  }

  if (!Number.isFinite(input.administrativeCost)) {
    errors.administrativeCost = "Ingresá un costo administrativo válido.";
  } else if (input.administrativeCost < 0) {
    errors.administrativeCost =
      "El costo administrativo no puede ser negativo.";
  }

  const totalPaid =
    input.initialPayment +
    input.installmentsCount * input.installmentAmount +
    input.administrativeCost;

  if (
    Object.keys(errors).length === 0 &&
    Number.isFinite(totalPaid) &&
    totalPaid === 0
  ) {
    errors.totalPaid = "El total pagado debe ser mayor a cero.";
  }

  return errors;
}

export function hasValidationErrors(errors: CuotasValidationErrors) {
  return Object.keys(errors).length > 0;
}
