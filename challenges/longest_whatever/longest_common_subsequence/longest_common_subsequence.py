
# https://www.codeeval.com/open_challenges/6/


def print_table(table, left, right):
    import copy
    table_copy = copy.deepcopy(table)
    table_copy.insert(0, list(' ' + right))

    for i, row in enumerate(table_copy):
        if i < 2:
            row.insert(0, ' ')
        else:
            row.insert(0, left[i - 2])

    for row in table_copy:
        print(' '.join(['{0:>2}'.format(str(cell)) for cell in row]))


def lcs(left, right):
    table = [[0 for _ in range(len(right) + 1)] for _ in range(len(left) + 1)]

    for i in range(1, len(left) + 1):
        for j in range(1, len(right) + 1):
            left_idx = prev_i = i - 1
            right_idx = prev_j = j - 1

            if left[left_idx] == right[right_idx]:
                # table[prev_i][prev_j] contains the length of the longest sub-sequence so far
                table[i][j] = table[prev_i][prev_j] + 1
            else:
                # if no match than carry over what we have until now
                table[i][j] = max(table[prev_i][j], table[i][prev_j])

    print_table(table, left, right)

    indexes = []
    size = table[-1][-1]
    prev_size_index = len(table[-1])

    # read the table from bottom right to top left
    # and select correct indexes which will be to the left of prev_size_index
    for row_num in range(len(table) - 1, -1, -1):
        if size == 0:
            break

        size_index = table[row_num].index(size)

        if size_index < prev_size_index:
            indexes.insert(0, size_index)

        prev_size_index = size_index

        # peek into prev row and eventually decrease size
        # if size at the same index (prev_size_index) will not be the same as current size
        # in other words try to keep the same size as much as possible
        if row_num - 1 >= 0 and table[row_num - 1][prev_size_index] != size:
            size -= 1

    return ''.join([right[idx - 1] for idx in indexes]).strip()


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

