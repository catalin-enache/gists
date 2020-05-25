
moves = 0


def hanoi_1(_src, _dst, _aux, n=None):
    global moves
    n = n if n is not None else len(_src)
    if n == 2:
        _aux.append(_src.pop())
        _dst.append(_src.pop())
        _dst.append(_aux.pop())
        moves += 3
        return

    hanoi_1(_src, _aux, _dst, n - 1)
    _dst.append(_src.pop())
    moves += 1
    hanoi_1(_aux, _dst, _src, n - 1)


# number of moves is (2 ** n) - 1
def hanoi_2(_src, _dst, _aux, n=None):
    global moves
    if n == 1:
        moves += 1
        _dst.append(_src.pop())
        print(src, tmp, dst)
        return

    # move all but last to tmp
    hanoi_2(_src, _aux, _dst, n - 1)
    # move last to dst
    hanoi_2(_src, _dst, _aux, 1)
    # move tmp to dst
    hanoi_2(_aux, _dst, _src, n - 1)


src = [3, 2, 1]
tmp = []
dst = []

hanoi_2(src, tmp, dst, len(src))

print('----------------------- moves', moves)
print(src, tmp, dst)
