# https://norvig.com/sudoku.html
# http://magictour.free.fr/top95
# Data Structures and Algorithms with Python

from copy import deepcopy


def print_matrix(mtx):
    print('-' * 107)
    for j, row in enumerate(mtx):
        for k, cell in enumerate(row):
            for i, num in enumerate(cell):
                print(num, end='')
            if i < 8:
                print(' ' * (8 - i), end='')
            if (k + 1) % 3:
                print('   ', end='')
            else:
                print(' | ', end='')
        print('')
        if (j + 1) % 3 == 0:
            print('-' * 107)


def build_matrix(s):
    mtx = [[None] * 9 for _ in range(9)]
    one_to_nine_set = set([1, 2, 3, 4, 5, 6, 7, 8, 9])
    for i, num in enumerate(s):
        row = i // 9
        col = i % 9
        mtx[row][col] = set(one_to_nine_set) if num == '.' else set([int(num)])
    return mtx


def get_rows(mtx):
    return [row for row in mtx]


def get_cols(mtx):
    cols = []
    for i in range(9):
        col = []
        for row in mtx:
            col.append(row[i])
        cols.append(col)
    return cols


def get_squares(mtx):
    squares = [[] for _ in range(9)]
    for row_i in range(9):
        squares_row = row_i // 3
        for col_i in range(9):
            squares_col = col_i // 3
            squares[3 * squares_row + squares_col].append(mtx[row_i][col_i])
    return squares


def get_groups(mtx):
    return get_rows(mtx) + get_cols(mtx) + get_squares(mtx)


def reduce_rule_1(group):
    """
    If there are N identical sets, each having N cardinality,
    from the rest of the sets in group remove numbers found in those N identical sets.
    """
    reduced = False
    for i in range(9):
        curr = group[i]
        similar = [curr]
        for j in range(i + 1, 9):
            other = group[j]
            if curr == other:
                similar.append(other)
        # if number of similar == cardinality of current
        # remove items in current from the rest of sets in the group that are not in similar
        if len(curr) == len(similar):
            for _set in group:
                if len(_set) != len(curr) and len(_set) > 1:
                    reduced = reduced or _set - curr != _set
                    _set -= curr
            if reduced:
                return reduced
    return False


def reduce_rule_2(cell, group):
    """
    Make a clone of cell and
    remove from that clone the numbers found in the rest of cells in the group
    If only a single number remains in the clone, update the cell to that single number.
    """
    if len(cell) == 1:
        return False  # cannot reduce further
    reduced = False
    clone = set(cell)
    for _set in group:
        if cell is _set:
            continue
        clone -= _set
    if len(clone) == 1:
        reduced = True
        cell &= clone
    return reduced


def reduce_group(group):
    reduced = reduce_rule_1(group)
    for cell in group:
        reduced = reduced or reduce_rule_2(cell, group)
    return reduced


def reduce_groups(groups):
    reduced = False
    for group in groups:
        reduced = reduced or reduce_group(group)
    return reduced


def reduce(mtx):
    changed = True
    groups = get_groups(mtx)
    while changed:
        changed = reduce_groups(groups)


def solution_viable(mtx):
    for i in range(9):
        for j in range(9):
            if len(mtx[i][j]) == 0:
                return False
    return True


def solution_ok(mtx):
    model_group = [{1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}]
    for group in get_groups(mtx):
        for _set in group:
            if _set not in model_group:
                return False
    return True


def dfs_solve(mtx):
    reduce(mtx)

    if not solution_viable(mtx):
        return None

    if solution_ok(mtx):
        return mtx

    for i in range(9):
        for j in range(9):
            if len(mtx[i][j]) > 1:
                for k in mtx[i][j]:
                    mcopy = deepcopy(mtx)
                    mcopy[i][j] = set([k])
                    result = dfs_solve(mcopy)

                    if result is not None:
                        return result

    return None


probs = [
    '.............1..92.86....4...156.........362.......5.7.3.....8..9.8.2.....7..43..',  # easy
    '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......',  # hard
    # https://usatoday30.usatoday.com/news/offbeat/2006-11-06-sudoku_x.htm
    '85...24..72......9..4.........1.7..23.5...9...4...........8..7..17..........36.4.',
    # https://www.mirror.co.uk/news/weird-news/worlds-hardest-sudoku-can-you-242294
    '..53.....8......2..7..1.5..4....53...1..7...6..32...8..6.5....9..4....3......97..',  # hard
    # https://norvig.com/sudoku.html
    '.....6....59.....82....8....45........3........6..3.54...325..6..................'  # hard
]


matrix = build_matrix(probs[4])
print_matrix(matrix)
reduce(matrix)
print('reduced')
print_matrix(matrix)
if not solution_ok(matrix):
    print('using dfs')
    print_matrix(dfs_solve(matrix))

