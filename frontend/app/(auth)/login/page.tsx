"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs } from "@/components/layout/Tabs";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState("institute");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roll, setRoll] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [error, setError] = useState("");

  function signIn() {
    if (mode === "institute") {
      if (!email.trim() || !password.trim()) {
        setError("Enter email and password.");
        return;
      }
      router.push("/dashboard");
      return;
    }
    if (!roll.trim() || !studentPassword.trim()) {
      setError("Enter your roll number and password.");
      return;
    }
    router.push("/me");
  }

  return (
    <main className="mx-auto max-w-[380px] px-5 pt-16">
      <Card className="px-7 py-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-bg text-[17px] font-bold text-accent-strong">
            CL
          </div>
          <p className="m-0 text-lg font-semibold">ClassLedger</p>
          <p className="m-0 mt-1 text-[13px] text-text-muted">Sign in to your account</p>
        </div>
        <Tabs
          tabs={[
            { id: "institute", label: "Institute" },
            { id: "student", label: "Student" },
          ]}
          active={mode}
          full
          onChange={(id) => {
            setMode(id);
            setError("");
          }}
        />
        <div className="mt-6">
          {mode === "institute" ? (
            <div>
              <Field label="Email">
                <input type="email" value={email} placeholder="headteacher@institute.com" onChange={(event) => setEmail(event.target.value)} />
              </Field>
              <Field label="Password">
                <input type="password" value={password} placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
              </Field>
            </div>
          ) : (
            <div>
              <Field label="Roll number or phone">
                <input value={roll} placeholder="e.g. 24-018 or 98xxxxxxx0" onChange={(event) => setRoll(event.target.value)} />
              </Field>
              <Field label="Password">
                <input
                  type="password"
                  value={studentPassword}
                  placeholder="Enter password"
                  onChange={(event) => setStudentPassword(event.target.value)}
                />
              </Field>
            </div>
          )}
          {error && <p className="m-0 text-[12.5px] text-danger">{error}</p>}
          <div className="my-4 flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-[12.5px] text-text-muted">
              <input type="checkbox" /> Remember me
            </label>
            <span className="text-[12.5px] text-accent">Forgot password</span>
          </div>
          <Button variant="primary" className="w-full" onClick={signIn}>
            Sign in
          </Button>
          <p className="mt-4 text-center text-xs text-text-faint">
            New institute?{" "}
            <Link href="/signup" className="text-accent">
              Request access
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="mb-3.5 block text-[13px] text-text-muted">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}
