# other resources
# https://en.wikipedia.org/wiki/Heap%27s_algorithm
# https://www.topcoder.com/generating-permutations/


def odometer_permutations_countdown(seq):
    # https://quickperm.org/03example.html
    N = len(seq)
    p = list(range(N + 1))
    yield seq[:]
    i = 1
    while i < N:
        seq[0], seq[i] = seq[i], seq[0]
        yield seq[:]
        p[i] -= 1
        i = 1
        while p[i] == 0:
            p[i] = i
            i += 1


def permutations_rec_n(seq):
    if len(seq) == 1:
        yield seq

    else:
        head = seq[:1]
        tail = seq[1:]

        # for every tail permutation insert the head in all possible positions
        # ex: h 1 2 3   1 h 2 3   1 2 h 3  1 2 3 h
        for perm in permutations_rec_n(tail):
            for i in range(len(perm) + 1):
                new_perm = perm[:i] + head + perm[i:]
                yield new_perm


# this is not best nk recursive permutation
def perm_1(seq, k, tmp=None):
    """
    Building tmp from nothing to full.
    It doesn't stop until it builds tmp to have the same length as seq.
    But it only yields tmp when tmp length equals k.
    """
    tmp = tmp if tmp is not None else []
    if len(tmp) == k:
        yield tmp[:]
    for _ in range(len(seq)):
        tmp.append(seq.pop(0))
        for p in perm_1(seq, k, tmp):
            yield p
        # same as
        # yield from perm_1(seq, k, tmp)
        seq.append(tmp.pop())


# better than perm_1 regarding number of recursions when k < len(seq)
# this is best recursive permutation nk
def permutations_rec_nk(seq, k):
    """
    Starts at k and stops at 0 (top to bottom approach)
    """
    # if k == 1:
    #     for e in seq:
    #         yield [e]

    # also works with
    if k == 0:
        yield []

    # [1, 2, 3, 4]
    # [2] and [1, 3, 4]
    # for every <permutation> of [1, 3, 4]
    # new_perm = [2] + <permutation>

    else:
        for _ in range(len(seq)):
            current = seq.pop(0)
            rest = seq
            for perm in permutations_rec_nk(rest, k - 1):
                new_perm = [current] + perm
                yield new_perm
            seq.append(current)


def permutations_rec_nk_2(seq, k):
    if k == 0:
        yield []
    for i, left in enumerate(seq):
        right = seq[:i] + seq[i+1:]
        for perm in permutations_rec_nk_2(right, k - 1):
            yield [left] + perm


def permutations_nk_using_stack(seq, k=None):
    k = k if k is not None else len(seq)
    stack = [([], seq[:])]

    while not len(stack) == 0:
        head, tail = stack.pop(0)  # or just pop but will reverse

        if len(head) == k:
            yield head
        else:
            # for i in range(len(tail) - 1, -1, -1):  # ASC
            for i in range(len(tail)):  # DESC
                new_head = head + [tail[i]]
                new_tail = tail[:i] + tail[i + 1:]
                stack.append([new_head, new_tail])


def itertools_impl_odometer_permutations_dec(n, k):
    """
    https://docs.python.org/3/library/itertools.html#itertools.permutations
    Python itertools implementation
    permutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
    permutations(range(3)) --> 012 021 102 120 201 210

    permutation is driven by cursor_position and value_at_cursor_position
    the switch is done between cursor_position and n - value_at_cursor_position
    rotation is done when value_at_cursor_position == 0
    """
    indices = list(range(n))
    odometer = list(range(n, n-k, -1))
    # odometer = [n - cursor_position for cursor_position in range(k)]
    odometer_cursor_positions = list(reversed(range(k)))
    yield indices[:k]
    while True:
        for cursor_position in odometer_cursor_positions:
            odometer[cursor_position] -= 1

            if odometer[cursor_position] == 0:
                # when cycles[position] reaches 0
                # rotate indices
                # indices[cursor:] = indices[cursor + 1:] + indices[cursor:cursor + 1]
                indices.append(indices.pop(cursor_position))
                # reset odometer value at cursor_position
                # to max allowed for this position
                odometer[cursor_position] = n - cursor_position
                # cursor_position will decrease

            else:
                left = cursor_position
                # how far right to swap ? depends on odometer value_at_cursor_position
                # calculate far right by subtracting odometer value_at_cursor_position from n
                # right position will increase until reaching n (length of indices)
                # which will trigger a rotation
                right = n - odometer[cursor_position]
                indices[left], indices[right] = indices[right], indices[left]
                yield indices[:k]
                break
        else:
            break


def itertools_impl_odometer_permutations_inc(n, k):
    # following the model from itertools_impl_odometer_permutations_dec
    # but increasing the odometer
    indices = list(range(n))
    odometer = list(range(k))
    odometer_cursor_positions = list(reversed(range(k)))
    yield indices[:k]
    while True:
        for cursor_position in odometer_cursor_positions:
            odometer[cursor_position] += 1
            if odometer[cursor_position] == n:
                indices.append(indices.pop(cursor_position))
                odometer[cursor_position] = cursor_position
            else:
                left = cursor_position
                right = odometer[cursor_position]
                indices[left], indices[right] = indices[right], indices[left]
                yield indices[:k]
                break
        else:
            return


# import itertools
# perms = list(itertools.permutations(tuple(range(4)), 3))
perms = list(itertools_impl_odometer_permutations_dec(4, 3))
# perms = list(itertools_impl_odometer_permutations_inc(4, 3))
# perms = list(perm_1([0, 1, 2], 2))
# perms = list(permutations_rec_nk([0, 1, 2], 2))
# perms = list(permutations_nk_using_stack([0, 1, 2], 2))
# perms = list(permutations_rec_n([0, 1, 2, 3]))
# perms = list(odometer_permutations_countdown([0, 1, 2, 3]))


print(len(perms))
print(perms)


def next_permutation(L):
    # https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-implementation/
    # https://www.youtube.com/watch?v=quAS1iydq7U
    # https://github.com/bephrem1/backtobackswe/blob/3b21637af6f9be6d1d32dcef94c8a3c04d74cefa/Arrays%2C%20Primitives%2C%20Strings/NextPermutation/NextPermutation.java

    n = len(L)

    i = n - 2
    # from right to left find the index of item
    # before the strictly decreasing section
    # 62<1>5430
    while i >= 0 and L[i] >= L[i + 1]:
        i -= 1

    if i == -1:
        return False

    # from i to right find the index of first item greater than item at i
    # 62<1>54<3>0
    j = i + 1
    while j < n and L[j] > L[i]:
        j += 1
    j -= 1

    # swap value at i with value at j
    # 62<3>54<1>0
    L[i], L[j] = L[j], L[i]

    # the section to the right of i is strictly decreasing (at its last permutation)
    # make it be at it first permutation by reversing it
    # 62<3>0145
    left = i + 1
    right = n - 1
    while left < right:
        L[left], L[right] = L[right], L[left]
        left += 1
        right -= 1

    return True


L = [2, 0, 3, 1]
print(L)
next_permutation(L)
print(L)


