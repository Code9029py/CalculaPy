# Calculator UI Guidelines

Guia breve para mantener consistencia visual en calculadoras de CalculaPy.

## Estructura

- Usar `CalculatorLayout` para el header compacto de herramienta.
- Mantener el formulario a la izquierda y el resultado a la derecha en desktop.
- En mobile, el formulario va arriba, resultado despues y soporte inferior al final.
- Mantener soporte inferior vertical: Ver ejemplo, Fuente utilizada/Base de calculo, aviso orientativo con Reportar error.

## Formularios

- Usar `.calculator-form-section__title` para titulos de seccion como Datos principales, Financiacion, Gastos, Compra o Cargos.
- Usar labels de campo solo para campos concretos, con el tono suavizado global.
- Separar secciones principales con `.calculator-form-section--divided` u optional cuando haya mas de una unidad logica.
- Agrupar campos relacionados con `.calculator-control-group`; no crear nuevos tonos verdes por herramienta.

## Controles

- Todo input o selector debe tener borde visible siempre.
- Usar `money-input`, `unit-input` o `plain-input` segun corresponda.
- Los controles segmentados usan grupo verde suave; opcion activa blanca; opcion inactiva con el fondo del grupo y borde visible.
- El focus debe ser sobrio y compartido con el sistema global.

## Resultado

- Usar `ResultCard` y mostrar solo metricas clave en la tabla principal.
- Mover datos secundarios a contexto compacto o desglose secundario.
- Mantener el resultado principal grande, el boton Copiar resultado cerca del desglose y formula breve si no sobrecarga.

## Reglas de producto

- No cambiar formulas matematicas al hacer ajustes visuales.
- No prometer exactitud oficial; usar textos orientativos.
- No agregar fuentes oficiales o reglas legales si la herramienta no las modela.
- No cambiar rutas ni agregar calculadoras como parte de un ajuste visual.
