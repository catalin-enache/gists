def fib_1_recursive(n, a=0, b=1):
    if n == 1:
        return a, b
    return fib_1_recursive(n - 1, b, a + b)


def fib_2_recursive(n):
    if n == 1:
        return 0, 1
    a, b = fib_2_recursive(n - 1)
    return b, a + b


def fib_3_iterative(n):
    a, b = 0, 1
    for i in range(n - 1):
        a, b = b, a + b
    return a, b


def fib_4_dp_mem(n, lookup=None):
    lookup = lookup if lookup is not None else [None] * (n + 1)
    if lookup[n] is None:
        if n <= 1:
            lookup[n] = n
        else:
            lookup[n] = fib_4_dp_mem(n - 1) + fib_4_dp_mem(n - 2)
    return lookup[n]


def fib_4_dp_tab(n):
    table = [0] * (n + 1)
    table[1] = 1
    for i in range(2, n + 1):
        table[i] = table[i - 1] + table[i - 2]
    return table[n]


print(fib_1_recursive(7))
print(fib_2_recursive(7))
print(fib_3_iterative(7))
print(fib_4_dp_mem(7))
print(fib_4_dp_tab(7))
