"use client";

import { useState } from "react";
import { getSampleGeneratedQuestions, type SampleQuestion } from "@/lib/data/tests";
import { Button } from "../ui/Button";

export function AIQuestionGenerator({
  questions,
  onChange,
}: {
  questions: SampleQuestion[];
  onChange: (questions: SampleQuestion[]) => void;
}) {
  const [count, setCount] = useState(10);
  const [kind, setKind] = useState("Mixed");
  const [difficulty, setDifficulty] = useState("Medium");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  async function generate() {
    const sample = await getSampleGeneratedQuestions();
    onChange(sample);
    setVisible(true);
    setEditingId(null);
  }

  function update(id: string, patch: Partial<SampleQuestion>) {
    onChange(questions.map((question) => (question.id === id ? { ...question, ...patch } : question)));
  }

  return (
    <div className="mt-5 rounded-xl border border-dashed border-border p-4">
      <p className="m-0 mb-1 text-sm font-semibold">✦ Question paper with AI</p>
      <p className="m-0 mb-3.5 text-[12.5px] text-text-muted">You review every question before it is used.</p>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <label className="block text-[12.5px] text-text-muted">
          Number of questions
          <input className="mt-1" type="number" value={count} onChange={(event) => setCount(Number(event.target.value))} />
        </label>
        <label className="block text-[12.5px] text-text-muted">
          Type
          <select className="mt-1" value={kind} onChange={(event) => setKind(event.target.value)}>
            <option>Mixed</option>
            <option>MCQ</option>
            <option>Short answer</option>
          </select>
        </label>
        <label className="block text-[12.5px] text-text-muted">
          Difficulty
          <select className="mt-1" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
            <option>Medium</option>
            <option>Easy</option>
            <option>Hard</option>
          </select>
        </label>
        <div className="flex items-end">
          <Button variant="primary" className="w-full" onClick={generate}>
            Generate
          </Button>
        </div>
      </div>
      {visible && (
        <div className="mt-1.5">
          {questions.map((question, index) => (
            <div key={question.id} className="mt-2.5 rounded-[10px] bg-surface-muted px-3.5 py-3">
              <div className="mb-1.5 flex justify-between text-xs text-text-faint">
                <span>
                  Q{index + 1} · {question.chapterName} · {question.topicName}
                </span>
                <span>{question.marks} marks</span>
              </div>
              {editingId === question.id ? (
                <div className="grid gap-2">
                  <textarea value={question.text} onChange={(event) => update(question.id, { text: event.target.value })} />
                  <input
                    type="number"
                    value={question.marks}
                    onChange={(event) => update(question.id, { marks: Number(event.target.value) })}
                  />
                </div>
              ) : (
                <p className="m-0 mb-1 text-[13.5px]">{question.text}</p>
              )}
              <p className="m-0 text-xs text-text-muted">
                Type: {question.type} ·{" "}
                <button type="button" className="text-accent" onClick={() => setEditingId(question.id)}>
                  Edit
                </button>{" "}
                ·{" "}
                <button
                  type="button"
                  className="text-accent"
                  onClick={() => onChange(questions.filter((item) => item.id !== question.id))}
                >
                  Remove
                </button>
              </p>
            </div>
          ))}
          <Button
            className="mt-2.5"
            onClick={() => {
              const id = `manual-${Date.now()}`;
              onChange([
                ...questions,
                {
                  id,
                  text: "",
                  type: "Short answer",
                  marks: 5,
                  chapterId: "",
                  chapterName: "",
                  topicId: "",
                  topicName: "",
                },
              ]);
              setEditingId(id);
            }}
          >
            + Add question manually
          </Button>
        </div>
      )}
    </div>
  );
}
