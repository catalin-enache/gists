
"""
8 3 4     
1 5 9     
6 7 2
"""


def pprint(table):
    print('\n'.join(
        [''.join(['{:4}'.format(col) for col in row]) for row in table]
    ))


def perm(seq, k):
    stack = [([], seq[:])]
    while stack:
        head, tail = stack.pop()
        if len(head) == k:
            yield head
        else:
            for i in range(len(tail)):
                stack.append((head + [tail[i]], tail[:i] + tail[i+1:]))


def validate_magic_square(matrix):
    s, n = 15, 3

    rows_ok = all(el == s for el in [sum(row) for row in matrix])

    cols_ok = all(el == s for el in [sum([row[i] for row in matrix]) for i in range(n)])

    left_diag_ok = s == sum([matrix[i][i] for i in range(n)])

    right_diag_ok = s == sum([matrix[i][n - i - 1] for i in range(n)])

    if rows_ok and cols_ok and left_diag_ok and right_diag_ok:
        return matrix


def generate_magic_square():
    n = 3
    m_square = [[None] * n for _ in range(n)]
    for p in perm(list(range(1, n * n + 1)), n * n):
        for i in range(len(p)):
            m_square[i // n][i % n] = p[i]
        valid_square = validate_magic_square(m_square)
        if valid_square:
            # return valid_square  # return the first built valid square
            yield valid_square


MAGIC_SQUARE = [
    [8, 3, 4],
    [1, 5, 9],
    [6, 7, 2]
]


def _pre_req(matrix):
    rows_num, cols_num = len(matrix), len(matrix[0])
    result = [[0] * cols_num for _ in range(rows_num)]
    return rows_num, cols_num, result


def rotate_90(matrix):
    rows_num, cols_num, result = _pre_req(matrix)
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[col_i][rows_num - row_i - 1] = matrix[row_i][col_i]
    return result


def rotate_180(matrix):
    rows_num, cols_num, result = _pre_req(matrix)
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[rows_num - row_i - 1][cols_num - col_i - 1] = matrix[row_i][col_i]
    return result


def rotate_270(matrix):
    rows_num, cols_num, result = _pre_req(matrix)
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[cols_num - col_i - 1][row_i] = matrix[row_i][col_i]
    return result


def flip_vertically(matrix):
    rows_num, cols_num, result = _pre_req(matrix)
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[rows_num - row_i - 1][col_i] = matrix[row_i][col_i]
    return result


def flip_horizontally(matrix):
    rows_num, cols_num, result = _pre_req(matrix)
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[row_i][cols_num - col_i - 1] = matrix[row_i][col_i]
    return result


def transpose_1(matrix):
    rows_num, cols_num, result = _pre_req(matrix)
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[col_i][row_i] = matrix[row_i][col_i]
    return result


def transpose_2(matrix):
    rows_num, cols_num, result = _pre_req(matrix)
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[cols_num - col_i - 1][rows_num - row_i - 1] = matrix[row_i][col_i]
    return result


# works for non square matrix
def transpose_top_right(matrix):
    rows_num, cols_num = len(matrix), len(matrix[0])
    res_cols_num, res_rows_num = len(matrix), len(matrix[0])
    result = [[0] * res_cols_num for _ in range(res_rows_num)]
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[col_i][row_i] = matrix[row_i][col_i]
    return result


# works for non square matrix
def transpose_top_left(matrix):
    rows_num, cols_num = len(matrix), len(matrix[0])
    res_cols_num, res_rows_num = len(matrix), len(matrix[0])
    result = [[0] * res_cols_num for _ in range(res_rows_num)]
    for row_i in range(rows_num):
        for col_i in range(cols_num):
            result[res_rows_num - col_i - 1][res_cols_num - row_i - 1] = matrix[row_i][col_i]
    return result


magic_squares = [
    MAGIC_SQUARE,
    rotate_90(MAGIC_SQUARE),
    rotate_180(MAGIC_SQUARE),
    rotate_270(MAGIC_SQUARE),
    flip_vertically(MAGIC_SQUARE),
    flip_horizontally(MAGIC_SQUARE),
    transpose_1(MAGIC_SQUARE),
    transpose_2(MAGIC_SQUARE)
]


def magic_square_cost(mtrix, m_square):
    return sum([
        abs(m_square[r][c] - mtrix[r][c])
        for r in range(len(mtrix))
        for c in range(len(mtrix[r]))
    ])


def magic_square_min_cost(mtrix):
    return min(*[magic_square_cost(mtrix, m_square) for m_square in magic_squares])


if __name__ == '__main__':
    # for magic_square in generate_magic_square():
    #     pprint(magic_square)
    #     print('------------', bool(validate_magic_square(magic_square)))

    # for m_square in magic_squares:
    #     pprint(m_square)
    #     print('-------------------', bool(validate_magic_square(m_square)))

    print(magic_square_min_cost([
        [5, 3, 4],
        [1, 5, 8],
        [6, 4, 2],
    ]))  # 7
    print(magic_square_min_cost([
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 5],
    ]))  # 1
    print(magic_square_min_cost([
        [4, 8, 2],
        [4, 5, 7],
        [6, 1, 6],
    ]))  # 4


