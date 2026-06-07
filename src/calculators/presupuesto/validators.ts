import type { PresupuestoInput } from "./types";

export type PresupuestoValidationErrors = Partial<
  Record<keyof PresupuestoInput, string>
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

export function validatePresupuestoInput(
  input: PresupuestoInput
): PresupuestoValidationErrors {
  const errors: PresupuestoValidationErrors = {};

  if (!Number.isFinite(input.monthlyIncome)) {
    errors.monthlyIncome = "Ingresá ingresos mensuales válidos.";
  } else if (input.monthlyIncome <= 0) {
    errors.monthlyIncome = "Los ingresos mensuales deben ser mayores a cero.";
  }

  if (!Number.isFinite(input.fixedExpenses)) {
    errors.fixedExpenses = "Ingresá gastos fijos válidos.";
  } else if (input.fixedExpenses < 0) {
    errors.fixedExpenses = "Los gastos fijos no pueden ser negativos.";
  }

  if (!Number.isFinite(input.variableExpenses)) {
    errors.variableExpenses = "Ingresá gastos variables válidos.";
  } else if (input.variableExpenses < 0) {
    errors.variableExpenses = "Los gastos variables no pueden ser negativos.";
  }

  if (!Number.isFinite(input.desiredSavings)) {
    errors.desiredSavings = "Ingresá un ahorro objetivo válido.";
  } else if (input.desiredSavings < 0) {
    errors.desiredSavings = "El ahorro objetivo no puede ser negativo.";
  }

  return errors;
}

export function hasValidationErrors(errors: PresupuestoValidationErrors) {
  return Object.keys(errors).length > 0;
}
