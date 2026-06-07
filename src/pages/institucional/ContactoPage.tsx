import { useState } from "react";

import { PageMeta } from "../../components/PageMeta";

type ContactType = "error" | "calculator" | "general";

type ContactField = {
  label: string;
  placeholder: string;
  type?: "input" | "textarea";
};

const contactOptions: Array<{ id: ContactType; label: string }> = [
  { id: "error", label: "Reportar error" },
  { id: "calculator", label: "Sugerir calculadora" },
  { id: "general", label: "Consulta general" }
];

const fieldsByType: Record<ContactType, ContactField[]> = {
  error: [
    {
      label: "Calculadora relacionada",
      placeholder: "Ejemplo: Calculadora de IVA",
      type: "input"
    },
    {
      label: "Datos ingresados",
      placeholder: "Monto, tasa, operación u otros datos relevantes"
    },
    {
      label: "Resultado mostrado y resultado esperado",
      placeholder: "Contanos qué mostró la calculadora y qué esperabas ver"
    },
    {
      label: "Mensaje adicional",
      placeholder: "Contexto adicional, fuente o enlace si corresponde"
    }
  ],
  calculator: [
    {
      label: "Nombre o idea",
      placeholder: "Ejemplo: calculadora de cuotas",
      type: "input"
    },
    {
      label: "Qué debería calcular",
      placeholder: "Describí el resultado esperado"
    },
    {
      label: "Caso de uso o utilidad",
      placeholder: "Explicá cuándo serviría y qué fuente o enlace revisar si aplica"
    }
  ],
  general: [
    {
      label: "Asunto",
      placeholder: "Tema de la consulta",
      type: "input"
    },
    {
      label: "Mensaje",
      placeholder: "Escribí tu consulta"
    }
  ]
};

export function ContactoPage() {
  const [contactType, setContactType] = useState<ContactType>("error");
  const [valuesByType, setValuesByType] = useState<
    Record<ContactType, Record<string, string>>
  >({ error: {}, calculator: {}, general: {} });

  const activeFields = fieldsByType[contactType];
  const currentValues = valuesByType[contactType];

  function updateField(label: string, value: string) {
    setValuesByType((previous) => ({
      ...previous,
      [contactType]: {
        ...previous[contactType],
        [label]: value
      }
    }));
  }

  return (
    <section className="page">
      <PageMeta
        title="Contacto y reportes | CalculaPy"
        description="Canal de contacto y reporte de errores para CalculaPy."
      />
      <div className="page__content">
        <div className="contact-hero">
          <div className="contact-hero__content">
            <p className="eyebrow">Soporte</p>
            <h1 className="contact-hero__title">Contacto</h1>
            <p className="contact-hero__description">
              Reportá errores, sugerí nuevas calculadoras o enviá una consulta
              general.
            </p>
            <p className="contact-hero__description">
              Completá los datos para preparar el reporte cuando el envío esté
              disponible.
            </p>
          </div>
        </div>

        <div className="contact-tabs" aria-label="Tipo de contacto">
          {contactOptions.map((option) => (
            <button
              aria-pressed={contactType === option.id}
              className="contact-tab"
              key={option.id}
              type="button"
              onClick={() => setContactType(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <form
          className="contact-form"
          aria-label="Plantilla de contacto"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="contact-form__grid">
            {activeFields.map((field) => (
              <label
                className={
                  field.type === "input"
                    ? "form-field"
                    : "form-field form-field--wide"
                }
                key={field.label}
              >
                <span>{field.label}</span>
                {field.type === "input" ? (
                  <input
                    placeholder={field.placeholder}
                    value={currentValues[field.label] ?? ""}
                    onChange={(event) =>
                      updateField(field.label, event.target.value)
                    }
                  />
                ) : (
                  <textarea
                    placeholder={field.placeholder}
                    value={currentValues[field.label] ?? ""}
                    onChange={(event) =>
                      updateField(field.label, event.target.value)
                    }
                  />
                )}
              </label>
            ))}
          </div>

          <div className="contact-form__actions">
            <button className="button button--primary" disabled type="button">
              Envío no disponible
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
