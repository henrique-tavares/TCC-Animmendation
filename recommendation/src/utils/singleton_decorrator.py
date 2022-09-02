def singleton(cls):
    instances = dict()

    def instance(*args):
        if cls not in instances:
            instances[cls] = cls(*args)
        return instances[cls]

    return instance
