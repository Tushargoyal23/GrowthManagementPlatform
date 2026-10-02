import type { Notice } from "../types";

const NOTICES: Notice[] = [
  {
    id: "unit-test",
    text: "Unit test on Monday — all batches",
    postedAt: "2026-09-26",
    batchId: "All",
  },
  {
    id: "closed",
    text: "Institute closed 2 October",
    postedAt: "2026-09-25",
    batchId: "All",
  },
];

export async function getNotices(): Promise<Notice[]> {
  return NOTICES.map((notice) => ({ ...notice }));
}

export async function getNoticesForBatch(batchId: string): Promise<Notice[]> {
  const notices = await getNotices();
  return notices.filter((notice) => notice.batchId === "All" || notice.batchId === batchId);
}
