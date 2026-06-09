import { Copy, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  CalculatorSupportGrid,
  CalculatorSupportNote
} from "../../components/calculator/CalculatorSupportGrid";
import { ResultCard } from "../../components/calculator/ResultCard";
import { ValidationMessage } from "../../components/calculator/ValidationMessage";
import { formatCurrency, formatGuaranies } from "../../utils/formatters";
import { combustibleExamples } from "./examples";
import { calculateCombustible } from "./formula";
import { combustibleMetadata } from "./metadata";
import { combustibleSources } from "./sources";
import type { CombustibleStatus } from "./types";
import {
  hasValidationErrors,
  parseAmount,
  parseOptionalAmount,
  validateCombustibleInput
} from "./validators";

const defaultValues = {
  distanceKm: "100",
  consumptionPer100Km: "8",
  pricePerLiter: "7500",
  tripsPerMonth: ""
};

function formatLiters(value: number) {
  return `${formatGuaranies(value)} L`;
}

function getStatusCopy(status: CombustibleStatus) {
  if (status === "monthly") {
    return {
      label: "Estimación mensual",
      helper: "Estimación mensual según los viajes ingresados."
    };
  }

  return {
    label: "Estimación de viaje",
    helper: "Estimación para un viaje."
  };
}

export function CombustibleCalculator() {
  const [distanceKmText, setDistanceKmText] = useState(
    defaultValues.distanceKm
  );
  const [consumptionPer100KmText, setConsumptionPer100KmText] = useState(
    defaultValues.consumptionPer100Km
  );
  const [pricePerLiterText, setPricePerLiterText] = useState(
    defaultValues.pricePerLiter
  );
  const [tripsPerMonthText, setTripsPerMonthText] = useState(
    defaultValues.tripsPerMonth
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const input = useMemo(
    () => ({
      distanceKm: parseAmount(distanceKmText),
      consumptionPer100Km: parseAmount(consumptionPer100KmText),
      pricePerLiter: parseAmount(pricePerLiterText),
      tripsPerMonth: parseOptionalAmount(tripsPerMonthText)
    }),
    [
      consumptionPer100KmText,
      distanceKmText,
      pricePerLiterText,
      tripsPerMonthText
    ]
  );

  const validationErrors = validateCombustibleInput(input);
  const canCalculate = !hasValidationErrors(validationErrors);
  const result = canCalculate ? calculateCombustible(input) : null;
  const displayResult =
    result ??
    ({
      estimatedLiters: 0,
      estimatedCost: 0,
      estimatedMonthlyCost: 0,
      status: "trip" as const
    });
  const statusCopy = result ? getStatusCopy(result.status) : null;
  const hasMonthlyTrips = result ? input.tripsPerMonth > 0 : false;
  const monthlyCostValue = hasMonthlyTrips
    ? formatCurrency(displayResult.estimatedMonthlyCost)
    : "No calculado";
  const resultContext = result
    ? `Datos usados: ${formatGuaranies(input.distanceKm)} km · ${formatGuaranies(
        input.consumptionPer100Km
      )} L/100km · ${formatCurrency(input.pricePerLiter)}/L`
    : undefined;

  function resetCopyState() {
    setCopyState("idle");
  }

  function handleClear() {
    setDistanceKmText("");
    setConsumptionPer100KmText("");
    setPricePerLiterText("");
    setTripsPerMonthText("");
    resetCopyState();
  }

  async function handleCopy() {
    if (!result || !statusCopy) {
      return;
    }

    const text = [
      combustibleMetadata.title,
      `Costo estimado: ${formatCurrency(result.estimatedCost)}`,
      `Estado: ${statusCopy.label}`,
      `Distancia: ${formatGuaranies(input.distanceKm)} km`,
      `Consumo del vehículo: ${formatGuaranies(
        input.consumptionPer100Km
      )} L/100km`,
      `Litros estimados: ${formatLiters(result.estimatedLiters)}`,
      `Precio por litro: ${formatCurrency(input.pricePerLiter)}`,
      `Viajes al mes: ${formatGuaranies(input.tripsPerMonth)}`,
      `Costo mensual estimado: ${monthlyCostValue}`,
      "Resultado orientativo según los datos ingresados."
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="calculator-shell">
      <div className="calculator-main-grid calculator-main-grid--equal calculator-main-grid--combustible">
        <div className="calculator-form calculator-panel">
          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Datos principales</p>
            <div className="field-group">
              <label htmlFor="combustible-distance">Distancia</label>
              <div className="unit-input">
                <input
                  id="combustible-distance"
                  inputMode="decimal"
                  placeholder="100"
                  type="text"
                  value={distanceKmText}
                  onChange={(event) => {
                    setDistanceKmText(event.target.value);
                    resetCopyState();
                  }}
                  aria-describedby="combustible-distance-error"
                  aria-invalid={Boolean(validationErrors.distanceKm)}
                />
                <span aria-hidden="true">km</span>
              </div>
              <ValidationMessage
                id="combustible-distance-error"
                message={validationErrors.distanceKm}
              />
            </div>
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Datos técnicos</p>
            <div className="calculator-control-group">
              <div className="calculator-form-row">
                <div className="field-group">
                  <label htmlFor="combustible-consumption">
                    Consumo del vehículo
                  </label>
                  <div className="unit-input">
                    <input
                      id="combustible-consumption"
                      inputMode="decimal"
                      placeholder="8"
                      type="text"
                      value={consumptionPer100KmText}
                      onChange={(event) => {
                        setConsumptionPer100KmText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="combustible-consumption-help combustible-consumption-error"
                      aria-invalid={Boolean(
                        validationErrors.consumptionPer100Km
                      )}
                    />
                    <span aria-hidden="true">L/100km</span>
                  </div>
                  <p className="field-help" id="combustible-consumption-help">
                    Litros cada 100 km.
                  </p>
                  <ValidationMessage
                    id="combustible-consumption-error"
                    message={validationErrors.consumptionPer100Km}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="combustible-price">Precio por litro</label>
                  <div className="money-input">
                    <span aria-hidden="true">Gs.</span>
                    <input
                      id="combustible-price"
                      inputMode="decimal"
                      placeholder="7.500"
                      type="text"
                      value={pricePerLiterText}
                      onChange={(event) => {
                        setPricePerLiterText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="combustible-price-error"
                      aria-invalid={Boolean(validationErrors.pricePerLiter)}
                    />
                  </div>
                  <ValidationMessage
                    id="combustible-price-error"
                    message={validationErrors.pricePerLiter}
                  />
                  <p className="field-help">Precio cargado por litro.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Opcional</p>
            <div className="field-group">
              <label htmlFor="combustible-trips">Viajes al mes</label>
              <div className="unit-input">
                <input
                  id="combustible-trips"
                  inputMode="decimal"
                  placeholder="Opcional"
                  type="text"
                  value={tripsPerMonthText}
                  onChange={(event) => {
                    setTripsPerMonthText(event.target.value);
                    resetCopyState();
                  }}
                  aria-describedby="combustible-trips-help combustible-trips-error"
                  aria-invalid={Boolean(validationErrors.tripsPerMonth)}
                />
                <span aria-hidden="true">viajes</span>
              </div>
              <p className="field-help" id="combustible-trips-help">
                Dejá vacío si solo querés estimar un viaje.
              </p>
              <ValidationMessage
                id="combustible-trips-error"
                message={validationErrors.tripsPerMonth}
              />
            </div>
          </div>

          <div className="calculator-form-footer">
            <div className="calculator-actions">
              <button
                className="button button--ghost"
                type="button"
                onClick={handleClear}
              >
                <RotateCcw size={16} aria-hidden="true" />
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <ResultCard
          actions={
            <>
              <button
                className="button button--primary"
                type="button"
                onClick={handleCopy}
                disabled={!result || !statusCopy}
              >
                <Copy size={16} aria-hidden="true" />
                Copiar resultado
              </button>
              {copyState === "copied" ? (
                <span className="action-feedback">Resultado copiado.</span>
              ) : null}
              {copyState === "failed" ? (
                <span className="field-error">
                  No se pudo copiar automáticamente.
                </span>
              ) : null}
              <p className="result-card__formula">
                Fórmula aplicada: litros = distancia × consumo / 100
                <span>
                  Costo = litros × precio por litro · mensual = costo × viajes
                </span>
              </p>
            </>
          }
          title="Costo estimado"
          result={formatCurrency(displayResult.estimatedCost)}
          context={resultContext}
          helper={
            statusCopy?.helper ??
            "Resultado orientativo según los datos ingresados."
          }
          rows={[
            {
              label: "Litros estimados",
              value: formatLiters(displayResult.estimatedLiters)
            },
            {
              label: "Costo estimado",
              value: formatCurrency(displayResult.estimatedCost)
            },
            {
              label: "Costo mensual estimado",
              value: monthlyCostValue
            }
          ]}
        />
      </div>

      <CalculatorSupportGrid>
        <details className="calculator-details">
          <summary>Ver ejemplo</summary>
          <div className="calculator-details__body">
            <ul className="calculator-example-lines">
              {combustibleExamples.map((example) => (
                <li key={example.title}>
                  <strong>{example.title}:</strong> {example.description}
                </li>
              ))}
            </ul>
          </div>
        </details>

        <details className="calculator-details">
          <summary>Base de cálculo</summary>
          <div className="calculator-details__body">
            <ul className="calculator-source-list">
              {combustibleSources.map((source) => (
                <li key={source.name}>
                  <strong>{source.name}</strong>
                  <span> — {source.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <CalculatorSupportNote>
          <p className="calculator-disclaimer-note">
            Cálculo orientativo; el consumo real puede variar por tráfico,
            carga, manejo, ruta y estado del vehículo.{" "}
            <Link className="inline-link" to="/contacto">
              Reportar error
            </Link>
            .
          </p>
        </CalculatorSupportNote>
      </CalculatorSupportGrid>
    </div>
  );
}
