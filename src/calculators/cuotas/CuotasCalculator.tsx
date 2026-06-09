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
import { cuotasExamples } from "./examples";
import { calculateCuotas } from "./formula";
import { cuotasMetadata } from "./metadata";
import { cuotasSources } from "./sources";
import {
  hasValidationErrors,
  parseAmount,
  parseInstallmentsCount,
  parseOptionalAmount,
  validateCuotasInput
} from "./validators";

const defaultValues = {
  cashPrice: "1000000",
  initialPayment: "",
  installmentsCount: "12",
  installmentAmount: "100000",
  administrativeCost: ""
};

function formatPercentage(value: number) {
  return `${new Intl.NumberFormat("es-PY", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2
  }).format(value)}%`;
}

function getStatusCopy(result: {
  difference: number;
  overcostPercentage: number;
  status: "over" | "equal" | "under";
}) {
  if (result.status === "over") {
    return {
      label: "Pagás más que al contado",
      helper: `Pagás ${formatCurrency(
        result.difference
      )} más que al contado (${formatPercentage(
        result.overcostPercentage
      )} de sobrecosto).`
    };
  }

  if (result.status === "equal") {
    return {
      label: "No hay sobrecosto",
      helper: "El total pagado coincide con el precio contado ingresado."
    };
  }

  return {
    label: "Pagás menos que al contado",
    helper: `Pagás ${formatCurrency(
      Math.abs(result.difference)
    )} menos que al contado. Revisá si es promoción o si los datos son correctos.`
  };
}

export function CuotasCalculator() {
  const [cashPriceText, setCashPriceText] = useState(defaultValues.cashPrice);
  const [initialPaymentText, setInitialPaymentText] = useState(
    defaultValues.initialPayment
  );
  const [installmentsCountText, setInstallmentsCountText] = useState(
    defaultValues.installmentsCount
  );
  const [installmentAmountText, setInstallmentAmountText] = useState(
    defaultValues.installmentAmount
  );
  const [administrativeCostText, setAdministrativeCostText] = useState(
    defaultValues.administrativeCost
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const input = useMemo(
    () => ({
      cashPrice: parseAmount(cashPriceText),
      initialPayment: parseOptionalAmount(initialPaymentText),
      installmentsCount: parseInstallmentsCount(installmentsCountText),
      installmentAmount: parseAmount(installmentAmountText),
      administrativeCost: parseOptionalAmount(administrativeCostText)
    }),
    [
      administrativeCostText,
      cashPriceText,
      initialPaymentText,
      installmentAmountText,
      installmentsCountText
    ]
  );

  const validationErrors = validateCuotasInput(input);
  const canCalculate = !hasValidationErrors(validationErrors);
  const result = canCalculate ? calculateCuotas(input) : null;
  const displayResult =
    result ??
    ({
      totalFinanced: 0,
      totalPaid: 0,
      difference: 0,
      overcostPercentage: 0,
      status: "equal" as const
    });
  const statusCopy = result ? getStatusCopy(result) : null;

  function resetCopyState() {
    setCopyState("idle");
  }

  function handleClear() {
    setCashPriceText("");
    setInitialPaymentText("");
    setInstallmentsCountText("");
    setInstallmentAmountText("");
    setAdministrativeCostText("");
    resetCopyState();
  }

  async function handleCopy() {
    if (!result || !statusCopy) {
      return;
    }

    const text = [
      cuotasMetadata.title,
      `Total pagado: ${formatCurrency(result.totalPaid)}`,
      `Estado: ${statusCopy.label}`,
      `Precio contado: ${formatCurrency(input.cashPrice)}`,
      `Total financiado: ${formatCurrency(result.totalFinanced)}`,
      `Diferencia: ${formatCurrency(result.difference)}`,
      `Sobrecosto: ${formatPercentage(result.overcostPercentage)}`,
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
      <div className="calculator-main-grid calculator-main-grid--equal calculator-main-grid--cuotas">
        <div className="calculator-form calculator-panel">
          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Datos principales</p>
            <div className="field-group">
              <label htmlFor="cuotas-cash-price">Precio contado</label>
              <div className="money-input">
                <span aria-hidden="true">Gs.</span>
                <input
                  id="cuotas-cash-price"
                  inputMode="decimal"
                  placeholder="1.000.000"
                  type="text"
                  value={cashPriceText}
                  onChange={(event) => {
                    setCashPriceText(event.target.value);
                    resetCopyState();
                  }}
                  aria-describedby="cuotas-cash-price-error"
                  aria-invalid={Boolean(validationErrors.cashPrice)}
                />
              </div>
              <ValidationMessage
                id="cuotas-cash-price-error"
                message={validationErrors.cashPrice}
              />
            </div>
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Financiación</p>
            <div className="calculator-control-group">
              <div className="calculator-form-row">
                <div className="field-group">
                  <label htmlFor="cuotas-count">Cantidad de cuotas</label>
                  <input
                    id="cuotas-count"
                    className="plain-input"
                    inputMode="numeric"
                    placeholder="12"
                    type="text"
                    value={installmentsCountText}
                    onChange={(event) => {
                      setInstallmentsCountText(event.target.value);
                      resetCopyState();
                    }}
                    aria-describedby="cuotas-count-error"
                    aria-invalid={Boolean(validationErrors.installmentsCount)}
                  />
                  <ValidationMessage
                    id="cuotas-count-error"
                    message={validationErrors.installmentsCount}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="cuotas-installment-amount">
                    Monto de cada cuota
                  </label>
                  <div className="money-input">
                    <span aria-hidden="true">Gs.</span>
                    <input
                      id="cuotas-installment-amount"
                      inputMode="decimal"
                      placeholder="100.000"
                      type="text"
                      value={installmentAmountText}
                      onChange={(event) => {
                        setInstallmentAmountText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="cuotas-installment-amount-error"
                      aria-invalid={Boolean(validationErrors.installmentAmount)}
                    />
                  </div>
                  <ValidationMessage
                    id="cuotas-installment-amount-error"
                    message={validationErrors.installmentAmount}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="calculator-form-section">
            <p className="calculator-form-section__title">Opcionales</p>
            <div className="calculator-control-group">
              <div className="calculator-form-row">
                <div className="field-group">
                  <label htmlFor="cuotas-initial-payment">Entrega inicial</label>
                  <div className="money-input">
                    <span aria-hidden="true">Gs.</span>
                    <input
                      id="cuotas-initial-payment"
                      inputMode="decimal"
                      placeholder="Opcional"
                      type="text"
                      value={initialPaymentText}
                      onChange={(event) => {
                        setInitialPaymentText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="cuotas-initial-payment-error"
                      aria-invalid={Boolean(validationErrors.initialPayment)}
                    />
                  </div>
                  <p className="field-help">Dejá vacío si no aplica.</p>
                  <ValidationMessage
                    id="cuotas-initial-payment-error"
                    message={validationErrors.initialPayment}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="cuotas-administrative-cost">
                    Costo administrativo
                  </label>
                  <div className="money-input">
                    <span aria-hidden="true">Gs.</span>
                    <input
                      id="cuotas-administrative-cost"
                      inputMode="decimal"
                      placeholder="Opcional"
                      type="text"
                      value={administrativeCostText}
                      onChange={(event) => {
                        setAdministrativeCostText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="cuotas-administrative-cost-help cuotas-administrative-cost-error"
                      aria-invalid={Boolean(validationErrors.administrativeCost)}
                    />
                  </div>
                  <p className="field-help" id="cuotas-administrative-cost-help">
                    Incluí solo cargos que conozcas.
                  </p>
                  <ValidationMessage
                    id="cuotas-administrative-cost-error"
                    message={validationErrors.administrativeCost}
                  />
                </div>
              </div>
            </div>
          </div>

          <ValidationMessage
            id="cuotas-total-paid-error"
            message={validationErrors.totalPaid}
          />

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
                Fórmula aplicada: Total pagado = entrega + cuotas × monto +
                costo
                <span>
                  Diferencia = total pagado - contado · Sobrecosto =
                  diferencia / contado × 100
                </span>
              </p>
            </>
          }
          title="Total pagado"
          result={formatCurrency(displayResult.totalPaid)}
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
              label: "Precio contado",
              value: formatCurrency(result ? input.cashPrice : 0)
            },
            {
              label: "Total financiado",
              value: formatCurrency(displayResult.totalFinanced)
            },
            {
              label: "Diferencia",
              value: formatCurrency(displayResult.difference)
            },
            {
              label: "Sobrecosto",
              value: formatPercentage(displayResult.overcostPercentage)
            }
          ]}
        />
      </div>

      <CalculatorSupportGrid>
        <details className="calculator-details">
          <summary>Ver ejemplo</summary>
          <div className="calculator-details__body">
            <ul className="calculator-example-lines">
              {cuotasExamples.map((example) => (
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
              {cuotasSources.map((source) => (
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
            Cálculo orientativo; no incluye cargos no ingresados.{" "}
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
