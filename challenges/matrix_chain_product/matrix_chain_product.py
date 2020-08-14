
# https://www.youtube.com/watch?v=_WncuhSJZyA (Abdul Bari)
# https://www.youtube.com/watch?v=prx1psByp7U (Abdul Bari)
# https://www.youtube.com/watch?v=eKkXU3uu2zk (Abdul Bari)

# Ni,j = min {Ni,k + Nk+1,j + d[i]*d[k+1]*d[j+1]}
#        i≤k<j

def matrix_chain(d):
    """
    d is a list of n+1 numbers such that size of kth matrix is d[k]-by-d[k+1]
    Return an n-by-n table such that N[i][j] represents the minimum number of
    multiplications needed to compute the product of Ai through Aj inclusive.
    """
    n = len(d) - 1  # number of matrices
    dp = [[None] * n for _ in range(n)]
    for rng in range(n):  # subset size or number of matrices in subset
        for i in range(n - rng):  # i, j, k point to logical matrices i <= k < j
            j = i + rng
            if i == j:
                dp[i][j] = 0  # 0 cost for same matrix
                print('rng', rng, 'i', i, 'j', j, 'k', [k for k in range(i, j)])
            else:
                print('rng', rng, 'i', i, 'j', j, 'k', [k for k in range(i, j)])
                # d[i] means first dimension of first matrix in current range
                # d[k + 1] means first dimension of first matrix in last/right subset
                # (or last dimension of last matrix in first/left subset) in current range
                # d[j + 1] means last dimension of last matrix in current range
                # for parentheses places k must be saved in another table
                dp[i][j] = min(
                    [dp[i][k] + dp[k + 1][j] + d[i] * d[k + 1] * d[j + 1] for k in range(i, j)]
                )
    print(dp)
    return dp[0][len(dp[0]) - 1]

#                              A0  A1  A2
# 2 x 10, 10 x 50, 50 x 20 => 2, 10, 50, 20
#   0       1     2
# 0 [[0,   1000, 3000], # 3000
# 1 [None,    0, 10000],
# 2 [None, None,     0]]
print(matrix_chain((2, 10, 50, 20)))

#                                A0 A1 A2 A3
# 3 x 2, 2 x 4, 4 x 2, 2 x 5 => 3, 2, 4, 2, 5
#       0    1     2     3
#   0 [[0,  24,   28,   58], # 58
#   1 [None, 0,   16,   36],
#   2 [None, None, 0,   40],
#   3 [None, None, None, 0]]
print(matrix_chain((3, 2, 4, 2, 5)))
