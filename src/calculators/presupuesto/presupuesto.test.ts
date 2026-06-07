import { describe, expect, it } from "vitest";

import { calculatePresupuesto } from "./formula";
import {
  hasValidationErrors,
  validatePresupuestoInput
} from "./validators";

describe("calculatePresupuesto", () => {
  it("calcula el caso inicial esperado", () => {
    const result = calculatePresupuesto({
      monthlyIncome: 3000000,
      fixedExpenses: 1500000,
      variableExpenses: 800000,
      desiredSavings: 300000
    });

    expect(result).toMatchObject({
      totalExpenses: 2300000,
      availableBalance: 700000,
      balanceAfterSavings: 400000,
      incomeUsagePercentage: 76.67,
      desiredSavingsPercentage: 10,
      status: "tight"
    });
  });

  it("detecta presupuesto negativo", () => {
    const result = calculatePresupuesto({
      monthlyIncome: 1000000,
      fixedExpenses: 900000,
      variableExpenses: 300000,
      desiredSavings: 0
    });

    expect(result.availableBalance).toBe(-200000);
    expect(result.status).toBe("negative");
  });

  it("detecta presupuesto saludable", () => {
    const result = calculatePresupuesto({
      monthlyIncome: 2000000,
      fixedExpenses: 900000,
      variableExpenses: 300000,
      desiredSavings: 200000
    });

    expect(result.incomeUsagePercentage).toBe(60);
    expect(result.status).toBe("healthy");
  });

  it("detecta margen muy bajo", () => {
    const result = calculatePresupuesto({
      monthlyIncome: 2000000,
      fixedExpenses: 1500000,
      variableExpenses: 350000,
      desiredSavings: 0
    });

    expect(result.incomeUsagePercentage).toBe(92.5);
    expect(result.status).toBe("low-margin");
  });

  it("rechaza valores negativos", () => {
    const errors = validatePresupuestoInput({
      monthlyIncome: -1,
      fixedExpenses: -1,
      variableExpenses: -1,
      desiredSavings: -1
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.monthlyIncome).toBe(
      "Los ingresos mensuales deben ser mayores a cero."
    );
    expect(errors.fixedExpenses).toBe(
      "Los gastos fijos no pueden ser negativos."
    );
    expect(errors.variableExpenses).toBe(
      "Los gastos variables no pueden ser negativos."
    );
    expect(errors.desiredSavings).toBe(
      "El ahorro objetivo no puede ser negativo."
    );
  });

  it("rechaza ingresos cero", () => {
    const errors = validatePresupuestoInput({
      monthlyIncome: 0,
      fixedExpenses: 0,
      variableExpenses: 0,
      desiredSavings: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.monthlyIncome).toBe(
      "Los ingresos mensuales deben ser mayores a cero."
    );
  });

  it("redondea guaraníes y porcentajes de forma consistente", () => {
    const result = calculatePresupuesto({
      monthlyIncome: 999999.99,
      fixedExpenses: 333333.335,
      variableExpenses: 222222.225,
      desiredSavings: 111111.115
    });

    expect(result.totalExpenses).toBe(555555.56);
    expect(result.availableBalance).toBe(444444.43);
    expect(result.balanceAfterSavings).toBe(333333.32);
    expect(result.incomeUsagePercentage).toBe(55.56);
    expect(result.desiredSavingsPercentage).toBe(11.11);
  });
});
