import { useState } from "react";

import { PageMeta } from "../../components/PageMeta";

type ContactType = "error" | "calculator" | "general";

type ContactField = {
  label: string;
  placeholder: string;
  type?: "input" | "textarea";
};

const contactOptions: Array<{
  id: ContactType;
  label: string;
}> = [
  { id: "error", label: "Reportar error" },
  { id: "calculator", label: "Sugerir calculadora" },
  { id: "general", label: "Consulta general" }
];

const fieldsByType: Record<ContactType, ContactField[]> = {
  error: [
    {
      label: "Calculadora relacionada",
      placeholder: "Ejemplo: Calculadora de IVA Paraguay",
      type: "input"
    },
    {
      label: "Datos ingresados",
      placeholder: "Monto, tasa, operacion u otros datos relevantes"
    },
    {
      label: "Resultado obtenido",
      placeholder: "Resultado que mostro CalculaPy"
    },
    {
      label: "Resultado esperado",
      placeholder: "Resultado que esperabas ver"
    },
    {
      label: "Mensaje adicional",
      placeholder: "Contexto adicional para entender el caso"
    },
    {
      label: "Fuente o enlace opcional",
      placeholder: "Referencia sugerida, si existe",
      type: "input"
    }
  ],
  calculator: [
    {
      label: "Nombre o idea de calculadora",
      placeholder: "Ejemplo: calculadora de cuotas",
      type: "input"
    },
    {
      label: "Que deberia calcular",
      placeholder: "Describe el resultado esperado"
    },
    {
      label: "Ejemplo de uso o caso practico",
      placeholder: "Cuenta una situacion concreta donde ayudaria"
    },
    {
      label: "Por que seria util",
      placeholder: "Explica el valor para usuarios en Paraguay"
    },
    {
      label: "Mensaje adicional",
      placeholder: "Agrega cualquier detalle extra"
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
      placeholder: "Escribe tu consulta"
    }
  ]
};

export function ContactoPage() {
  const [contactType, setContactType] = useState<ContactType>("error");
  const activeFields = fieldsByType[contactType];

  return (
    <section className="page">
      <PageMeta
        title="Contacto y reportes | CalculaPy"
        description="Canal de contacto y reporte de errores para CalculaPy."
      />
      <div className="page__content">
        <div className="catalog-heading app-page-heading support-page-heading">
          <div>
            <p className="eyebrow">Soporte</p>
            <h1>Contacto y reportes</h1>
            <p>
              Reporta errores, sugeri nuevas calculadoras o envia una consulta
              general.
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
              <span aria-hidden="true">+</span>
              {option.label}
            </button>
          ))}
        </div>

        <form className="contact-form" aria-label="Plantilla de contacto">
          <div className="contact-form__header">
            <div>
              <h2>Plantilla de contacto</h2>
              <p>
                Completa estos datos como guia. El envio directo se habilitara
                antes del lanzamiento publico.
              </p>
            </div>
            <button className="button button--primary" disabled type="button">
              Envio no disponible
            </button>
          </div>

          <div className="contact-form__grid">
            {activeFields.map((field) => (
              <label
                className={
                  field.type === "input" ? "form-field" : "form-field form-field--wide"
                }
                key={field.label}
              >
                <span>{field.label}</span>
                {field.type === "input" ? (
                  <input placeholder={field.placeholder} />
                ) : (
                  <textarea placeholder={field.placeholder} />
                )}
              </label>
            ))}
          </div>
        </form>

        <section className="support-card support-card--notice support-card--compact">
          <h2>Canal de contacto</h2>
          <p>
            El canal de contacto definitivo se configurara antes del lanzamiento
            publico.
          </p>
        </section>
      </div>
    </section>
  );
}
