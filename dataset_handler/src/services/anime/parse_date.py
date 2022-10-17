from datetime import datetime


def execute(date: str):
    date_formats = ["%b %d, %Y", "%b, %Y", "%Y"]

    for date_format in date_formats:
        try:
            return datetime.strptime(date, date_format).isoformat()
        except ValueError:
            pass
