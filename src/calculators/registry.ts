import { combustibleMetadata } from "./combustible/metadata";
import { cuotasMetadata } from "./cuotas/metadata";
import { importacionMetadata } from "./importacion/metadata";
import { ivaMetadata } from "./iva/metadata";
import { presupuestoMetadata } from "./presupuesto/metadata";
import type { CalculatorMetadata } from "./types";

export const calculatorRegistry: CalculatorMetadata[] = [
  ivaMetadata,
  cuotasMetadata,
  presupuestoMetadata,
  combustibleMetadata,
  importacionMetadata
];

export function getCalculatorPath(calculator: CalculatorMetadata) {
  return `/calculadoras/${calculator.slug}`;
}
