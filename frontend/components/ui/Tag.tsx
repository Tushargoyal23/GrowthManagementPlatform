import type { ReactNode } from "react";

const LOOK = {
  good: "bg-success-bg text-success",
  warn: "bg-warn-bg text-warn",
  bad: "bg-danger-bg text-danger",
  neutral: "bg-accent-bg text-accent-strong",
};

export function Tag({
  tone,
  children,
}: {
  tone: keyof typeof LOOK;
  children: ReactNode;
}) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[11.5px] ${LOOK[tone]}`}>
      {children}
    </span>
  );
}
