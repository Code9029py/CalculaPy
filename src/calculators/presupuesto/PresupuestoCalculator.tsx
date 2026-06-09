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
import { presupuestoExamples } from "./examples";
import { calculatePresupuesto } from "./formula";
import { presupuestoMetadata } from "./metadata";
import { presupuestoSources } from "./sources";
import type { PresupuestoResult } from "./types";
import {
  hasValidationErrors,
  parseAmount,
  parseOptionalAmount,
  validatePresupuestoInput
} from "./validators";

const defaultValues = {
  monthlyIncome: "3000000",
  fixedExpenses: "1500000",
  variableExpenses: "800000",
  desiredSavings: "300000"
};

function formatPercentage(value: number) {
  return `${new Intl.NumberFormat("es-PY", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2
  }).format(value)}%`;
}

function getStatusCopy(status: PresupuestoResult["status"]) {
  if (status === "negative") {
    return {
      label: "Presupuesto negativo",
      helper: "Los gastos superan los ingresos mensuales ingresados."
    };
  }

  if (status === "healthy") {
    return {
      label: "Presupuesto saludable",
      helper: "Los gastos usan 70% o menos del ingreso mensual."
    };
  }

  if (status === "tight") {
    return {
      label: "Presupuesto ajustado",
      helper: "Tus gastos ocupan entre el 70% y el 90% de tus ingresos."
    };
  }

  return {
    label: "Margen muy bajo",
    helper: "Los gastos usan más del 90% del ingreso mensual."
  };
}

export function PresupuestoCalculator() {
  const [monthlyIncomeText, setMonthlyIncomeText] = useState(
    defaultValues.monthlyIncome
  );
  const [fixedExpensesText, setFixedExpensesText] = useState(
    defaultValues.fixedExpenses
  );
  const [variableExpensesText, setVariableExpensesText] = useState(
    defaultValues.variableExpenses
  );
  const [desiredSavingsText, setDesiredSavingsText] = useState(
    defaultValues.desiredSavings
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const input = useMemo(
    () => ({
      monthlyIncome: parseAmount(monthlyIncomeText),
      fixedExpenses: parseAmount(fixedExpensesText, 0),
      variableExpenses: parseAmount(variableExpensesText, 0),
      desiredSavings: parseOptionalAmount(desiredSavingsText)
    }),
    [
      desiredSavingsText,
      fixedExpensesText,
      monthlyIncomeText,
      variableExpensesText
    ]
  );

  const validationErrors = validatePresupuestoInput(input);
  const canCalculate = !hasValidationErrors(validationErrors);
  const result = canCalculate ? calculatePresupuesto(input) : null;
  const savingsWarning =
    result && result.balanceAfterSavings < 0
      ? "El ahorro objetivo supera el saldo disponible."
      : null;
  const displayResult =
    result ??
    ({
      totalExpenses: 0,
      availableBalance: 0,
      balanceAfterSavings: 0,
      incomeUsagePercentage: 0,
      desiredSavingsPercentage: 0,
      status: "healthy" as const
    });
  const statusCopy = result ? getStatusCopy(result.status) : null;
  const savingsRows =
    result && input.desiredSavings > 0
      ? [
          {
            label: "Ahorro objetivo",
            value: formatCurrency(input.desiredSavings)
          },
          {
            label: "Saldo luego de ahorro",
            value: formatCurrency(result.balanceAfterSavings)
          }
        ]
      : undefined;

  function resetCopyState() {
    setCopyState("idle");
  }

  function handleClear() {
    setMonthlyIncomeText("");
    setFixedExpensesText("");
    setVariableExpensesText("");
    setDesiredSavingsText("");
    resetCopyState();
  }

  async function handleCopy() {
    if (!result || !statusCopy) {
      return;
    }

    const text = [
      presupuestoMetadata.title,
      `Saldo disponible: ${formatCurrency(result.availableBalance)}`,
      `Estado: ${statusCopy.label}`,
      `Ingresos mensuales: ${formatCurrency(input.monthlyIncome)}`,
      `Total de gastos: ${formatCurrency(result.totalExpenses)}`,
      `Saldo luego de ahorro: ${formatCurrency(result.balanceAfterSavings)}`,
      `Gastos sobre ingreso: ${formatPercentage(
        result.incomeUsagePercentage
      )}`,
      savingsWarning,
      "Resultado orientativo según los datos ingresados."
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <div className="calculator-shell">
      <div className="calculator-main-grid calculator-main-grid--equal calculator-main-grid--presupuesto">
        <div className="calculator-form calculator-panel">
          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Datos principales</p>
            <div className="field-group">
              <label htmlFor="presupuesto-income">Ingresos mensuales</label>
              <div className="money-input">
                <span aria-hidden="true">Gs.</span>
                <input
                  id="presupuesto-income"
                  inputMode="decimal"
                  placeholder="3.000.000"
                  type="text"
                  value={monthlyIncomeText}
                  onChange={(event) => {
                    setMonthlyIncomeText(event.target.value);
                    resetCopyState();
                  }}
                  aria-describedby="presupuesto-income-error"
                  aria-invalid={Boolean(validationErrors.monthlyIncome)}
                />
              </div>
              <ValidationMessage
                id="presupuesto-income-error"
                message={validationErrors.monthlyIncome}
              />
            </div>
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Gastos</p>
            <div className="calculator-control-group">
              <div className="calculator-form-row">
                <div className="field-group">
                  <label htmlFor="presupuesto-fixed">Gastos fijos</label>
                  <div className="money-input">
                    <span aria-hidden="true">Gs.</span>
                    <input
                      id="presupuesto-fixed"
                      inputMode="decimal"
                      placeholder="1.500.000"
                      type="text"
                      value={fixedExpensesText}
                      onChange={(event) => {
                        setFixedExpensesText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="presupuesto-fixed-error"
                      aria-invalid={Boolean(validationErrors.fixedExpenses)}
                    />
                  </div>
                  <ValidationMessage
                    id="presupuesto-fixed-error"
                    message={validationErrors.fixedExpenses}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="presupuesto-variable">
                    Gastos variables
                  </label>
                  <div className="money-input">
                    <span aria-hidden="true">Gs.</span>
                    <input
                      id="presupuesto-variable"
                      inputMode="decimal"
                      placeholder="800.000"
                      type="text"
                      value={variableExpensesText}
                      onChange={(event) => {
                        setVariableExpensesText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="presupuesto-variable-error"
                      aria-invalid={Boolean(validationErrors.variableExpenses)}
                    />
                  </div>
                  <ValidationMessage
                    id="presupuesto-variable-error"
                    message={validationErrors.variableExpenses}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Opcional</p>
            <div className="field-group">
              <label htmlFor="presupuesto-savings">Ahorro objetivo</label>
              <div className="money-input">
                <span aria-hidden="true">Gs.</span>
                <input
                  id="presupuesto-savings"
                  inputMode="decimal"
                  placeholder="300.000"
                  type="text"
                  value={desiredSavingsText}
                  onChange={(event) => {
                    setDesiredSavingsText(event.target.value);
                    resetCopyState();
                  }}
                  aria-describedby="presupuesto-savings-help presupuesto-savings-error"
                  aria-invalid={Boolean(validationErrors.desiredSavings)}
                />
              </div>
              <p className="field-help" id="presupuesto-savings-help">
                Dejá vacío si no querés incluir ahorro.
              </p>
              <ValidationMessage
                id="presupuesto-savings-error"
                message={validationErrors.desiredSavings}
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
                Fórmula aplicada: gastos = fijos + variables · saldo = ingresos
                - gastos
                {savingsWarning ? <span>{savingsWarning}</span> : null}
              </p>
            </>
          }
          title="Saldo disponible"
          result={formatCurrency(displayResult.availableBalance)}
          helper={
            statusCopy?.helper ??
            "Resultado orientativo según los datos ingresados."
          }
          rows={[
            {
              label: "Estado",
              value: statusCopy?.label ?? "Pendiente de datos válidos"
            },
            {
              label: "Ingresos mensuales",
              value: formatCurrency(result ? input.monthlyIncome : 0)
            },
            {
              label: "Total de gastos",
              value: formatCurrency(displayResult.totalExpenses)
            },
            {
              label: "Saldo disponible",
              value: formatCurrency(displayResult.availableBalance)
            },
            {
              label: "Gastos sobre ingreso",
              value: formatPercentage(displayResult.incomeUsagePercentage)
            }
          ]}
          secondaryRows={savingsRows}
          secondaryTitle="Ahorro objetivo"
        />
      </div>

      <CalculatorSupportGrid>
        <details className="calculator-details">
          <summary>Ver ejemplo</summary>
          <div className="calculator-details__body">
            <ul className="calculator-example-lines">
              {presupuestoExamples.map((example) => (
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
              {presupuestoSources.map((source) => (
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
            Cálculo orientativo; no reemplaza planificación financiera
            profesional.{" "}
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
