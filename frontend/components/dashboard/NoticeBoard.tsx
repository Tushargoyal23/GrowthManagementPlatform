import { formatNoticeWhen } from "@/lib/format";
import type { Notice } from "@/lib/types";

export function NoticeBoard({ notices }: { notices: Notice[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full border-collapse text-[13.5px]">
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td className="border-b border-border px-2.5 py-3">{notice.text}</td>
              <td className="border-b border-border px-2.5 py-3 text-right text-text-faint">
                {formatNoticeWhen(notice.postedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
