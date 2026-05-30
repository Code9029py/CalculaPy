export function formatGuaranies(value: number) {
  return new Intl.NumberFormat("es-PY", {
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2
  }).format(value);
}

export function formatCurrency(value: number) {
  return `Gs. ${formatGuaranies(value)}`;
}
