export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-surface-muted p-3.5">
      <p className="m-0 text-[19px] font-semibold">{value}</p>
      <p className="m-0 mt-0.5 text-xs text-text-muted">{label}</p>
    </div>
  );
}
