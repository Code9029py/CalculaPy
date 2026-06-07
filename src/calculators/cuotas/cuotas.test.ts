import { describe, expect, it } from "vitest";

import { calculateCuotas } from "./formula";
import { hasValidationErrors, validateCuotasInput } from "./validators";

describe("calculateCuotas", () => {
  it("calcula sobrecosto cuando las cuotas superan el precio contado", () => {
    const result = calculateCuotas({
      cashPrice: 1000000,
      initialPayment: 0,
      installmentsCount: 10,
      installmentAmount: 120000,
      administrativeCost: 0
    });

    expect(result).toMatchObject({
      totalFinanced: 1200000,
      totalPaid: 1200000,
      difference: 200000,
      overcostPercentage: 20,
      status: "over"
    });
  });

  it("calcula cero sobrecosto cuando total pagado iguala al contado", () => {
    const result = calculateCuotas({
      cashPrice: 1000000,
      initialPayment: 200000,
      installmentsCount: 8,
      installmentAmount: 100000,
      administrativeCost: 0
    });

    expect(result).toMatchObject({
      totalFinanced: 800000,
      totalPaid: 1000000,
      difference: 0,
      overcostPercentage: 0,
      status: "equal"
    });
  });

  it("calcula diferencia negativa cuando se paga menos que al contado", () => {
    const result = calculateCuotas({
      cashPrice: 1000000,
      initialPayment: 0,
      installmentsCount: 6,
      installmentAmount: 150000,
      administrativeCost: 0
    });

    expect(result).toMatchObject({
      totalFinanced: 900000,
      totalPaid: 900000,
      difference: -100000,
      overcostPercentage: -10,
      status: "under"
    });
  });

  it("rechaza valores negativos", () => {
    const errors = validateCuotasInput({
      cashPrice: -1,
      initialPayment: -1,
      installmentsCount: 1,
      installmentAmount: -1,
      administrativeCost: -1
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.cashPrice).toBe(
      "El precio contado debe ser mayor a cero."
    );
    expect(errors.initialPayment).toBe(
      "La entrega inicial no puede ser negativa."
    );
    expect(errors.installmentAmount).toBe(
      "El monto de cada cuota no puede ser negativo."
    );
    expect(errors.administrativeCost).toBe(
      "El costo administrativo no puede ser negativo."
    );
  });

  it("rechaza cuotas no enteras", () => {
    const errors = validateCuotasInput({
      cashPrice: 1000000,
      initialPayment: 0,
      installmentsCount: 10.5,
      installmentAmount: 100000,
      administrativeCost: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.installmentsCount).toBe(
      "La cantidad de cuotas debe ser un entero."
    );
  });

  it("rechaza total pagado cero", () => {
    const errors = validateCuotasInput({
      cashPrice: 1000000,
      initialPayment: 0,
      installmentsCount: 1,
      installmentAmount: 0,
      administrativeCost: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.totalPaid).toBe("El total pagado debe ser mayor a cero.");
  });

  it("redondea totales y porcentaje de forma consistente", () => {
    const result = calculateCuotas({
      cashPrice: 999,
      initialPayment: 0,
      installmentsCount: 3,
      installmentAmount: 400.005,
      administrativeCost: 0
    });

    expect(result.totalFinanced).toBe(1200.01);
    expect(result.totalPaid).toBe(1200.01);
    expect(result.difference).toBe(201.01);
    expect(result.overcostPercentage).toBe(20.12);
  });
});
