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
"""

base = 256  # the base
prime = 101  # A prime number


def rabin_karp_search(txt, pat):
    pat_length = len(pat)
    txt_length = len(txt)
    i = 0
    j = 0
    p_hash = 0  # hash value for pattern
    t_hash = 0  # hash value for txt
    lead_digit = 1

    # The value of lead_digit would be "pow(base, pat_length-1)%prime"
    for i in range(pat_length - 1):
        lead_digit = (lead_digit * base) % prime

    # Calculate the hash value of pattern and first window
    # of text
    for i in range(pat_length):
        p_hash = (base * p_hash + ord(pat[i])) % prime
        t_hash = (base * t_hash + ord(txt[i])) % prime

    # Slide the pattern over text one by one
    for i in range(txt_length - pat_length + 1):
        # Check the hash values of current window of text and
        # pattern if the hash values match then only check
        # for characters on by one
        if p_hash == t_hash:
            # Check for characters one by one
            for j in range(pat_length):
                if txt[i + j] != pat[j]:
                    break

            # if p_hash == t_hash and pat[0...pat_length-1] = txt[i, i+1, ...i+pat_length-1]
            if j == pat_length - 1:
                return i

        # if end reached without any match
        if i == txt_length - pat_length:
            return - 1

        # Calculate hash value for next window of text: Remove
        # leading digit, add trailing digit
        # 234 to 345 => (234 – 2*100)*10 + 5
        t_hash = (((t_hash - ord(txt[i]) * lead_digit) * base) + ord(txt[i + pat_length])) % prime

        # We might get negative values of t_hash, converting it to
        # positive
        # https://torstencurdt.com/tech/posts/modulo-of-negative-numbers/
        if t_hash < 0:
            t_hash = t_hash + prime


print(rabin_karp_search('ABCCDAAEFGCDD', 'CDD'))
