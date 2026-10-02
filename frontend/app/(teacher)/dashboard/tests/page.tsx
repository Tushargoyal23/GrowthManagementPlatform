"use client";

import Link from "next/link";
import { useTeacherData } from "@/components/layout/TeacherFrame";
import { TestTable } from "@/components/tests/TestTable";
import { buttonClass } from "@/components/ui/Button";

export default function TestsPage() {
  const { tests } = useTeacherData();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <h1 className="m-0 text-[21px] font-semibold">Tests</h1>
        <Link href="/dashboard/tests/create" className={buttonClass("primary")}>
          + Create test
        </Link>
      </div>
      <TestTable tests={tests} />
    </div>
  );
}
