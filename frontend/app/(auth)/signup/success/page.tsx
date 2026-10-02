import Link from "next/link";
import { Check } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function SignupSuccessPage() {
  return (
    <main className="mx-auto max-w-[420px] px-5 pt-16">
      <Card className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success-bg text-success">
          <Check size={22} />
        </div>
        <p className="m-0 text-lg font-semibold">Request received</p>
        <p className="mb-4 mt-2 text-[13px] text-text-muted">We will contact you.</p>
        <Link href="/login" className={buttonClass("primary")}>
          Continue
        </Link>
      </Card>
    </main>
  );
}
