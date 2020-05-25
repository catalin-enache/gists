
# inspired from:
# http://www.geeksforgeeks.org/iterative-tower-of-hanoi/
# http://www.ritambhara.in/non-recursive-solution-to-tower-of-hanoi/

import time
log = False


def legal_move(a, b):
    if len(a) == 0:
        a.append(b.pop())
        log and print(src, dest, aux)
    elif len(b) == 0:
        b.append(a.pop())
        log and print(src, dest, aux)
    else:
        if a[-1] < b[-1]:
            b.append(a.pop())
            log and print(src, dest, aux)
        else:
            a.append(b.pop())
            log and print(src, dest, aux)


def move(src, dest, aux):
    src_len = len(src)

    if src_len % 2 == 0:
        dest, aux = aux, dest

    for i in range(1, 2 ** src_len):
        if i % 3 == 1:
            legal_move(src, dest)
        elif i % 3 == 2:
            legal_move(src, aux)
        elif i % 3 == 0:
            legal_move(aux, dest)


src = list(reversed(range(3)))
dest = []
aux = []

moves = 2 ** len(src) - 1

print(src, dest, aux)
start = time.time()
move(src, dest, aux)
finish = time.time()
print(src, dest, aux)


print(moves, 'moves in', round((finish - start) * 1000), 'ms')

