import { flagReason } from "../rules";
import type { Chapter, FeeRecord, Student, StudentRecord, SubjectScore } from "../types";
import { getFees } from "./fees";

const RECORDS: StudentRecord[] = [
  {
    id: "aarav",
    name: "Aarav Shah",
    batchId: "A1",
    parentPhone: "+91 98xxxxxxx0",
    attendancePct: 82,
    overallAverage: 64,
    previousOverallAverage: null,
    today: "Present",
  },
  {
    id: "priya",
    name: "Priya Mehta",
    batchId: "C1",
    parentPhone: "",
    attendancePct: 68,
    overallAverage: null,
    previousOverallAverage: null,
    today: "Absent",
  },
  {
    id: "kabir",
    name: "Kabir Rao",
    batchId: "D3",
    parentPhone: "",
    attendancePct: 85,
    overallAverage: null,
    previousOverallAverage: null,
    today: "Present",
  },
  {
    id: "sara",
    name: "Sara Iyer",
    batchId: "B2",
    parentPhone: "",
    attendancePct: 94,
    overallAverage: null,
    previousOverallAverage: null,
    today: "Present",
  },
  {
    id: "dev",
    name: "Dev Nair",
    batchId: "A1",
    parentPhone: "",
    attendancePct: 88,
    overallAverage: null,
    previousOverallAverage: null,
    today: "Late",
  },
];

const SUBJECTS: Record<string, SubjectScore[]> = {
  aarav: [
    {
      subject: "Maths",
      latestScore: 78,
      last4Scores: [72, 75, 74, 78],
      batchAverageDiff: 6,
      subjectAttendancePct: 88,
    },
    {
      subject: "Chemistry",
      latestScore: 69,
      last4Scores: [74, 71, 70, 69],
      batchAverageDiff: -2,
      subjectAttendancePct: 84,
    },
    {
      subject: "Physics",
      latestScore: 58,
      last4Scores: [71, 64, 58],
      batchAverageDiff: -16,
      subjectAttendancePct: 76,
    },
  ],
};

const CHAPTERS: Record<string, Chapter[]> = {
  aarav: [
    {
      id: "mechanics",
      name: "Mechanics",
      subject: "Physics",
      scorePct: 82,
      topics: [],
    },
    {
      id: "thermodynamics",
      name: "Thermodynamics",
      subject: "Physics",
      scorePct: 41,
      topics: [
        {
          id: "first-law",
          name: "First law of thermodynamics",
          chapterId: "thermodynamics",
          scorePct: 32,
          attempted: 5,
        },
      ],
    },
    {
      id: "optics",
      name: "Optics",
      subject: "Physics",
      scorePct: 58,
      topics: [],
    },
  ],
};

export function listStudentRecords(): StudentRecord[] {
  return RECORDS.map((record) => ({ ...record }));
}

export function listSubjects(): Record<string, SubjectScore[]> {
  return Object.fromEntries(
    Object.entries(SUBJECTS).map(([id, scores]) => [id, scores.map((score) => ({ ...score, last4Scores: [...score.last4Scores] }))]),
  );
}

export function listChapters(): Record<string, Chapter[]> {
  return Object.fromEntries(
    Object.entries(CHAPTERS).map(([id, chapters]) => [
      id,
      chapters.map((chapter) => ({
        ...chapter,
        topics: chapter.topics.map((topic) => ({ ...topic })),
      })),
    ]),
  );
}

export function toStudent(
  record: StudentRecord,
  subjects: SubjectScore[],
  fee: FeeRecord | undefined,
): Student {
  const reason = flagReason(record.attendancePct, subjects);
  return {
    id: record.id,
    name: record.name,
    batchId: record.batchId,
    parentPhone: record.parentPhone,
    parentEmail: record.parentEmail,
    attendancePct: record.attendancePct,
    overallAverage: record.overallAverage,
    feeStatus: fee ? fee.status : null,
    flagged: reason !== undefined,
    flagReason: reason,
    today: record.today,
  };
}

export async function getStudents(batchId?: string): Promise<Student[]> {
  const subjects = listSubjects();
  const fees = await getFees();
  const students = listStudentRecords().map((record) =>
    toStudent(record, subjects[record.id] ?? [], fees.find((fee) => fee.studentId === record.id)),
  );
  return batchId ? students.filter((student) => student.batchId === batchId) : students;
}

export async function getStudentById(id: string): Promise<Student | null> {
  const students = await getStudents();
  return students.find((student) => student.id === id) ?? null;
}
