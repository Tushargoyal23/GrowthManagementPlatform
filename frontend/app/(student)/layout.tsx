import type { ReactNode } from "react";
import Link from "next/link";
import { Brand } from "@/components/layout/Brand";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-3.5">
        <Brand />
        <Link href="/login" className="text-[13px] text-accent">
          Log out
        </Link>
      </header>
      <main className="mx-auto max-w-[960px] px-5 py-7 pb-16">{children}</main>
    </div>
  );
}
