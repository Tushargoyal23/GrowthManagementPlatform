import type { Batch } from "../types";
import { getStudents } from "./students";

const BATCHES = [
  { id: "A1", name: "A1" },
  { id: "B2", name: "B2" },
  { id: "C1", name: "C1" },
  { id: "D3", name: "D3" },
];

export async function getBatches(): Promise<Batch[]> {
  const students = await getStudents();
  return BATCHES.map((batch) => ({
    ...batch,
    studentCount: students.filter((student) => student.batchId === batch.id).length,
  }));
}
