import { describe, expect, it } from "vitest";

import { calculateCombustible } from "./formula";
import {
  hasValidationErrors,
  validateCombustibleInput
} from "./validators";

describe("calculateCombustible", () => {
  it("calcula litros y costo para 100 km", () => {
    const result = calculateCombustible({
      distanceKm: 100,
      consumptionPer100Km: 8,
      pricePerLiter: 7500,
      tripsPerMonth: 0
    });

    expect(result).toMatchObject({
      estimatedLiters: 8,
      estimatedCost: 60000,
      estimatedMonthlyCost: 0,
      status: "trip"
    });
  });

  it("calcula litros y costo para 50 km", () => {
    const result = calculateCombustible({
      distanceKm: 50,
      consumptionPer100Km: 10,
      pricePerLiter: 8000,
      tripsPerMonth: 0
    });

    expect(result.estimatedLiters).toBe(5);
    expect(result.estimatedCost).toBe(40000);
  });

  it("calcula costo mensual cuando hay viajes por mes", () => {
    const result = calculateCombustible({
      distanceKm: 100,
      consumptionPer100Km: 8,
      pricePerLiter: 7500,
      tripsPerMonth: 20
    });

    expect(result.estimatedCost).toBe(60000);
    expect(result.estimatedMonthlyCost).toBe(1200000);
    expect(result.status).toBe("monthly");
  });

  it("rechaza distancia cero", () => {
    const errors = validateCombustibleInput({
      distanceKm: 0,
      consumptionPer100Km: 8,
      pricePerLiter: 7500,
      tripsPerMonth: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.distanceKm).toBe("La distancia debe ser mayor a cero.");
  });

  it("rechaza consumo cero", () => {
    const errors = validateCombustibleInput({
      distanceKm: 100,
      consumptionPer100Km: 0,
      pricePerLiter: 7500,
      tripsPerMonth: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.consumptionPer100Km).toBe(
      "El consumo cada 100 km debe ser mayor a cero."
    );
  });

  it("rechaza precio cero", () => {
    const errors = validateCombustibleInput({
      distanceKm: 100,
      consumptionPer100Km: 8,
      pricePerLiter: 0,
      tripsPerMonth: 0
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.pricePerLiter).toBe(
      "El precio por litro debe ser mayor a cero."
    );
  });

  it("rechaza viajes por mes negativos", () => {
    const errors = validateCombustibleInput({
      distanceKm: 100,
      consumptionPer100Km: 8,
      pricePerLiter: 7500,
      tripsPerMonth: -1
    });

    expect(hasValidationErrors(errors)).toBe(true);
    expect(errors.tripsPerMonth).toBe(
      "Los viajes por mes no pueden ser negativos."
    );
  });

  it("redondea litros con decimales", () => {
    const result = calculateCombustible({
      distanceKm: 33.33,
      consumptionPer100Km: 7.7,
      pricePerLiter: 7500,
      tripsPerMonth: 0
    });

    expect(result.estimatedLiters).toBe(2.57);
  });

  it("redondea guaraníes sin decimales", () => {
    const result = calculateCombustible({
      distanceKm: 33.33,
      consumptionPer100Km: 7.7,
      pricePerLiter: 7777,
      tripsPerMonth: 0
    });

    expect(result.estimatedLiters).toBe(2.57);
    expect(result.estimatedCost).toBe(19987);
  });
});
