
# https://docs.python.org/3/reference/datamodel.html#invoking-descriptors
# https://docs.python.org/3/howto/descriptor.html


class NonDataDescriptor:
    def __init__(self, val):
        self.val = val

    def __get__(self, obj, objtype):
        return self.val


class DataDescriptor:
    def __init__(self, val):
        self.val = val

    def __get__(self, obj, objtype):
        return self.val

    def __set__(self, obj, val):
        pass


class A:
    x = NonDataDescriptor(88)
    y = DataDescriptor(55)

a = A()


print(a.x)  # 88
print(A.x)  # 88
a.x = 7
print(a.x)  # 7 - object dict takes precedence over NonDataDescriptor

print(a.y)  # 55
print(A.y)  # 55
a.y = 7
print(a.y)  # 55 - DataDescriptor takes precedence over object dict



