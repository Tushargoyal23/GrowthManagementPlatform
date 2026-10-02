import type { ReactNode } from "react";
import { TeacherFrame } from "@/components/layout/TeacherFrame";
import { getBatches } from "@/lib/data/batches";
import { getFees } from "@/lib/data/fees";
import { getNotices } from "@/lib/data/notices";
import { listChapters, listStudentRecords, listSubjects } from "@/lib/data/students";
import { getTests } from "@/lib/data/tests";

export default async function TeacherLayout({ children }: { children: ReactNode }) {
  const [fees, notices, tests, batches] = await Promise.all([
    getFees(),
    getNotices(),
    getTests(),
    getBatches(),
  ]);

  return (
    <TeacherFrame
      initial={{
        records: listStudentRecords(),
        subjects: listSubjects(),
        chapters: listChapters(),
        fees,
        notices,
        tests,
        batches: batches.map((batch) => ({ id: batch.id, name: batch.name })),
      }}
    >
      {children}
    </TeacherFrame>
  );
}
