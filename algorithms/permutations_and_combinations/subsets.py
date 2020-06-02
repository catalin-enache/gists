import sys, os
from typing import List
# sys.path.append(os.path.join(os.path.normpath(os.path.dirname(sys.path[0]) + '/..'), 'utils'))
from helpers import bench


# maximum (2 ** n) - 1
def subsets_binary_1(n):
    maximum = 1 << n
    for config in range(maximum):
        subset = []
        # find positions of ones in config by moving position
        for position in range(n):
            if config & (1 << position):
                subset.append(position)
        yield subset


# maximum (2 ** n) - 1
def subsets_binary_2(n):
    """
    Every number from 1 to 2 ** n generates a subset.
    One number at a time is recursively divided by 2
    and every time the number is odd is collected
    into the subset as the position increases.
    ex:
    7 is odd - add position 0
    7 // 2 = 3 is odd - add position 1
    3 // 2 = 1 is odd - add position 2
    1 // 2 = 0 - done {0, 1, 2}
    ---
    6 is not odd - don't add this position
    6 // 2 = 3 is odd - add position 1
    3 // 2 = 1 is odd - add position 2
    1 // 2 = 0 - done {1, 2}
    """
    maximum = 1 << n
    for config in range(maximum):
        position = 0
        subset = []
        # find positions of ones in config by squeezing config
        while config > 0:
            if config % 2 == 1:  # config % 2 == 1 eq with config & 1
                # collect into subset the positions where num is odd
                # for every num := num //= 2
                subset.append(position)
            position += 1
            config //= 2  # config //= 2 eq with config >>= 1
        if len(subset) > 0:
            yield subset


# total (2 ** n) - 1
def subsets_rec(seq):
    if len(seq) == 1:
        yield seq  # last item in initial sequence => initSeq[-1]
    else:
        head = seq[:1]
        tail = seq[1:]
        yield head  # [0], [1], [2], [3]
        for subset in subsets_rec(tail):
            yield subset  # bubble prev subsets up
            yield head + subset  # compute new subsets


# https://leetcode.com/articles/subsets/
def subsets_iter(seq: List[int]) -> List[List[int]]:
    stack = [[]]
    for el in seq:
        # for i in range(len(stack)):
        #     stack.append([el] + stack[i])
        stack += [curr + [el] for curr in stack]
    return stack


N = 4

with bench('subsets_binary_1'):
    _subsets = list(subsets_binary_1(N))
    print(_subsets)
    print(len(_subsets))

with bench('subsets_binary_2'):
    _subsets = list(subsets_binary_2(N))
    print(_subsets)
    print(len(_subsets))

with bench('subsets_rec'):
    _seq = list(range(N))
    _subsets = list(subsets_rec(_seq))
    print(_subsets)
    print(len(_subsets))

with bench('subsets_iter'):
    _seq = list(range(N))
    _subsets = list(subsets_iter(_seq))
    print(_subsets)
    print(len(_subsets))

