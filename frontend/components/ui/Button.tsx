import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "default";

export function buttonClass(variant: Variant = "default", className = ""): string {
  const base = "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-[13px] font-medium";
  const look =
    variant === "primary"
      ? "border-accent bg-accent text-white hover:opacity-90"
      : "border-border bg-surface text-text hover:bg-surface-muted";
  return `${base} ${look} ${className}`;
}

export function Button({
  variant = "default",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}
