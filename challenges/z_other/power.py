

# O(n)
def power(n, p):
    if p == 0:
        return 1
    return n * power(n, p - 1)


# O(log n)
def power_adv(n, p):
    if p == 0:
        return 1
    partial = power_adv(n, p // 2)
    result = partial * partial
    if p % 2 == 1:
        result *= n
    return result

print(power(4, 3))
print(power_adv(4, 3))
