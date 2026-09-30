from dataclasses import dataclass


@dataclass
class Subject:
    id: str
    name: str
    description: str = ""


# Example usage:
# subject = Subject(
#     id="SUB-101",
#     name="Physics",
#     description="Mechanics and electricity",
# )
