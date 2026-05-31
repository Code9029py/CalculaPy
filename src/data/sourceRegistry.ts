export type SourceRegistryItem = {
  name: string;
  scope: string;
  type: "fuente oficial" | "formula general" | "dato ingresado";
  url?: string;
};

export const sourceRegistry: SourceRegistryItem[] = [
  {
    name: "DNIT",
    scope: "IVA y tasas 5% y 10%",
    type: "fuente oficial",
    url: "https://www.dnit.gov.py/"
  }
];
