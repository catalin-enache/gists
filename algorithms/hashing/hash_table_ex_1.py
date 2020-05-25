
import functools
import pprint
pp = pprint.PrettyPrinter()


class HashTableSeparateChaining(object):

    H = 37

    def __init__(self, length=137):
        self.table = [[] for _ in range(length)]

    def hash(self, key):
        return functools.reduce(lambda acc, item: acc + self.H * acc + ord(item), iter(str(key)), 0) % len(self.table)

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




