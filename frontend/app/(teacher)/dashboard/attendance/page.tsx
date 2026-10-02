"use client";

import { useState } from "react";
import Link from "next/link";
import { useTeacherData } from "@/components/layout/TeacherFrame";
import { Button, buttonClass } from "@/components/ui/Button";
import type { TodayStatus } from "@/lib/types";

const SESSION = {
  subject: "Physics",
  batch: "A1",
  studentIds: ["aarav", "dev", "sara"],
};

const OPTIONS: TodayStatus[] = ["Present", "Late", "Absent"];

export default function AttendancePage() {
  const { students, saveAttendance } = useTeacherData();
  const rows = SESSION.studentIds
    .map((id) => students.find((student) => student.id === id))
    .filter((student) => student !== undefined);
  const [marks, setMarks] = useState<Record<string, TodayStatus>>(() =>
    Object.fromEntries(rows.map((student) => [student.id, student.today ?? "Present"])),
  );

  return (
    <div>
      <Link href="/dashboard" className={`${buttonClass()} mb-4`}>
        ← Back
      </Link>
      <h1 className="m-0 text-[21px] font-semibold">Mark attendance</h1>
      <p className="mb-4 mt-1.5 text-[13px] text-text-muted">
        {SESSION.subject} · Batch {SESSION.batch} · Today
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full border-collapse text-[13.5px]">
          <thead>
            <tr>
              {["Student", "Present", "Late", "Absent"].map((header) => (
                <th key={header} className="border-b border-border px-2.5 py-2 text-left text-xs font-medium text-text-faint">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((student) => (
              <tr key={student.id}>
                <td className="border-b border-border px-2.5 py-3">{student.name}</td>
                {OPTIONS.map((option) => (
                  <td key={option} className="border-b border-border px-2.5 py-3">
                    <input
                      type="radio"
                      name={student.id}
                      checked={marks[student.id] === option}
                      onChange={() => setMarks((current) => ({ ...current, [student.id]: option }))}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button variant="primary" className="mt-4" onClick={() => saveAttendance(marks)}>
        Save attendance
      </Button>
    </div>
  );
}
