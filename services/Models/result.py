from dataclasses import dataclass


@dataclass
class Result:
    id: str
    student_id: str
    question_id: str
    student_answer: str
    marks_awarded: int
