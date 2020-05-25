
def string_reverse(s):
    return s if len(s) <= 1 else s[-1] + string_reverse(s[1:-1]) + s[0]


def string_reverse_iterative(s):
    s = list(s)
    start, stop = 0, len(s) - 1
    while start < stop:
        s[start], s[stop] = s[stop], s[start]
        start, stop = start + 1, stop - 1
    return ''.join(s)

print(string_reverse('abcdefgh'))
print(string_reverse_iterative('abcdefgh'))
