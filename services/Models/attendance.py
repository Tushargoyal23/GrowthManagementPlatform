from dataclasses import dataclass
from datetime import date
from enum import Enum

class AttendanceStatus(str, Enum):
    PRESENT = "present"
    ABSENT = "absent"
    LATE = "late"

@dataclass
class Attendance:
    id: str
    student_id: str
    date: date
    status: AttendanceStatus
    marked_by: str = ""     