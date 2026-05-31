# CalcuPY

Portal de calculadoras útiles y orientativas para Paraguay.

La regla madre del proyecto es: útil, claro, honesto y verificable. Cada
calculadora publicada debe mostrar fórmula, fuentes, fecha de revisión y aviso
de alcance.

## Alcance V1

- Frontend React + Vite + TypeScript.
- Arquitectura modular por calculadora.
- Página de contacto con plantilla mailto.
- Índice `/calculadoras` basado en metadata.
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

- Título y descripción claros.
- Metadata para listado y SEO.
- Fórmula pura separada de la UI.
- Validaciones explícitas.
- Resultado principal legible y desglose.
- Fórmula, ejemplo, fuentes y fecha de revisión visibles.
- Aviso orientativo sin prometer exactitud absoluta.
- Pruebas para casos conocidos y límites relevantes.
