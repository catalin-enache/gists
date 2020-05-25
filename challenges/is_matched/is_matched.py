
def is_matched(seq):
    matches = {
        '{': '}',
        '[': ']',
        '(': ')'
    }
    chars = matches.keys() | matches.values()
    stack = []
    for c in seq:
        if c not in chars:
            continue
        if c in matches:
            stack.append(c)
        else:
            if len(stack) == 0:
                return False
            elif matches[stack.pop()] != c:
                return False
    return len(stack) == 0


a = '{[1 + 2 + (3 + 4)] + ([6 + 7] + 2 + { 3 + [8 * 5]})}'
b = '{[1 + 2 + (3 + 4)] + ([6 + 7  + 2 + { 3 + [8 * 5]})}'

print(is_matched(a))
print(is_matched(b))

