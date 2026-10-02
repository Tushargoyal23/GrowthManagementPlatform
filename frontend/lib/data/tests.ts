import type { Question, Test } from "../types";

const TESTS: Test[] = [
  {
    id: "physics-thermo",
    subject: "Physics",
    chapterId: "thermodynamics",
    chapterName: "Thermodynamics",
    batchId: "A1",
    date: "2026-09-20",
    maxMarks: 50,
    status: "Done",
    batchAverage: 58,
    questions: [],
  },
  {
    id: "maths-calculus",
    subject: "Maths",
    chapterId: "calculus",
    chapterName: "Calculus",
    batchId: "All",
    date: "2026-09-18",
    maxMarks: 100,
    status: "Done",
    batchAverage: 74,
    questions: [],
  },
  {
    id: "chemistry-bonding",
    subject: "Chemistry",
    chapterId: "bonding",
    chapterName: "Bonding",
    batchId: "B2",
    date: "2026-09-15",
    maxMarks: 50,
    status: "Marks pending",
    questions: [],
  },
  {
    id: "physics-optics",
    subject: "Physics",
    chapterId: "optics",
    chapterName: "Optics",
    batchId: "All",
    date: "2026-09-29",
    maxMarks: 50,
    status: "Upcoming",
    questions: [],
  },
];

export type SampleQuestion = Question & { chapterName: string; topicName: string };

const SAMPLE_QUESTIONS: SampleQuestion[] = [
  {
    id: "sample-1",
    text: "State the first law of thermodynamics and explain its significance.",
    type: "Short answer",
    marks: 5,
    chapterId: "thermodynamics",
    chapterName: "Thermodynamics",
    topicId: "first-law",
    topicName: "First law",
  },
  {
    id: "sample-2",
    text: "A heat engine operates between 500K and 300K. Calculate its maximum efficiency.",
    type: "Numerical",
    marks: 5,
    chapterId: "thermodynamics",
    chapterName: "Thermodynamics",
    topicId: "heat-engines",
    topicName: "Heat engines",
  },
];

export async function getTests(): Promise<Test[]> {
  return TESTS.map((test) => ({ ...test, questions: test.questions.map((question) => ({ ...question })) }));
}

export async function getSampleGeneratedQuestions(): Promise<SampleQuestion[]> {
  return SAMPLE_QUESTIONS.map((question) => ({ ...question }));
}
