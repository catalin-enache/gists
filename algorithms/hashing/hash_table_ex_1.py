
import random
import functools
import pprint
pp = pprint.PrettyPrinter()

# http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/Map/hash-func.html
# https://www.cpp.edu/~ftang/courses/CS240/lectures/hashing.htm
# https://brilliant.org/wiki/modular-arithmetic/


def polynomial_hash(key, length):
    prime = 37  # 33, 37, 39, 41
    # return functools.reduce(lambda acc, item: (acc + prime * acc + ord(item)) % length, iter(str(key)), 0)
    return functools.reduce(lambda acc, item: (prime * acc + ord(item)) % length, iter(str(key)), 0)


def cyclic_shift_hash(key, length):
    prime = 109345121
    scale = 1 + random.randrange(prime - 1)  # scale from 1 to p-1 for MAD
    shift = random.randrange(prime - 1)  # shift from 0 to p-1 for MAD
    mask = (1 << 32) - 1
    hsh = 0
    for char in key:
        hsh = (hsh << 5 & mask) | (hsh >> 27)
        hsh += ord(char)
    # compress using MAD (Multiply Add Divide)
    compressed = (hsh * scale + shift) % prime % length
    return compressed


class HashTableSeparateChaining(object):

    def __init__(self, length=137):
        self.table = [[] for _ in range(length)]

    def hash(self, key):
        return cyclic_shift_hash(key, len(self.table))
        # return polynomial_hash(key, len(self.table))

    def put(self, key, data):
        _hash = self.hash(key)
        for i in range(0, len(self.table[_hash]), 2):
            if self.table[_hash][i] is key:
                self.table[_hash][i + 1] = data
                break
        else:
            self.table[_hash] += [key, data]

    def get(self, key):
        _hash = self.hash(key)
        for i in range(0, len(self.table[_hash]), 2):
            if self.table[_hash][i] is key:
                return self.table[_hash][i + 1]

    def show_distribution(self):
        n = 0
        for i in range(len(self.table)):
            if len(self.table[i]) > 0:
                print(i, self.table[i])
                n += int(len(self.table[i])/2)
        return n


data = ['David', 'David', 'Jennifer', 'Donnie', 'Raymond',
        'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan']


hTable = HashTableSeparateChaining(11)

[hTable.put(name, name) for name in data]
# pp.pprint(['{}: {}'.format(name, hTable.get(name)) for name in data])
# pp.pprint(hTable.table)
distribution_length = hTable.show_distribution()
print('data_length', len(data), 'distribution_length', distribution_length)


