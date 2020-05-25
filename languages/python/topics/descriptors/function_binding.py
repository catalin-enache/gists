
class A:
    def __init__(self):
        self.x = 9


def f(self):
    return self.x

a = A()

# first approach - monkey patching
A.f = f
print(a.f())  # 9

# second approach
# possible because function object is a descriptor
# https://docs.python.org/3/howto/descriptor.html#functions-and-methods
bf = f.__get__(a, A)
print(bf.__func__ is f)  # True
print(bf.__self__ is a)  # True
print(bf())  # 9
