
def find_boyer_moore(text, patt):
    n, m = len(text), len(patt)
    if m == 0:
        return 0
    last = {}
    for _ in range(len(patt)):
        last[patt[_]] = _
    i, k = m - 1, m - 1
    while i < n:
        if text[i] == patt[k]:
            if k == 0:
                return i
            i -= 1
            k -= 1
        else:
            # j = last[text[i]] if text[i] in last else - 1
            # equivalent with
            j = last.get(text[i], -1)
            i += m - (j + 1) if j < k else m - k  # (m - k is how far i moved to the left + 1)
            # equivalent with
            # i += m - min(k, j + 1)  # case analysis for jump step or
            k = m - 1


def find_boyer_moore_2(text, patt):
    n, m = len(text), len(patt)
    if m == 0:
        return 0
    last = {}
    for _ in range(len(patt)):
        last[patt[_]] = _
    indexes = []
    shift = 0

    while shift <= n - m:
        k = m - 1
        while k >= 0 and patt[k] == text[shift + k]:
            k -= 1
        if k < 0:
            indexes.append(shift)
            # continue over
            if shift + m < n:
                next_char_last_occ = last.get(text[shift + m], -1)
                shift += m - next_char_last_occ
            else:
                shift += 1
        else:
            last_bad_char_occ = last.get(text[shift + k], -1)
            # shift += max(1, k - last_bad_char_occ)
            shift += k - last_bad_char_occ if last_bad_char_occ < k else 1
    return indexes


# print(find_boyer_moore('accaccab', 'accab'))
# print(find_boyer_moore('stringmatchingmat', 'ingmat'))
# print(find_boyer_moore_2('accaccab', 'accab'))
# print(find_boyer_moore_2('stringmatchingmat', 'ingmat'))
print(find_boyer_moore('xxxbcbabcba', 'abcba'))
print(find_boyer_moore_2('xxxbcbabcba', 'abcba'))
