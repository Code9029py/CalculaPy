export type IvaRate = 5 | 10;

export type IvaMode = "add" | "included";

export type IvaInput = {
  amount: number;
  rate: IvaRate;
  mode: IvaMode;
};

export type IvaResult = {
  netAmount: number;
  ivaAmount: number;
  grossAmount: number;
  rate: IvaRate;
  mode: IvaMode;
};
