"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const STEPS = ["Institute details", "Head teacher account", "Review"];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function next() {
    if (step === 1 && (!email.trim() || !password.trim())) {
      setError("Enter email and password.");
      return;
    }
    setError("");
    setStep((current) => current + 1);
  }

  return (
    <main className="mx-auto max-w-[560px] px-5 pt-16">
      <h1 className="m-0 mb-4 text-[21px] font-semibold">Request access</h1>
      <p className="m-0 mb-4 text-[13px] text-text-muted">
        Step {step + 1} of {STEPS.length}: {STEPS[step]}
      </p>
      <Card>
        {step === 0 && <p className="m-0 text-[13px] text-text-muted">Institute details</p>}
        {step === 1 && (
          <div className="grid gap-3.5">
            <label className="block text-[12.5px] text-text-muted">
              Email
              <input className="mt-1" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="block text-[12.5px] text-text-muted">
              Password
              <input className="mt-1" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
          </div>
        )}
        {step === 2 && (
          <p className="m-0 text-[13.5px]">
            Head teacher email: <b>{email}</b>
          </p>
        )}
        {error && <p className="mb-0 mt-3 text-[12.5px] text-danger">{error}</p>}
      </Card>
      <div className="mt-4 flex gap-2.5">
        {step > 0 && (
          <Button
            onClick={() => {
              setError("");
              setStep((current) => current - 1);
            }}
          >
            Back
          </Button>
        )}
        {step < 2 ? (
          <Button variant="primary" onClick={next}>
            Continue
          </Button>
        ) : (
          <Button variant="primary" onClick={() => router.push("/signup/success")}>
            Submit
          </Button>
        )}
      </div>
    </main>
  );
}
