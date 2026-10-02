"use client";

import Link from "next/link";

type Tab = { id: string; label: string; href?: string };

export function Tabs({
  tabs,
  active,
  onChange,
  full = false,
}: {
  tabs: Tab[];
  active: string;
  onChange?: (id: string) => void;
  full?: boolean;
}) {
  return (
    <div className={`flex gap-1 rounded-[10px] bg-surface-muted p-1 ${full ? "w-full" : ""}`}>
      {tabs.map((tab) => {
        const className = `rounded-lg px-4 py-2 text-center text-[13px] font-medium ${full ? "flex-1" : ""} ${
          tab.id === active ? "bg-surface text-text shadow-sm" : "text-text-muted"
        }`;
        if (tab.href) {
          return (
            <Link key={tab.id} href={tab.href} className={className}>
              {tab.label}
            </Link>
          );
        }
        return (
          <button key={tab.id} type="button" className={className} onClick={() => onChange?.(tab.id)}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
