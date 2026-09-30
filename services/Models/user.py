from dataclasses import dataclass, field


@dataclass
class User:
    id: str
    first_name: str
    last_name: str
    email: str
    password: str
    contact_number: str
    role: str
    created_at: str = field(default="")
    is_active: bool = field(default=True)


# Base class for shared user fields used by login/signup and profile logic
