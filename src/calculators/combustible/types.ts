export type CombustibleInput = {
  distanceKm: number;
  consumptionPer100Km: number;
  pricePerLiter: number;
  tripsPerMonth: number;
};

export type CombustibleStatus = "trip" | "monthly";

export type CombustibleResult = {
  estimatedLiters: number;
  estimatedCost: number;
  estimatedMonthlyCost: number;
  status: CombustibleStatus;
};
