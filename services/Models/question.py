from dataclasses import dataclass, field
from enum import Enum


class QuestionType(str, Enum):
    MCQ = "mcq"
    SHORT_ANSWER = "short_answer"


@dataclass
class Question:
    id: str
    test_id: str
    text: str
    topic_id: str
    marks: int
    question_type: QuestionType
    options: list[str] = field(default_factory=list)
    answer: str = ""
