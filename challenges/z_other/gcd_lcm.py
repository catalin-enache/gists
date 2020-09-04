# greatest common divisor

def gcd_1(a, b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a


def gcd_2(a, b):
    while a != b and b != 0 and a != 0:
        if a > b:
            a = a % b
        else:
            b = b % a
    return a if a > b else b


def gcd_3(a, b):
    if not a or not b:
        return a or b
    _min = a if a < b else b
    _max = a if a > b else b
    return gcd_3(_min, _max % _min)


# O(log(min(a, b)))
def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)


# lowest common multiple
# formula: a * b = gcd(a, b) * lcm(a, b)
def lcm(a, b):
    return (a * b) / gcd(a, b)


print(gcd_1(1680, 640))
print(gcd_1(640, 1680))
print(gcd_2(1680, 640))
print(gcd_2(640, 1680))
print(gcd_3(640, 1680))
print(gcd_3(1680, 640))
print(gcd(640, 1680))
print(gcd(1680, 640))
print(lcm(4, 6))


