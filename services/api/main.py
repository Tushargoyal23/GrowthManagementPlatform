from fastapi import Depends, FastAPI
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from services.db.session import get_session
from services.db.tables import Batch, Student, User

app = FastAPI(title="GMP")


class StudentResponse(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: str
    contact_number: str
    batch_id: str
    batch_name: str
    is_active: bool


@app.get("/students", response_model=list[StudentResponse])
def get_students(session: Session = Depends(get_session)) -> list[StudentResponse]:
    rows = session.execute(
        select(User, Student.batch_id, Batch.name)
        .join(Student, Student.id == User.id)
        .join(Batch, Batch.id == Student.batch_id)
        .order_by(User.first_name, User.last_name)
    ).all()
    return [
        StudentResponse(
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            contact_number=user.contact_number,
            batch_id=batch_id,
            batch_name=batch_name,
            is_active=user.is_active,
        )
        for user, batch_id, batch_name in rows
    ]
