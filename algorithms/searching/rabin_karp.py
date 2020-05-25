# https://www.youtube.com/watch?v=qQ8vS2btsxI  9.2 Rabin-Karp String Matching Algorithm
# https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/
# https://www.programiz.com/dsa/rabin-karp-algorithm
# https://www.topcoder.com/community/competitive-programming/tutorials/introduction-to-string-searching-algorithms/

# https://brilliant.org/wiki/modular-arithmetic/
# if A * B = C => C mod N = A mod N * B mod N
# if A * A * A = C => C mod N = A mod N * A mod N * A mod N
# Math.pow(21, 9) % 17 // 4
# h = 1
# for (let i = 0; i < 9; i++) { h = (h * 21) % 17 } // h: 4

# https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/modular-multiplication
# (A + B) mod C = (A mod C + B mod C) mod C
# (A * B) mod C = (A mod C * B mod C) mod C
# A^B mod C = ( (A mod C)^B ) mod C

"""
This is simple mathematics, we compute decimal value of current window from previous window.
For example pattern length is 3 and string is “23456”
You compute the value of first window (which is “234”) as 234.
How how will you compute value of next window “345”? You will do (234 – 2*100)*10 + 5 and get 345.
"""

"""
def mod(a, b):
    return (((a % b) + b) % b)

def mod(a, b):
    c = a % b
    return c + b if c < 0 else c

def mod(a, n):
    return a - n * floor(a / n)
"""

d = 256  # the base
q = 101  # A prime number


def rabin_karp_search(txt, pat):
    M = len(pat)
    N = len(txt)
    i = 0
    j = 0
    p = 0  # hash value for pattern
    t = 0  # hash value for txt
    h = 1

    # The value of h would be "pow(d, M-1)%q"
    for i in range(M - 1):
        h = (h * d) % q

    # Calculate the hash value of pattern and first window
    # of text
    for i in range(M):
        p = (d * p + ord(pat[i])) % q
        t = (d * t + ord(txt[i])) % q

    # Slide the pattern over text one by one
    for i in range(N - M + 1):
        # Check the hash values of current window of text and
        # pattern if the hash values match then only check
        # for characters on by one
        if p == t:
            # Check for characters one by one
            for j in range(M):
                if txt[i + j] != pat[j]:
                    break

            # if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1]
            if j == M - 1:
                return i

        # if end reached without any match
        if i == N - M:
            return - 1

        # Calculate hash value for next window of text: Remove
        # leading digit, add trailing digit
        t = (d * (t - ord(txt[i]) * h) + ord(txt[i + M])) % q

        # We might get negative values of t, converting it to
        # positive
        # https://torstencurdt.com/tech/posts/modulo-of-negative-numbers/
        if t < 0:
            t = t + q


print(rabin_karp_search('ABCCDAAEFGCDD', 'CDD'))
