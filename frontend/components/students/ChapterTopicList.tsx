import { scoreLevel, topicLevel } from "@/lib/rules";
import type { Chapter, ScoreLevel } from "@/lib/types";
import { ProgressBar } from "../ui/ProgressBar";
import { Tag } from "../ui/Tag";

const TONE: Record<ScoreLevel, "good" | "warn" | "bad" | "neutral"> = {
  Good: "good",
  Average: "warn",
  "Needs improvement": "bad",
  "Not enough data": "neutral",
};

export function ChapterTopicList({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="rounded-xl border border-border bg-surface px-4">
      {chapters.map((chapter) => {
        const level = scoreLevel(chapter.scorePct);
        return (
          <div key={chapter.id}>
            <Row name={chapter.name} level={level} percent={chapter.scorePct} />
            {chapter.topics.map((topic) => (
              <Row
                key={topic.id}
                name={`↳ ${topic.name}`}
                level={topicLevel(topic.scorePct, topic.attempted)}
                percent={topic.scorePct}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function Row({ name, level, percent }: { name: string; level: ScoreLevel; percent: number }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 text-[13px]">
      <span>
        {name} <Tag tone={TONE[level]}>{level}</Tag>
      </span>
      <span>
        {percent}% <ProgressBar percent={percent} />
      </span>
    </div>
  );
}
