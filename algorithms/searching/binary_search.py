
def binary_search_rec_1(data, target, low=0, high=None):
    high = high if high is not None else len(data) - 1
    if low > high:
        return -1
    mid = (low + high) // 2
    if target == data[mid]:
        return mid
    elif target < data[mid]:
        return binary_search_rec_1(data, target, low, mid - 1)
    else:
        return binary_search_rec_1(data, target, mid + 1, high)


def binary_search_rec_2(seq, x, low = 0, high = None):
    high = high if high is not None else len(seq) - 1
    mid = (low + high) // 2

    if x == seq[mid]:
        return mid

    if x > seq[mid]:
        return binary_search_rec_2(seq, x, mid + 1, high)

    if x < seq[mid]:
        return binary_search_rec_2(seq, x, 0, mid - 1)

    return -1


def binary_search_iterative(data, target):
    low = 0
    high = len(data) - 1
    while low <= high:
        mid = (low + high) // 2
        if target == data[mid]:
            return mid
        elif target < data[mid]:
            high = mid - 1
        else:
            low = mid + 1
    return -1


def binary_search_iter_2(seq, x):
    low = 0
    high = len(seq) - 1
    mid = (low + high) // 2

    if x == seq[mid]:
        return mid

    while x != seq[mid] and low <= high:
        if x > seq[mid]:
            low = mid + 1
        else:
            high = mid - 1
        mid = (low + high) // 2

    return mid if low <= high else - 1


print(binary_search_rec_1((1, 3, 4, 6, 7, 9, 12), 12))
print(binary_search_rec_2((1, 3, 4, 6, 7, 9, 12), 12))
print(binary_search_iterative((1, 3, 4, 6, 7, 9, 12), 12))
print(binary_search_iter_2((1, 3, 4, 6, 7, 9, 12), 12))
