import { ivaMetadata } from "./iva/metadata";
import type { CalculatorMetadata } from "./types";

export const calculatorRegistry: CalculatorMetadata[] = [ivaMetadata];

export function getCalculatorPath(calculator: CalculatorMetadata) {
  return `/calculadoras/${calculator.slug}`;
}
