import type { ComponentType, ReactNode } from "react";
import {
  AlertTriangle,
  BookText,
  CheckCircle,
  Info,
  Sigma,
  XCircle
} from "lucide-react";

export type NoticeTone =
  | "info"
  | "formula"
  | "source"
  | "warning"
  | "success"
  | "error";

type NoticeBoxProps = {
  tone?: NoticeTone;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

const iconByTone: Record<NoticeTone, ComponentType<{ size?: number; "aria-hidden"?: boolean }>> = {
  info: Info,
  formula: Sigma,
  source: BookText,
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle
};

export function NoticeBox({
  tone = "info",
  title,
  children,
  footer
}: NoticeBoxProps) {
  const Icon = iconByTone[tone];

  return (
    <section className={`notice notice--${tone}`}>
      <div className="notice__header">
        <span className="notice__icon" aria-hidden="true">
          <Icon size={18} />
        </span>
        <h2 className="notice__title">{title}</h2>
      </div>
      <div className="notice__body">{children}</div>
      {footer ? <div className="notice__footer">{footer}</div> : null}
    </section>
  );
}
