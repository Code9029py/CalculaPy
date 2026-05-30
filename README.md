# CalculaPy

Portal de calculadoras utiles y orientativas para Paraguay.

La regla madre del proyecto es: util, claro, honesto y verificable. Cada
calculadora publicada debe mostrar formula, fuentes, fecha de revision y aviso
de alcance.

## Alcance V1

- Frontend React + Vite + TypeScript.
- Arquitectura modular por calculadora.
- Paginas institucionales: metodologia, fuentes, aviso importante, privacidad y
  contacto.
- Indice `/calculadoras` basado en metadata.
- Primera calculadora publicada: IVA Paraguay.
- Sin backend en V1.
- Sin calculadoras de alto riesgo en esta base inicial.

## Comandos

```bash
npm install
npm run dev
npm run build
npm test -- --run
```

## Estructura base

```txt
src/
  calculators/
    iva/
      formula.ts
      validators.ts
      metadata.ts
      sources.ts
      examples.ts
      IvaCalculator.tsx
      iva.test.ts
  components/
    calculator/
    layout/
  data/
  pages/
  utils/
```

## Criterios por calculadora

- Titulo y descripcion claros.
- Metadata para listado y SEO.
- Formula pura separada de la UI.
- Validaciones explicitas.
- Resultado principal legible y desglose.
- Formula, ejemplo, fuentes y fecha de revision visibles.
- Aviso orientativo sin prometer exactitud absoluta.
- Pruebas para casos conocidos y limites relevantes.
