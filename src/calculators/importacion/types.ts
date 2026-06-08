export type ImportacionInput = {
  productPriceUsd: number;
  shippingUsd: number;
  exchangeRate: number;
  estimatedChargesPercentage: number;
  fixedChargeGs: number;
};

export type ImportacionStatus = "with-charges" | "base-only";

export type ImportacionResult = {
  subtotalUsd: number;
  subtotalGs: number;
  estimatedCharges: number;
  totalEstimated: number;
  status: ImportacionStatus;
};
