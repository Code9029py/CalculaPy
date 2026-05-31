import type { ReactNode } from "react";

import { NoticeBox } from "../ui/NoticeBox";

type FormulaBoxProps = {
  title?: string;
  children: ReactNode;
};

export function FormulaBox({
  title = "Fórmula usada",
  children
}: FormulaBoxProps) {
  return (
    <NoticeBox tone="formula" title={title}>
      {children}
    </NoticeBox>
  );
}
