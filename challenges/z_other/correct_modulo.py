
# note: Python already does this natively but JavaScript doesn't.


def mod_1(a, b):
    return ((a % b) + b) % b


def mod_2(a, b):
    c = a % b
    return c + b if c < 0 else c


if __name__ == "__main__":
    assert mod_1(1, 5) == 1
    assert mod_2(1, 5) == 1
    assert mod_1(-1, 5) == 4
    assert mod_2(-1, 5) == 4
