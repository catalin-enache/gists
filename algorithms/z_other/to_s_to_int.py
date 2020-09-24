
d = {str(i): i for i in range(10)}
d2 = {i: str(i) for i in range(10)}


def to_int(s, i=None, total=0):
    i = i if i is not None else len(s) - 1
    if i == -1:
        return total
    power = len(s) - i - 1
    n = d[s[i]] * (10 ** power)
    return to_int(s, i - 1, total + n)


# [int(12345 * 1/b) % 10 for b in [10 ** i for i in range(5)]] => [5, 4, 3, 2, 1]
def to_s(n, s='', b=1):
    cn = int(n * 1/b) % 10
    if b > n:
        return s
    return to_s(n, d2[cn] + s, b * 10)


print(to_int('30412'))
print(to_s(30412))
