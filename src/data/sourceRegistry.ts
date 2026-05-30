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
  },
  {
    name: "MTESS",
    scope: "Referencias laborales para futuras calculadoras",
    type: "fuente oficial",
    url: "https://www.mtess.gov.py/"
  },
  {
    name: "IPS",
    scope: "Aportes del regimen general para futuras calculadoras",
    type: "fuente oficial",
    url: "https://portal.ips.gov.py/"
  },
  {
    name: "BCP",
    scope: "Cotizacion referencial de monedas para futuras calculadoras",
    type: "fuente oficial",
    url: "https://www.bcp.gov.py/"
  }
];
