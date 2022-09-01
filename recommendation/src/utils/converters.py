def boolify(value: str) -> bool:
    match value.lower():
        case "true":
            return True
        case "false":
            return False
        case _:
            raise ValueError("Invalid Value")
