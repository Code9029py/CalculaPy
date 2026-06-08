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
import { importacionExamples } from "./examples";
import { calculateImportacion } from "./formula";
import { importacionMetadata } from "./metadata";
import { importacionSources } from "./sources";
import type { ImportacionStatus } from "./types";
import {
  hasValidationErrors,
  parseAmount,
  parseOptionalAmount,
  validateImportacionInput
} from "./validators";

const defaultValues = {
  productPriceUsd: "100",
  shippingUsd: "20",
  exchangeRate: "7500",
  estimatedChargesPercentage: "10",
  fixedChargeGs: ""
};

function formatUsd(value: number) {
  return `USD ${new Intl.NumberFormat("es-PY", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value)}`;
}

function formatPercentage(value: number) {
  return `${formatGuaranies(value)}%`;
}

function getStatusCopy(status: ImportacionStatus) {
  if (status === "with-charges") {
    return {
      label: "Incluye cargos estimados",
      helper: "El total suma los cargos estimados que cargaste."
    };
  }

  return {
    label: "Solo producto, envío y tipo de cambio",
    helper: "No se agregaron cargos estimados al subtotal convertido."
  };
}

export function ImportacionCalculator() {
  const [productPriceUsdText, setProductPriceUsdText] = useState(
    defaultValues.productPriceUsd
  );
  const [shippingUsdText, setShippingUsdText] = useState(
    defaultValues.shippingUsd
  );
  const [exchangeRateText, setExchangeRateText] = useState(
    defaultValues.exchangeRate
  );
  const [estimatedChargesPercentageText, setEstimatedChargesPercentageText] =
    useState(defaultValues.estimatedChargesPercentage);
  const [fixedChargeGsText, setFixedChargeGsText] = useState(
    defaultValues.fixedChargeGs
  );
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const input = useMemo(
    () => ({
      productPriceUsd: parseAmount(productPriceUsdText),
      shippingUsd: parseOptionalAmount(shippingUsdText),
      exchangeRate: parseAmount(exchangeRateText),
      estimatedChargesPercentage: parseOptionalAmount(
        estimatedChargesPercentageText
      ),
      fixedChargeGs: parseOptionalAmount(fixedChargeGsText)
    }),
    [
      estimatedChargesPercentageText,
      exchangeRateText,
      fixedChargeGsText,
      productPriceUsdText,
      shippingUsdText
    ]
  );

  const validationErrors = validateImportacionInput(input);
  const canCalculate = !hasValidationErrors(validationErrors);
  const result = canCalculate ? calculateImportacion(input) : null;
  const displayResult =
    result ??
    ({
      subtotalUsd: 0,
      subtotalGs: 0,
      estimatedCharges: 0,
      totalEstimated: 0,
      status: "base-only" as const
    });
  const statusCopy = result ? getStatusCopy(result.status) : null;
  const resultContext = result
    ? `Datos usados: producto ${formatUsd(input.productPriceUsd)} + envío ${formatUsd(
        input.shippingUsd
      )} · ${formatCurrency(input.exchangeRate)}/USD`
    : undefined;

  function resetCopyState() {
    setCopyState("idle");
  }

  function handleClear() {
    setProductPriceUsdText("");
    setShippingUsdText("");
    setExchangeRateText("");
    setEstimatedChargesPercentageText("");
    setFixedChargeGsText("");
    resetCopyState();
  }

  async function handleCopy() {
    if (!result || !statusCopy) {
      return;
    }

    const text = [
      importacionMetadata.title,
      `Total estimado: ${formatCurrency(result.totalEstimated)}`,
      `Estado: ${statusCopy.label}`,
      `Precio del producto: ${formatUsd(input.productPriceUsd)}`,
      `Envío: ${formatUsd(input.shippingUsd)}`,
      `Subtotal USD: ${formatUsd(result.subtotalUsd)}`,
      `Tipo de cambio: ${formatCurrency(input.exchangeRate)} por USD`,
      `Subtotal en Gs.: ${formatCurrency(result.subtotalGs)}`,
      `Cargos estimados: ${formatCurrency(result.estimatedCharges)}`,
      `Cargo fijo: ${formatCurrency(input.fixedChargeGs)}`,
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
      <div className="calculator-main-grid calculator-main-grid--equal calculator-main-grid--importacion">
        <div className="calculator-form calculator-panel">
          <div className="calculator-form-section">
            <p className="calculator-form-section__title calculator-form-section__title--primary">
              Datos principales
            </p>
            <div className="calculator-form-section">
              <p className="calculator-form-section__title">Compra</p>
              <div className="calculator-control-group">
                <div className="calculator-form-row">
                  <div className="field-group">
                    <label htmlFor="importacion-product">
                      Precio del producto
                    </label>
                    <div className="unit-input">
                      <input
                        id="importacion-product"
                        inputMode="decimal"
                        placeholder="100"
                        type="text"
                        value={productPriceUsdText}
                        onChange={(event) => {
                          setProductPriceUsdText(event.target.value);
                          resetCopyState();
                        }}
                        aria-describedby="importacion-product-error"
                        aria-invalid={Boolean(validationErrors.productPriceUsd)}
                      />
                      <span aria-hidden="true">USD</span>
                    </div>
                    <ValidationMessage
                      id="importacion-product-error"
                      message={validationErrors.productPriceUsd}
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="importacion-shipping">Envío</label>
                    <div className="unit-input">
                      <input
                        id="importacion-shipping"
                        inputMode="decimal"
                        placeholder="20"
                        type="text"
                        value={shippingUsdText}
                        onChange={(event) => {
                          setShippingUsdText(event.target.value);
                          resetCopyState();
                        }}
                        aria-describedby="importacion-shipping-error"
                        aria-invalid={Boolean(validationErrors.shippingUsd)}
                      />
                      <span aria-hidden="true">USD</span>
                    </div>
                    <ValidationMessage
                      id="importacion-shipping-error"
                      message={validationErrors.shippingUsd}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="field-group">
              <label htmlFor="importacion-exchange">Tipo de cambio</label>
              <div className="money-input">
                <span aria-hidden="true">Gs.</span>
                <input
                  id="importacion-exchange"
                  inputMode="decimal"
                  placeholder="7.500"
                  type="text"
                  value={exchangeRateText}
                  onChange={(event) => {
                    setExchangeRateText(event.target.value);
                    resetCopyState();
                  }}
                  aria-describedby="importacion-exchange-help importacion-exchange-error"
                  aria-invalid={Boolean(validationErrors.exchangeRate)}
                />
              </div>
              <p className="field-help" id="importacion-exchange-help">
                Guaraníes por cada USD 1.
              </p>
              <ValidationMessage
                id="importacion-exchange-error"
                message={validationErrors.exchangeRate}
              />
            </div>
          </div>

          <div className="calculator-form-section calculator-form-section--optional">
            <p className="calculator-form-section__title">Cargos</p>
            <div className="calculator-control-group">
              <div className="calculator-form-row">
                <div className="field-group">
                  <label htmlFor="importacion-percentage">
                    % de cargos estimados
                  </label>
                  <div className="unit-input">
                    <input
                      id="importacion-percentage"
                      inputMode="decimal"
                      placeholder="10"
                      type="text"
                      value={estimatedChargesPercentageText}
                      onChange={(event) => {
                        setEstimatedChargesPercentageText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="importacion-percentage-error"
                      aria-invalid={Boolean(
                        validationErrors.estimatedChargesPercentage
                      )}
                    />
                    <span aria-hidden="true">%</span>
                  </div>
                  <ValidationMessage
                    id="importacion-percentage-error"
                    message={validationErrors.estimatedChargesPercentage}
                  />
                </div>

                <div className="field-group">
                  <label htmlFor="importacion-fixed">Cargo fijo</label>
                  <div className="money-input">
                    <span aria-hidden="true">Gs.</span>
                    <input
                      id="importacion-fixed"
                      inputMode="decimal"
                      placeholder="Opcional"
                      type="text"
                      value={fixedChargeGsText}
                      onChange={(event) => {
                        setFixedChargeGsText(event.target.value);
                        resetCopyState();
                      }}
                      aria-describedby="importacion-fixed-error"
                      aria-invalid={Boolean(validationErrors.fixedChargeGs)}
                    />
                  </div>
                  <ValidationMessage
                    id="importacion-fixed-error"
                    message={validationErrors.fixedChargeGs}
                  />
                </div>
              </div>
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
                Fórmula aplicada: total = (producto + envío) × tipo de cambio +
                cargos estimados + cargo fijo
              </p>
            </>
          }
          title="Total estimado"
          result={formatCurrency(displayResult.totalEstimated)}
          context={resultContext}
          helper={
            statusCopy?.helper ??
            "Resultado orientativo según los datos ingresados."
          }
          rows={[
            {
              label: "Subtotal USD",
              value: formatUsd(displayResult.subtotalUsd)
            },
            {
              label: "Subtotal en Gs.",
              value: formatCurrency(displayResult.subtotalGs)
            },
            {
              label: "Cargos estimados",
              value: `${formatCurrency(displayResult.estimatedCharges)} (${formatPercentage(
                result ? input.estimatedChargesPercentage : 0
              )})`
            },
            {
              label: "Cargo fijo",
              value: formatCurrency(result ? input.fixedChargeGs : 0)
            },
            {
              label: "Total estimado",
              value: formatCurrency(displayResult.totalEstimated)
            }
          ]}
        />
      </div>

      <CalculatorSupportGrid>
        <details className="calculator-details">
          <summary>Ver ejemplo</summary>
          <div className="calculator-details__body">
            <ul className="calculator-example-lines">
              {importacionExamples.map((example) => (
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
            <p>
              total = (producto + envío) × tipo de cambio + cargos estimados +
              cargo fijo
            </p>
            <ul className="calculator-source-list">
              {importacionSources.map((source) => (
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
            Cálculo orientativo; no reemplaza información de courier, aduana,
            tienda, banco ni entidad competente. Pueden existir cargos no
            ingresados.{" "}
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
