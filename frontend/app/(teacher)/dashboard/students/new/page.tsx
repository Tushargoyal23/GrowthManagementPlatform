"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTeacherData } from "@/components/layout/TeacherFrame";
import { Button, buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function AddStudentPage() {
  const router = useRouter();
  const { batchList, addStudent } = useTeacherData();
  const [name, setName] = useState("");
  const [batchId, setBatchId] = useState(batchList[0]?.id ?? "");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [error, setError] = useState("");

  function submit() {
    if (!name.trim() || !batchId || !parentPhone.trim()) {
      setError("Enter name, batch, and parent phone.");
      return;
    }
    addStudent({
      name: name.trim(),
      batchId,
      parentPhone: parentPhone.trim(),
      parentEmail: parentEmail.trim() || undefined,
    });
    router.push("/dashboard/students");
  }

  return (
    <div>
      <Link href="/dashboard/students" className={`${buttonClass()} mb-4`}>
        ← Back
      </Link>
      <h1 className="m-0 mb-4 text-[21px] font-semibold">Add student</h1>
      <Card>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className="block text-[12.5px] text-text-muted">
            Student name
            <input className="mt-1" value={name} placeholder="Full name" onChange={(event) => setName(event.target.value)} />
          </label>
          <label className="block text-[12.5px] text-text-muted">
            Batch
            <select className="mt-1" value={batchId} onChange={(event) => setBatchId(event.target.value)}>
              {batchList.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-[12.5px] text-text-muted">
            Parent phone
            <input className="mt-1" value={parentPhone} placeholder="98xxxxxxx0" onChange={(event) => setParentPhone(event.target.value)} />
          </label>
          <label className="block text-[12.5px] text-text-muted">
            Parent email
            <input className="mt-1" value={parentEmail} placeholder="parent@email.com" onChange={(event) => setParentEmail(event.target.value)} />
          </label>
        </div>
        {error && <p className="mb-0 mt-3 text-[12.5px] text-danger">{error}</p>}
      </Card>
      <Button variant="primary" className="mt-4" onClick={submit}>
        Add student
      </Button>
    </div>
  );
}
