
def reverse(seq, start):
    end = len(seq) - 1
    while start < end:
        seq[start], seq[end] = seq[end], seq[start]
        start += 1
        end -= 1

def next_permutation(seq, start_over = False):
    # start at second to last
    i = len(seq) - 2

    # find pivot index
    while i >= 0 and seq[i] >= seq[i + 1]:
        i -= 1

    # eventually return if we are at the last permutation (i == -1)
    if i < 0 and not start_over:
        return False

    # find index of next greater (than pivot) element to the right
    if i >= 0:
        j = len(seq) - 1
        while j >= 0 and seq[j] <= seq[i]:
            j -= 1

        # swap pivot with next greater element to the right
        seq[i], seq[j] = seq[j], seq[i]

    # reverse the elements to the right of pivot index (which are now in decreasing order)
    # to set the right side in its first permutation position (increasing order)
    reverse(seq, i + 1)
    return True


if __name__ == '__main__':
    a = [1, 2, 3]
    print(a)
    while next_permutation(a, start_over=False):
        print(a)

    def all_possible_strings(chars):
        d = {char: idx for [char, idx] in enumerate(chars)}
        seq = list(range(len(chars)))

        def seq_to_string():
            return ''.join([d[idx] for idx in seq])

        print(seq_to_string())
        while next_permutation(seq):
            print(seq_to_string())

    all_possible_strings(['c', 'a', 't', 'd', 'o', 'g'])