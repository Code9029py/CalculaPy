import { describe, expect, it } from "vitest";

import { calculateImportacion } from "./formula";
import {
  hasValidationErrors,
  validateImportacionInput
} from "./validators";

describe("calculateImportacion", () => {
  it("calcula el caso inicial con cargos estimados", () => {
    const result = calculateImportacion({
      productPriceUsd: 100,
      shippingUsd: 20,
      exchangeRate: 7500,
      estimatedChargesPercentage: 10,
      fixedChargeGs: 0
    });

    expect(result).toMatchObject({
      subtotalUsd: 120,
      subtotalGs: 900000,
      estimatedCharges: 90000,
      totalEstimated: 990000,
      status: "with-charges"
    });
  });

  it("calcula sin cargos adicionales", () => {
    const result = calculateImportacion({
      productPriceUsd: 100,
      shippingUsd: 20,
      exchangeRate: 7500,
      estimatedChargesPercentage: 0,
      fixedChargeGs: 0
    });

    expect(result.subtotalGs).toBe(900000);
    expect(result.estimatedCharges).toBe(0);
    expect(result.totalEstimated).toBe(900000);
    expect(result.status).toBe("base-only");
  });

  it("calcula con cargo fijo en guaraníes", () => {
    const result = calculateImportacion({
      productPriceUsd: 50,
      shippingUsd: 10,
      exchangeRate: 7500,
      estimatedChargesPercentage: 0,
      fixedChargeGs: 50000
    });

    expect(result.subtotalGs).toBe(450000);
    expect(result.totalEstimated).toBe(500000);
    expect(result.status).toBe("with-charges");
  });

  it("rechaza precio cero", () => {
    const errors = validateImportacionInput({
      productPriceUsd: 0,
      shippingUsd: 20,
      exchangeRate: 7500,
      estimatedChargesPercentage: 10,
      fixedChargeGs: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.productPriceUsd).toBe(
      "El precio del producto debe ser mayor a cero."
    );
  });

  it("rechaza envío negativo", () => {
    const errors = validateImportacionInput({
      productPriceUsd: 100,
      shippingUsd: -1,
      exchangeRate: 7500,
      estimatedChargesPercentage: 10,
      fixedChargeGs: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.shippingUsd).toBe("El envío no puede ser negativo.");
  });

  it("rechaza tipo de cambio cero", () => {
    const errors = validateImportacionInput({
      productPriceUsd: 100,
      shippingUsd: 20,
      exchangeRate: 0,
      estimatedChargesPercentage: 10,
      fixedChargeGs: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.exchangeRate).toBe(
      "El tipo de cambio debe ser mayor a cero."
    );
  });

  it("rechaza porcentaje negativo", () => {
    const errors = validateImportacionInput({
      productPriceUsd: 100,
      shippingUsd: 20,
      exchangeRate: 7500,
      estimatedChargesPercentage: -1,
      fixedChargeGs: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.estimatedChargesPercentage).toBe(
      "El porcentaje de cargos no puede ser negativo."
    );
  });

  it("rechaza cargo fijo negativo", () => {
    const errors = validateImportacionInput({
      productPriceUsd: 100,
      shippingUsd: 20,
      exchangeRate: 7500,
      estimatedChargesPercentage: 10,
      fixedChargeGs: -1
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.fixedChargeGs).toBe("El cargo fijo no puede ser negativo.");
  });

  it("redondea USD y guaraníes de forma consistente", () => {
    const result = calculateImportacion({
      productPriceUsd: 10.335,
      shippingUsd: 1.005,
      exchangeRate: 7333.33,
      estimatedChargesPercentage: 7.5,
      fixedChargeGs: 1234.4
    });

    expect(result.subtotalUsd).toBe(11.34);
    expect(result.subtotalGs).toBe(83160);
    expect(result.estimatedCharges).toBe(6237);
    expect(result.totalEstimated).toBe(90631);
  });
});
