from dataclasses import dataclass, field


@dataclass
class Batch:
    id: str
    name: str
    start_date: str = ""
    end_date: str = ""
    status: str = "active"


# Example usage:
# batch = Batch(
#     id="B001",
#     name="Physics-2026-A",
#     start_date="2026-09-01",
#     end_date="2026-12-31",
#     status="active",
# )
