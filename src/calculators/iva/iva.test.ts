import { describe, expect, it } from "vitest";

import { calculateIva, roundGuaranies } from "./formula";
import { hasValidationErrors, validateIvaInput } from "./validators";

describe("calculateIva", () => {
  it("agrega IVA 10% a 100.000", () => {
    expect(calculateIva({ amount: 100000, rate: 10, mode: "add" })).toMatchObject(
      {
        netAmount: 100000,
        ivaAmount: 10000,
        grossAmount: 110000
      }
    );
  });

  it("separa IVA incluido 10% de 110.000", () => {
    expect(
      calculateIva({ amount: 110000, rate: 10, mode: "included" })
    ).toMatchObject({
      netAmount: 100000,
      ivaAmount: 10000,
      grossAmount: 110000
    });
  });

  it("agrega IVA 5% a 100.000", () => {
    expect(calculateIva({ amount: 100000, rate: 5, mode: "add" })).toMatchObject(
      {
        netAmount: 100000,
        ivaAmount: 5000,
        grossAmount: 105000
      }
    );
  });

  it("separa IVA incluido 5% de 105.000", () => {
    expect(calculateIva({ amount: 105000, rate: 5, mode: "included" })).toMatchObject(
      {
        netAmount: 100000,
        ivaAmount: 5000,
        grossAmount: 105000
      }
    );
  });

  it("redondea de forma consistente a dos decimales", () => {
    const result = calculateIva({ amount: 99999.99, rate: 10, mode: "included" });

    expect(result.netAmount).toBe(90909.08);
    expect(result.ivaAmount).toBe(9090.91);
    expect(roundGuaranies(result.netAmount + result.ivaAmount)).toBe(99999.99);
  });
});

describe("validateIvaInput", () => {
  it("rechaza montos negativos", () => {
    const errors = validateIvaInput({ amount: -1, rate: 10, mode: "add" });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.amount).toBe("El monto no puede ser negativo.");
  });

  it("rechaza montos invalidos", () => {
    const errors = validateIvaInput({
      amount: Number.NaN,
      rate: 10,
      mode: "included"
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.amount).toBe("Ingresá un monto válido.");
  });
});
