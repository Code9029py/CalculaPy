import { useMemo, useState } from "react";

import { PageMeta } from "../../components/PageMeta";

const CONTACT_EMAIL = "contacto@calcupy.com";

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

const subjectsByType: Record<ContactType, string> = {
  error: "Error en una calculadora",
  calculator: "Sugerencia para CalcuPY",
  general: "Consulta general sobre CalcuPY"
};

const fieldsByType: Record<ContactType, ContactField[]> = {
  error: [
    {
      label: "Calculadora relacionada",
      placeholder: "Ejemplo: Calculadora de IVA Paraguay",
      type: "input"
    },
    {
      label: "Datos ingresados",
      placeholder: "Monto, tasa, operación u otros datos relevantes"
    },
    {
      label: "Resultado obtenido",
      placeholder: "Resultado que mostró CalcuPY"
    },
    {
      label: "Resultado esperado",
      placeholder: "Resultado que esperabas ver"
    },
    {
      label: "Mensaje adicional",
      placeholder: "Contexto adicional para entender el caso"
    }
  ],
  calculator: [
    {
      label: "Nombre o idea de calculadora",
      placeholder: "Ejemplo: calculadora de cuotas",
      type: "input"
    },
    {
      label: "Qué debería calcular",
      placeholder: "Describí el resultado esperado"
    },
    {
      label: "Por qué sería útil",
      placeholder: "Explicá el valor para usuarios en Paraguay"
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

function buildMailto(type: ContactType, values: Record<string, string>) {
  const subject = subjectsByType[type];
  const lines: string[] = [];

  for (const field of fieldsByType[type]) {
    const value = values[field.label]?.trim() ?? "";
    lines.push(`${field.label}:`);
    lines.push(value.length > 0 ? value : "—");
    lines.push("");
  }

  lines.push("—");
  lines.push("Enviado desde CalcuPY (plantilla de contacto).");

  const body = lines.join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export function ContactoPage() {
  const [contactType, setContactType] = useState<ContactType>("error");
  const [valuesByType, setValuesByType] = useState<
    Record<ContactType, Record<string, string>>
  >({ error: {}, calculator: {}, general: {} });

  const activeFields = fieldsByType[contactType];
  const currentValues = valuesByType[contactType];

  const mailtoHref = useMemo(
    () => buildMailto(contactType, currentValues),
    [contactType, currentValues]
  );

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
        title="Contacto y reportes | CalcuPY"
        description="Canal de contacto y reporte de errores para CalcuPY."
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
              Completá los datos y prepará el envío desde tu correo.
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
            <a className="button button--primary" href={mailtoHref}>
              Enviar
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
