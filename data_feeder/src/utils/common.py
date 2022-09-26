def handle_unknown(text: str):
    if text == "Unknown":
        return None
    return text


def handle_integer_conversion(text: str):
    if handle_unknown(text) is None:
        return None

    try:
        return int(text)
    except ValueError:
        return None
