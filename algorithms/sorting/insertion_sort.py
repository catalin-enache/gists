# sinks down the value at cursor (k)
def insertion_sort(seq):
    for k in range(1, len(seq)):
        cur = seq[k]
        j = k
        while j > 0 and seq[j-1] > cur:
            seq[j] = seq[j-1]
            j -= 1
        seq[j] = cur


arr = [2, 3, 5, 4, 2, 1, 1, 7, 6, 1, 8, 9]

insertion_sort(arr)

print(arr)
