"use client";

import Link from "next/link";
import { useTeacherData } from "@/components/layout/TeacherFrame";
import { StudentTable } from "@/components/students/StudentTable";
import { buttonClass } from "@/components/ui/Button";

export default function StudentsPage() {
  const { students, records } = useTeacherData();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <h1 className="m-0 text-[21px] font-semibold">Students</h1>
        <Link href="/dashboard/students/new" className={buttonClass("primary")}>
          + Add student
        </Link>
      </div>
      <StudentTable students={students} records={records} />
    </div>
  );
}
