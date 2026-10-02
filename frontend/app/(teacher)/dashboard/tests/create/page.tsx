"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTeacherData } from "@/components/layout/TeacherFrame";
import { AIQuestionGenerator } from "@/components/tests/AIQuestionGenerator";
import { Button, buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { APP_TODAY } from "@/lib/rules";
import type { SampleQuestion } from "@/lib/data/tests";

const SUBJECTS = ["Physics", "Chemistry", "Maths"];

export default function CreateTestPage() {
  const router = useRouter();
  const { batchList, addTest, addNotice } = useTeacherData();
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [batchId, setBatchId] = useState("All");
  const [chapter, setChapter] = useState("");
  const [date, setDate] = useState("");
  const [maxMarks, setMaxMarks] = useState(50);
  const [postNotice, setPostNotice] = useState(true);
  const [questions, setQuestions] = useState<SampleQuestion[]>([]);
  const [error, setError] = useState("");

  function save() {
    if (!subject || !chapter.trim() || !date || !maxMarks) {
      setError("Fill subject, chapter, date, and maximum marks.");
      return;
    }
    const id = `test-${Date.now()}`;
    const batchLabel = batchId === "All" ? "all batches" : batchId;
    addTest({
      id,
      subject,
      chapterId: chapter.trim().toLowerCase().replace(/\s+/g, "-"),
      chapterName: chapter.trim(),
      batchId,
      date,
      maxMarks,
      status: "Upcoming",
      questions,
    });
    if (postNotice) {
      addNotice({
        id: `notice-${id}`,
        text: `${subject} test — ${batchLabel}`,
        postedAt: APP_TODAY,
        batchId,
      });
    }
    router.push("/dashboard/tests");
  }

  return (
    <div>
      <Link href="/dashboard/tests" className={`${buttonClass()} mb-4`}>
        ← Back to tests
      </Link>
      <h1 className="m-0 mb-4 text-[21px] font-semibold">Create test</h1>
      <Card>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className="block text-[12.5px] text-text-muted">
            Subject
            <select className="mt-1" value={subject} onChange={(event) => setSubject(event.target.value)}>
              {SUBJECTS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="block text-[12.5px] text-text-muted">
            Batch
            <select className="mt-1" value={batchId} onChange={(event) => setBatchId(event.target.value)}>
              <option value="All">All batches</option>
              {batchList.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[12.5px] text-text-muted">
            Chapter
            <input className="mt-1" value={chapter} placeholder="e.g. Thermodynamics" onChange={(event) => setChapter(event.target.value)} />
          </label>
          <label className="block text-[12.5px] text-text-muted">
            Date
            <input className="mt-1" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          </label>
          <label className="block text-[12.5px] text-text-muted">
            Maximum marks
            <input className="mt-1" type="number" value={maxMarks} onChange={(event) => setMaxMarks(Number(event.target.value))} />
          </label>
          <label className="mt-6 flex items-center gap-2 text-[12.5px] text-text-muted">
            <input type="checkbox" checked={postNotice} onChange={(event) => setPostNotice(event.target.checked)} />
            Post on notice board
          </label>
        </div>
      </Card>
      <AIQuestionGenerator questions={questions} onChange={setQuestions} />
      {error && <p className="mb-0 mt-3 text-[12.5px] text-danger">{error}</p>}
      <div className="mt-5 flex gap-2.5">
        <Button>Save draft</Button>
        <Button variant="primary" onClick={save}>
          Save test
        </Button>
      </div>
    </div>
  );
}
