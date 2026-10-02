from datetime import date

from dotenv import load_dotenv
from sqlalchemy import create_engine, select, func
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import Session

from services.db.create_tables import ENV_PATH
from services.db.tables import (
    Attendance,
    Batch,
    Chapter,
    Notice,
    Question,
    Result,
    Student,
    Subject,
    Teacher,
    TeacherBatch,
    TeacherSubject,
    Test,
    Topic,
    User,
)

DEMO_PASSWORD = "demo123"


def seed() -> None:
    load_dotenv(ENV_PATH)
    import os

    url = os.environ.get("DATABASE_URL")
    if not url:
        raise RuntimeError("Set DATABASE_URL in src/.env")

    engine = create_engine(url)
    with Session(engine) as session:
        _insert_ignore(
            session,
            Batch,
            [
                {
                    "id": "B001",
                    "name": "Physics-2026-A",
                    "start_date": date(2026, 9, 1),
                    "end_date": date(2026, 12, 31),
                    "status": "active",
                }
            ],
        )
        _insert_ignore(
            session,
            User,
            [
                _user("T001", "Riya", "Verma", "riya@example.com", "9988776655", "teacher"),
                _user("S001", "Aarav", "Sharma", "aarav@example.com", "9876543210", "student"),
                _user("S002", "Meera", "Iyer", "meera@example.com", "9876500002", "student"),
                _user("S003", "Kabir", "Singh", "kabir@example.com", "9876500003", "student"),
            ],
        )
        _insert_ignore(session, Teacher, [{"id": "T001"}])
        _insert_ignore(
            session,
            Student,
            [
                {"id": "S001", "batch_id": "B001"},
                {"id": "S002", "batch_id": "B001"},
                {"id": "S003", "batch_id": "B001"},
            ],
        )
        _insert_ignore(
            session,
            Subject,
            [
                {"id": "SUB-PHY", "name": "Physics", "description": "Mechanics"},
                {"id": "SUB-MATH", "name": "Maths", "description": "Algebra"},
            ],
        )
        _insert_ignore(
            session,
            TeacherSubject,
            [
                {"teacher_id": "T001", "subject_id": "SUB-PHY"},
                {"teacher_id": "T001", "subject_id": "SUB-MATH"},
            ],
        )
        _insert_ignore(
            session,
            TeacherBatch,
            [{"teacher_id": "T001", "batch_id": "B001"}],
        )
        _insert_ignore(
            session,
            Chapter,
            [
                {"id": "CH-PHY-1", "name": "Mechanics", "subject_id": "SUB-PHY"},
                {"id": "CH-MATH-1", "name": "Algebra", "subject_id": "SUB-MATH"},
            ],
        )
        _insert_ignore(
            session,
            Topic,
            [
                {"id": "TOP-PHY-1", "name": "Newton's laws", "chapter_id": "CH-PHY-1"},
                {"id": "TOP-MATH-1", "name": "Linear equations", "chapter_id": "CH-MATH-1"},
            ],
        )
        _insert_ignore(
            session,
            Test,
            [
                {
                    "id": "TEST-001",
                    "name": "Mechanics weekly",
                    "batch_id": "B001",
                    "date": date(2026, 9, 20),
                    "max_marks": 10,
                    "description": "Two questions on Newton's laws",
                    "status": "done",
                }
            ],
        )
        _insert_ignore(
            session,
            Question,
            [
                {
                    "id": "Q1",
                    "test_id": "TEST-001",
                    "text": "Which law explains inertia?",
                    "topic_id": "TOP-PHY-1",
                    "marks": 5,
                    "question_type": "mcq",
                    "options": ["First", "Second", "Third", "None"],
                    "answer": "First",
                },
                {
                    "id": "Q2",
                    "test_id": "TEST-001",
                    "text": "State Newton's second law in one line.",
                    "topic_id": "TOP-PHY-1",
                    "marks": 5,
                    "question_type": "short_answer",
                    "options": [],
                    "answer": "Force equals mass times acceleration",
                },
            ],
        )
        _insert_ignore(
            session,
            Result,
            [
                {"id": "R1", "student_id": "S001", "question_id": "Q1", "student_answer": "First", "marks_awarded": 5},
                {"id": "R2", "student_id": "S001", "question_id": "Q2", "student_answer": "F = ma", "marks_awarded": 4},
                {"id": "R3", "student_id": "S002", "question_id": "Q1", "student_answer": "Second", "marks_awarded": 0},
                {"id": "R4", "student_id": "S002", "question_id": "Q2", "student_answer": "Force equals mass times acceleration", "marks_awarded": 5},
                {"id": "R5", "student_id": "S003", "question_id": "Q1", "student_answer": "First", "marks_awarded": 5},
                {"id": "R6", "student_id": "S003", "question_id": "Q2", "student_answer": "mass times acceleration", "marks_awarded": 3},
            ],
        )
        _insert_ignore(
            session,
            Attendance,
            [
                {"id": "A1", "student_id": "S001", "date": date(2026, 9, 20), "status": "present", "marked_by": "T001"},
                {"id": "A2", "student_id": "S002", "date": date(2026, 9, 20), "status": "late", "marked_by": "T001"},
                {"id": "A3", "student_id": "S003", "date": date(2026, 9, 20), "status": "absent", "marked_by": "T001"},
            ],
        )
        _insert_ignore(
            session,
            Notice,
            [
                {
                    "id": "N001",
                    "title": "Mechanics test",
                    "content": "Mechanics weekly test is on 20 Sep 2026.",
                    "date": date(2026, 9, 18),
                    "status": "active",
                }
            ],
        )
        session.commit()

        print("Demo rows in Supabase:")
        for model in (
            Batch,
            User,
            Student,
            Teacher,
            Subject,
            Chapter,
            Topic,
            Test,
            Question,
            Result,
            Attendance,
            Notice,
        ):
            count = session.scalar(select(func.count()).select_from(model))
            print(f"{model.__tablename__}: {count}")
    engine.dispose()


def _user(user_id: str, first: str, last: str, email: str, phone: str, role: str) -> dict:
    return {
        "id": user_id,
        "first_name": first,
        "last_name": last,
        "email": email,
        "password": DEMO_PASSWORD,
        "contact_number": phone,
        "role": role,
        "is_active": True,
    }


def _insert_ignore(session: Session, model, rows: list[dict]) -> None:
    statement = insert(model).values(rows).on_conflict_do_nothing()
    session.execute(statement)


if __name__ == "__main__":
    seed()
