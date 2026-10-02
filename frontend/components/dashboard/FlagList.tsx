"use client";

import { useState } from "react";
import Link from "next/link";
import { buttonClass } from "../ui/Button";
import type { Student } from "@/lib/types";

export function FlagList({ students }: { students: Student[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        className={`${buttonClass()} mb-2.5 w-full justify-between`}
        onClick={() => setOpen((value) => !value)}
      >
        <span>Students flagged for attention</span>
        <span>{students.length} ▾</span>
      </button>
      {open && (
        <div className="flex gap-2.5 overflow-x-auto pb-4">
          {students.map((student) => (
            <div key={student.id} className="min-w-[180px] rounded-xl border border-danger bg-surface p-4">
              <b className="text-[13px]">{student.name}</b>
              <p className="m-0 mt-1 text-xs text-text-muted">{student.flagReason}</p>
              <Link href={`/dashboard/students/${student.id}`} className={`${buttonClass()} mt-2 w-full`}>
                View profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
