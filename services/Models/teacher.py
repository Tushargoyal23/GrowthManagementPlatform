from dataclasses import dataclass, field

from services.Models.user import User


@dataclass
class Teacher(User):
    subject: list[str] = field(default_factory=list)
    batches: list[str] = field(default_factory=list)

# Example usage:
# teacher = Teacher(
#     id="T001",
#     first_name="Riya",
#     last_name="Verma",
#     email="riya@example.com",
#     password="secret123",
#     contact_number="+91-9988776655",
#     role="teacher",
#     subject="Physics",
#     batches=["Batch A", "Batch B"],
# )
