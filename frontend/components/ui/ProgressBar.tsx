export function ProgressBar({ percent }: { percent: number }) {
  const width = Math.max(0, Math.min(100, percent));
  return (
    <span className="ml-2 inline-block h-1.5 w-[90px] overflow-hidden rounded bg-border align-middle">
      <span className="block h-full bg-accent" style={{ width: `${width}%` }} />
    </span>
  );
}
