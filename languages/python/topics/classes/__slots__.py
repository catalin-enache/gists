
class A:
    __slots__ = ('x',)

a = A()
a.x = 9
# a.y = 8  # throws exception: AttributeError: 'A' object has no attribute 'y'
print(a.x)  # 9
# print(a.__dict__)  # throws exception: AttributeError: 'A' object has no attribute '__dict__'
print(A.__dict__)  # this works
