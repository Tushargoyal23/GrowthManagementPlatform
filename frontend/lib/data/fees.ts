import { feeStatus, APP_TODAY } from "../rules";
import type { FeeRecord } from "../types";

const FEES: FeeRecord[] = [
  { studentId: "aarav", paid: 8000, balance: 0, dueDate: "2026-10-05", status: "Paid" },
  { studentId: "priya", paid: 4000, balance: 4000, dueDate: "2026-10-02", status: "Partial" },
  { studentId: "kabir", paid: 0, balance: 8000, dueDate: "2026-09-20", status: "Overdue" },
];

function withStatus(record: FeeRecord): FeeRecord {
  return { ...record, status: feeStatus(record.balance, record.dueDate, APP_TODAY) };
}

export function findFee(studentId: string): FeeRecord | undefined {
  const record = FEES.find((fee) => fee.studentId === studentId);
  return record ? withStatus(record) : undefined;
}

export async function getFees(): Promise<FeeRecord[]> {
  return FEES.map(withStatus);
}
