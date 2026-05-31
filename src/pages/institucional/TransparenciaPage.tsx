import { BookText, Info, MessageCircle } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { Link } from "react-router-dom";

import { PageMeta } from "../../components/PageMeta";

type TransparencyItem = {
  Icon: ComponentType<LucideProps>;
  link?: {
    label: string;
    to: string;
  };
  text: string;
  title: string;
};

const transparencyItems: TransparencyItem[] = [
  {
    Icon: BookText,
    title: "Fuentes y revisión",
    text:
      "Cada calculadora muestra sus fuentes cuando un dato sensible lo requiere y la fecha de última revisión."
  },
  {
    Icon: Info,
    title: "Límites de uso",
    text:
      "Los resultados son orientativos. Pueden existir cambios normativos, errores o casos particulares que modifiquen el resultado final."
  },
  {
    Icon: MessageCircle,
    title: "Correcciones y reportes",
    text:
      "Si detectás un error o querés sugerir una mejora, podés preparar el mensaje desde la página de contacto.",
    link: {
      label: "Ir a contacto",
      to: "/contacto"
    }
  }
];

export function TransparenciaPage() {
  return (
    <section className="page">
      <PageMeta
        title="Transparencia | CalcuPY"
        description="Fuentes, límites y reportes para entender el alcance de las calculadoras de CalcuPY."
      />
      <div className="page__content">
        <div className="transparency-hero">
          <div className="transparency-hero__content">
            <p className="eyebrow">Soporte informativo</p>
            <h1 className="transparency-hero__title">Transparencia</h1>
            <p className="transparency-hero__description">
              Fuentes, límites y reportes para entender el alcance de las
              calculadoras.
            </p>
          </div>
        </div>

        <div className="transparency-grid">
          {transparencyItems.map(({ Icon, title, text, link }) => (
            <article className="transparency-card" key={title}>
              <h2 className="transparency-card__title">
                <Icon aria-hidden="true" size={18} />
                {title}
              </h2>
              <p className="transparency-card__text">{text}</p>
              {link ? (
                <Link className="inline-link transparency-card__link" to={link.to}>
                  {link.label}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
