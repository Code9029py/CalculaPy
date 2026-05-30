import { useMemo, useState } from "react";

import { DisclaimerBox } from "../../components/calculator/DisclaimerBox";
import { FormulaBox } from "../../components/calculator/FormulaBox";
import { ResultCard } from "../../components/calculator/ResultCard";
import { SourceBox } from "../../components/calculator/SourceBox";
import { ValidationMessage } from "../../components/calculator/ValidationMessage";
import { globalDisclaimer } from "../../data/legalNotices";
import { formatCurrency } from "../../utils/formatters";
import { ivaExamples } from "./examples";
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

  return (
    <>
      <div className="calculator-form">
        <div className="field-group">
          <label htmlFor="iva-amount">Monto</label>
          <input
            id="iva-amount"
            inputMode="decimal"
            placeholder="Ej. 100000"
            type="text"
            value={amountText}
            onChange={(event) => {
              setAmountText(event.target.value);
              setCopyState("idle");
            }}
            aria-describedby="iva-amount-help iva-amount-error"
            aria-invalid={Boolean(validationErrors.amount)}
          />
          <p className="field-help" id="iva-amount-help">
            Podes escribir 100000, 100.000 o 100000,50.
          </p>
          <ValidationMessage
            message={validationErrors.amount}
          />
        </div>

        <fieldset className="segmented-field">
          <legend>Operacion</legend>
          <label>
            <input
              checked={mode === "add"}
              name="iva-mode"
              type="radio"
              onChange={() => setMode("add")}
            />
            Agregar IVA
          </label>
          <label>
            <input
              checked={mode === "included"}
              name="iva-mode"
              type="radio"
              onChange={() => setMode("included")}
            />
            Separar IVA incluido
          </label>
        </fieldset>

        <fieldset className="segmented-field">
          <legend>Tasa</legend>
          <label>
            <input
              checked={rate === 10}
              name="iva-rate"
              type="radio"
              onChange={() => setRate(10)}
            />
            10%
          </label>
          <label>
            <input
              checked={rate === 5}
              name="iva-rate"
              type="radio"
              onChange={() => setRate(5)}
            />
            5%
          </label>
        </fieldset>

        <div className="calculator-actions">
          <button
            className="button button--primary"
            disabled={!result}
            type="button"
            onClick={handleCopy}
          >
            Copiar resultado
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={handleClear}
          >
            Limpiar
          </button>
        </div>
        {copyState === "copied" ? (
          <p className="action-feedback">Resultado copiado.</p>
        ) : null}
        {copyState === "failed" ? (
          <p className="field-error">
            No se pudo copiar automaticamente. Podes seleccionar el resultado.
          </p>
        ) : null}
      </div>

      {result ? (
        <ResultCard
          title={resultLabel}
          result={formatCurrency(resultValue)}
          helper="Resultado orientativo segun los datos ingresados."
          rows={[
            { label: "Monto neto", value: formatCurrency(result.netAmount) },
            { label: `IVA ${result.rate}%`, value: formatCurrency(result.ivaAmount) },
            { label: "Total con IVA", value: formatCurrency(result.grossAmount) }
          ]}
        />
      ) : null}

      <FormulaBox>
        {mode === "add" ? (
          <p>
            IVA = monto neto x tasa. Total con IVA = monto neto + IVA.
          </p>
        ) : (
          <p>
            Monto neto = monto con IVA / (1 + tasa). IVA = monto con IVA -
            monto neto.
          </p>
        )}
      </FormulaBox>

      <section className="info-box">
        <h2>Ejemplo practico</h2>
        <div className="example-list">
          {ivaExamples.map((example) => (
            <article key={example.title}>
              <h3>{example.title}</h3>
              <p>{example.input}</p>
              <strong>{example.output}</strong>
            </article>
          ))}
        </div>
      </section>

      <SourceBox
        sources={ivaSources}
        lastReviewedAt={ivaMetadata.lastReviewedAt}
      />

      <DisclaimerBox>{globalDisclaimer}</DisclaimerBox>
    </>
  );
}
