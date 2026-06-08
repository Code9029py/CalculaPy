import { Copy, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  CalculatorSupportGrid,
  CalculatorSupportNote
} from "../../components/calculator/CalculatorSupportGrid";
import { ResultCard } from "../../components/calculator/ResultCard";
import { ValidationMessage } from "../../components/calculator/ValidationMessage";
import { formatCurrency } from "../../utils/formatters";
import { calculateIva } from "./formula";
import { ivaMetadata } from "./metadata";
import { ivaSources } from "./sources";
import type { IvaMode, IvaRate } from "./types";
import {
  hasValidationErrors,
  parseAmount,
  validateIvaInput
} from "./validators";

const defaultAmount = "100000";
export function IvaCalculator() {
  const [amountText, setAmountText] = useState(defaultAmount);
  const [rate, setRate] = useState<IvaRate>(10);
  const [mode, setMode] = useState<IvaMode>("add");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const amount = useMemo(() => parseAmount(amountText), [amountText]);
  const validationErrors = validateIvaInput({ amount, rate, mode });
  const canCalculate = !hasValidationErrors(validationErrors);
  const result = canCalculate ? calculateIva({ amount, rate, mode }) : null;
  const displayResult =
    result ??
    ({
      netAmount: 0,
      ivaAmount: 0,
      grossAmount: 0,
      rate,
      mode
    } as const);

  const resultLabel =
    mode === "add" ? "Total con IVA" : "Monto neto sin IVA";

  const resultValue = result
    ? mode === "add"
      ? result.grossAmount
      : result.netAmount
    : 0;

  function handleClear() {
    setAmountText("");
    setRate(10);
    setMode("add");
    setCopyState("idle");
  }

  async function handleCopy() {
    if (!result) {
      return;
    }

    const text = [
      `${ivaMetadata.title}`,
      `${resultLabel}: ${formatCurrency(resultValue)}`,
      `Monto neto: ${formatCurrency(result.netAmount)}`,
      `IVA ${result.rate}%: ${formatCurrency(result.ivaAmount)}`,
      `Total con IVA: ${formatCurrency(result.grossAmount)}`,
      "Resultado orientativo. Verificar fuentes y casos particulares."
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  const formulaText =
    mode === "add"
      ? "IVA = neto × tasa · Total = neto + IVA"
      : "Neto = total / (1 + tasa) · IVA = total - neto";
  const formulaNote = mode === "included" ? "total = monto con IVA" : null;
  const formulaLabel = `Fórmula aplicada: ${formulaText}`;

  return (
    <div className="calculator-shell">
      <div className="calculator-main-grid calculator-main-grid--equal calculator-main-grid--iva">
        <div className="calculator-form calculator-panel">
          <div className="field-group">
            <label htmlFor="iva-amount">Monto</label>
            <div className="money-input">
              <span aria-hidden="true">Gs.</span>
              <input
                id="iva-amount"
                inputMode="decimal"
                placeholder="100.000"
                type="text"
                value={amountText}
                onChange={(event) => {
                  setAmountText(event.target.value);
                  setCopyState("idle");
                }}
                aria-describedby="iva-amount-help iva-amount-error"
                aria-invalid={Boolean(validationErrors.amount)}
              />
            </div>
            <p className="field-help" id="iva-amount-help">
              Podés escribir 100000, 100.000 o 100000,50.
            </p>
            <ValidationMessage
              id="iva-amount-error"
              message={validationErrors.amount}
            />
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Operación</p>
            <fieldset className="segmented-field" aria-label="Operación">
              <legend className="visually-hidden">Operación</legend>
              <button
                aria-pressed={mode === "add"}
                className="segment-option"
                type="button"
                onClick={() => setMode("add")}
              >
                Agregar IVA
              </button>
              <button
                aria-pressed={mode === "included"}
                className="segment-option"
                type="button"
                onClick={() => setMode("included")}
              >
                Separar IVA incluido
              </button>
            </fieldset>
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Tasa</p>
            <fieldset className="segmented-field" aria-label="Tasa">
              <legend className="visually-hidden">Tasa</legend>
              <button
                aria-pressed={rate === 10}
                className="segment-option"
                type="button"
                onClick={() => setRate(10)}
              >
                10%
              </button>
              <button
                aria-pressed={rate === 5}
                className="segment-option"
                type="button"
                onClick={() => setRate(5)}
              >
                5%
              </button>
            </fieldset>
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
                disabled={!result}
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
                {formulaLabel}
                {formulaNote ? <span>{formulaNote}</span> : null}
              </p>
            </>
          }
          title={resultLabel}
          result={formatCurrency(resultValue)}
          helper="Resultado orientativo según los datos ingresados."
          rows={[
            {
              label: "Monto neto",
              value: formatCurrency(displayResult.netAmount)
            },
            {
              label: `IVA ${displayResult.rate}%`,
              value: formatCurrency(displayResult.ivaAmount)
            },
            {
              label: "Total con IVA",
              value: formatCurrency(displayResult.grossAmount)
            }
          ]}
        />
      </div>

      <CalculatorSupportGrid>
        <details className="calculator-details">
          <summary>Ver ejemplo</summary>
          <div className="calculator-details__body">
            <ul className="calculator-example-lines">
              <li>
                <strong>Agregar IVA 10%:</strong> 100.000 → Total 110.000 · IVA
                10.000
              </li>
              <li>
                <strong>Separar IVA 5%:</strong> 105.000 → Neto 100.000 · IVA
                5.000
              </li>
            </ul>
          </div>
        </details>

        <details className="calculator-details">
          <summary>Fuente utilizada</summary>
          <div className="calculator-details__body">
            <ul className="calculator-source-list">
              {ivaSources.map((source) => (
                <li key={source.name}>
                  {source.url ? (
                    <a href={source.url} rel="noreferrer" target="_blank">
                      {source.name}
                    </a>
                  ) : (
                    <strong>{source.name}</strong>
                  )}
                  <span> — {source.description}</span>
                </li>
              ))}
            </ul>
            <p className="calculator-details__meta">
              Verificado: {ivaMetadata.lastReviewedAt}
            </p>
          </div>
        </details>

        <CalculatorSupportNote>
          <p className="calculator-disclaimer-note">
            Resultado orientativo. Verificá fuentes oficiales antes de tomar
            decisiones relevantes.{" "}
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
