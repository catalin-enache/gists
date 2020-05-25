# https://concentricsky.com/articles/detail/pythons-hidden-new

class A:
    _dict = dict()

    def __new__(cls, *args, **kwargs):
        if 'instance' in A._dict:
            print('EXISTS')
            return A._dict['instance']
        else:
            print('NEW')
            return super(A, cls).__new__(A)

    def __init__(self, x):
        # __init__ will not be called if __new__ doesn't return an instance of A
        print('INIT')
        self.x = x
        A._dict['instance'] = self
        print('')

a1 = A(1)
a2 = A(2)
a3 = A(3)

print(a1.x, a2.x, a3.x)  # 3 3 3

print(a1 is a2)  # True
print(a2 is a3)  # True


# example 2
def instantiate(cls, *args, **kwargs):
    obj = cls.__new__(cls, *args, **kwargs)
    if isinstance(obj, cls):
        cls.__init__(obj, *args, **kwargs)
    return obj

new_dict = instantiate(dict, [('a', 1)])
print(new_dict)  # {'a': 1}
