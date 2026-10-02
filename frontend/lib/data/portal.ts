import type { Chapter, FeeRecord, Notice, Student, SubjectScore } from "../types";
import { findFee } from "./fees";
import { getNoticesForBatch } from "./notices";
import { listChapters, listStudentRecords, listSubjects, toStudent } from "./students";

export interface MyRecord {
  student: Student;
  subjects: SubjectScore[];
  chapters: Chapter[];
  notices: Notice[];
  fee: FeeRecord | null;
}

const CURRENT_STUDENT_ID = "aarav";

export async function getMyRecord(): Promise<MyRecord | null> {
  const record = listStudentRecords().find((student) => student.id === CURRENT_STUDENT_ID);
  if (!record) return null;

  const subjects = listSubjects()[record.id] ?? [];
  const chapters = listChapters()[record.id] ?? [];
  const notices = await getNoticesForBatch(record.batchId);
  const fee = findFee(record.id) ?? null;

  return {
    student: toStudent(record, subjects, fee ?? undefined),
    subjects,
    chapters,
    notices,
    fee,
  };
}
