import { IVA_RATES } from "./formula";
import type { IvaInput, IvaMode, IvaRate } from "./types";

export type IvaValidationErrors = Partial<Record<keyof IvaInput, string>>;

export function parseAmount(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".").trim();
  const amount = Number(normalized);

  return Number.isFinite(amount) ? amount : Number.NaN;
}

export function isIvaRate(value: number): value is IvaRate {
  return IVA_RATES.includes(value as IvaRate);
}

export function isIvaMode(value: string): value is IvaMode {
  return value === "add" || value === "included";
}

export function validateIvaInput(input: IvaInput): IvaValidationErrors {
  const errors: IvaValidationErrors = {};

  if (!Number.isFinite(input.amount)) {
    errors.amount = "Ingresá un monto válido.";
  } else if (input.amount < 0) {
    errors.amount = "El monto no puede ser negativo.";
  } else if (input.amount === 0) {
    errors.amount = "Ingresá un monto mayor a cero.";
  }

  if (!isIvaRate(input.rate)) {
    errors.rate = "Seleccioná una tasa de IVA válida.";
  }

  if (!isIvaMode(input.mode)) {
    errors.mode = "Seleccioná si querés agregar o separar el IVA.";
  }

  return errors;
}

export function hasValidationErrors(errors: IvaValidationErrors) {
  return Object.keys(errors).length > 0;
}
