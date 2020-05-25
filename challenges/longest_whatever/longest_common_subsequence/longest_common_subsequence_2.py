
def print_table(table, left, right):
    import copy
    table_copy = copy.deepcopy(table)
    table_copy.insert(0, list(right))

    for i, row in enumerate(table_copy):
        if i == 0:
            row.insert(0, ' ')
        else:
            row.insert(0, left[i - 1])

    for row in table_copy:
        print(' '.join(['{0:>2}'.format(str(cell)) for cell in row]))


def lcs(s1, s2):
    table = [[0] * (len(s2)) for _ in range(len(s1))]

    # build table
    for i in range(len(s1)):
        for j in range(len(s2)):
            if s1[i] == s2[j]:
                prev_val = 0 if i == 0 or j == 0 else table[i-1][j-1]
                table[i][j] = 1 + prev_val
            else:
                table[i][j] = max(table[i][j-1], table[i-1][j])

    print_table(table, s1, s2)

    # read table
    i = len(table) - 1
    j = len(table[0]) - 1
    c = table[i][j]
    result = []
    while c > 0:
        while j >= 0 and table[i][j] == c:
            j -= 1
        j += 1

        while i >= 0 and table[i][j] == c:
            i -= 1
        i += 1

        result.append(s2[j])
        c -= 1
        i -= 1

    return ''.join(reversed(result))


tests = [
    'a01b012c;de0f1g2h',  # 012
    'thisisatest;testing123testing',  # tsitest
    'the quick brown fox;the fast brown dogs',  # the  brown o
    'hello world mordor;zlord of the rings',  # lord or

    'XHQXOLHZVXGTI;YNJNCNVIVHFIDKLTUW',  # HLT

    'XMJYAUZ;MZJAWXU',  # MJAU
    'AxBxCx;ABC',  # ABC
    'ABC;AxBxCx',  # ABC
    'abcde;xaybjckdle',  # abcde
    'xaybjckdle;abcde',  # abcde
    'ronaldo;ronaldo',  # ronaldo
    'aybcdoocbdx;xabcdy',  # abcd
    'ABBDCACB;BCACDBBA'  # BCACB longest palindromic sub-sequence
]

# print(lcs(*tests[1].split(';')))

for test in tests:
    print(lcs(*test.split(';')))
