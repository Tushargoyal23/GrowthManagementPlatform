"use client";

import { useTeacherData } from "@/components/layout/TeacherFrame";
import { DataTable, Td } from "@/components/ui/DataTable";
import { Tag } from "@/components/ui/Tag";
import { formatInr, formatShortDate } from "@/lib/format";

const TONE = { Paid: "good", Partial: "warn", Overdue: "bad" } as const;

export default function FeesPage() {
  const { fees, students, markPaid } = useTeacherData();
  const collected = fees.reduce((sum, fee) => sum + fee.paid, 0);
  const pending = fees.reduce((sum, fee) => sum + fee.balance, 0);
  const overdue = fees.filter((fee) => fee.status === "Overdue").length;

  return (
    <div>
      <h1 className="m-0 mb-4 text-[21px] font-semibold">Fees</h1>
      <div className="mb-5 grid gap-3.5 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="m-0 text-[19px] font-semibold">{formatInr(collected)}</p>
          <p className="m-0 mt-1 text-[12.5px] text-text-muted">Collected this term</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="m-0 text-[19px] font-semibold text-warn">{formatInr(pending)}</p>
          <p className="m-0 mt-1 text-[12.5px] text-text-muted">Pending balance</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="m-0 text-[19px] font-semibold text-danger">{overdue}</p>
          <p className="m-0 mt-1 text-[12.5px] text-text-muted">Students overdue</p>
        </div>
      </div>
      <DataTable headers={["Student", "Batch", "Paid", "Balance", "Due", "Status", ""]}>
        {fees.map((fee) => {
          const student = students.find((item) => item.id === fee.studentId);
          return (
            <tr key={fee.studentId}>
              <Td>{student?.name ?? fee.studentId}</Td>
              <Td>{student?.batchId ?? "—"}</Td>
              <Td>{formatInr(fee.paid)}</Td>
              <Td>{formatInr(fee.balance)}</Td>
              <Td>{formatShortDate(fee.dueDate)}</Td>
              <Td>
                <Tag tone={TONE[fee.status]}>{fee.status}</Tag>
              </Td>
              <Td>
                {fee.status === "Overdue" ? (
                  <button type="button" className="text-accent" onClick={() => markPaid(fee.studentId)}>
                    Mark paid
                  </button>
                ) : (
                  <span className="text-accent">Remind</span>
                )}
              </Td>
            </tr>
          );
        })}
      </DataTable>
    </div>
  );
}
