import { formatShortDate } from "@/lib/format";
import type { Test } from "@/lib/types";
import { DataTable, Td } from "../ui/DataTable";
import { Tag } from "../ui/Tag";

const TONE = {
  Done: "good",
  "Marks pending": "warn",
  Upcoming: "neutral",
} as const;

export function TestTable({ tests }: { tests: Test[] }) {
  return (
    <DataTable headers={["Subject", "Chapter", "Date", "Batch", "Max", "Status", "Avg"]}>
      {tests.map((test) => (
        <tr key={test.id}>
          <Td>{test.subject}</Td>
          <Td>{test.chapterName}</Td>
          <Td>{formatShortDate(test.date)}</Td>
          <Td>{test.batchId}</Td>
          <Td>{test.maxMarks}</Td>
          <Td>
            <Tag tone={TONE[test.status]}>{test.status}</Tag>
          </Td>
          <Td>{test.batchAverage === undefined ? "—" : `${test.batchAverage}%`}</Td>
        </tr>
      ))}
    </DataTable>
  );
}
