import type { ReactNode } from "react";

import { NoticeBox } from "../ui/NoticeBox";

type DisclaimerBoxProps = {
  children: ReactNode;
};

export function DisclaimerBox({ children }: DisclaimerBoxProps) {
  return (
    <NoticeBox tone="warning" title="Aviso orientativo">
      {children}
    </NoticeBox>
  );
}
