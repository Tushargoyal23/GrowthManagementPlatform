from dataclasses import dataclass

@dataclass
class notice:
    id: str
    title: str
    content: str = ""
    date: str = ""
    status: str = "active"