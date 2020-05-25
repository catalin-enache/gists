import sys, os
sys.path.append(os.path.join(os.path.dirname(sys.path[0]), 'utils'))
from helpers import bench
from itertools import permutations

problems = [
    ('pot', 'pan', 'pib'),
    ('dog', 'cat', 'pig'),
    ('boy', 'girl', 'baby'),
    ('send', 'more', 'money'),
    ('hocus', 'pocus', 'presto'),
    ('one', 'two', 'four', 'seven')
]

PROBLEM_TO_SOLVE = 3


def solution_iterative_2(t1, t2, res):
    d = {c: None for c in t1 + t2 + res}

    def to_num(exp, d):
        return ''.join([str(d[char]) for char in exp])

    for p in permutations(range(10), len(d)):
        for i, k in enumerate(d.keys()):
            d[k] = p[i]
        n1, n2, n3 = to_num(t1, d), to_num(t2, d), to_num(res, d)
        if int(n1) + int(n2) == int(n3):
            yield (n1 + ' + ' + n2 + ' = ', n3)


with bench('solution_iterative_2'):
    count = 0
    for sol in solution_iterative_2(*problems[PROBLEM_TO_SOLVE]):
        count += 1
        # print(sol)
    print('total solutions: {}'.format(count))


# using external permutation generator (native)
def solution_iterative(problem):
    char_set = set(''.join(problem))
    perms = permutations(range(10), len(char_set))
    for perm in perms:
        char_map = dict(zip(char_set, perm))
        str_terms = [''.join([str(char_map[ch]) for ch in word]) for word in problem]
        int_terms = [int(term) for term in str_terms]
        if sum(int_terms[:-1]) == int_terms[-1]:
            yield str_terms


with bench('solution_iterative'):
    count = 0
    for sol in solution_iterative(problems[PROBLEM_TO_SOLVE]):
        count += 1
        # print(sol)
    print('total solutions: {}'.format(count))

# problem 3: send + more = money
# ...
# ['8542', '0915', '09457']
# ['9567', '1085', '10652']

# problem 5: one + two + four = seven
# ...
# ['368', '423', '7395', '08186']
# ['863', '478', '1895', '03236']


# generating permutations internally
def solution_recursive(problem, k=None, char_set=None, perm=(), nums=(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)):
    char_set = char_set if char_set is not None else set(''.join(problem))
    k = k if k is not None else len(char_set)

    # if permutation complete check solution
    if k == 0:
        char_map = dict(zip(char_set, perm))
        str_terms = [''.join([str(char_map[ch]) for ch in word]) for word in problem]
        int_terms = [int(term) for term in str_terms]
        if sum(int_terms[:-1]) == int_terms[-1]:
            yield str_terms

    # generate permutations
    for _ in nums:
        perm += (nums[0],)
        nums = nums[1:]
        for solution in solution_recursive(problem, k - 1, char_set, perm, nums):
            yield solution  # solution here is the eventually yielded "str_terms"
        nums += (perm[-1],)
        perm = perm[:-1]


with bench('solution_recursive'):
    count = 0
    for solution in solution_recursive(problems[PROBLEM_TO_SOLVE]):
        count += 1
        # print(solution)
    print('total solutions: {}'.format(count))
