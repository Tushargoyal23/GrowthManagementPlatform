import type { ReactNode } from "react";
import { droppedThreeInARow } from "@/lib/rules";
import type { SubjectScore } from "@/lib/types";

export function SubjectCard({ score }: { score: SubjectScore }) {
  const latestClass = droppedThreeInARow(score.last4Scores) ? "text-danger" : "";
  const diff = score.batchAverageDiff > 0 ? `+${score.batchAverageDiff}` : `${score.batchAverageDiff}`;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h4 className="m-0 mb-2 text-sm font-semibold">{score.subject}</h4>
      <Row label="Latest score">
        <b className={latestClass}>{score.latestScore}%</b>
      </Row>
      <Row label="Last 4 scores">
        <b>{score.last4Scores.join(",")}</b>
      </Row>
      <Row label="vs batch avg">
        <b>{diff}</b>
      </Row>
      <Row label="Attendance">
        <b>{score.subjectAttendancePct}%</b>
      </Row>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between py-1 text-[12.5px] text-text-muted">
      <span>{label}</span>
      <span className="font-medium text-text">{children}</span>
    </div>
  );
}
