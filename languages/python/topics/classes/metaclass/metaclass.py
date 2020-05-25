
# https://blog.ionelmc.ro/2015/02/09/understanding-python-metaclasses/
# https://docs.python.org/3/reference/datamodel.html#customizing-class-creation
# https://docs.python.org/3/c-api/typeobj.html
# http://stackoverflow.com/questions/100003/what-is-a-metaclass-in-python

# create class dynamically
A = type('A', (), {'f': lambda self: 5})
a = A()
print(a.f())  # 5


class DataDescriptor:
    def __init__(self, val):
        self.val = val

    def __get__(self, obj, objtype):
        return self.val

    def __set__(self, obj, val):
        pass


class Meta(type):
    x = 5
    y = DataDescriptor(6)

    def __new__(mcs, name, bases, attrs, **kwargs):
        print('  Meta.__new__(mcs=%s, name=%r, bases=%s, attrs=[%s], **%s)' % (
            mcs, name, bases, ', '.join(attrs), kwargs
        ))
        return super().__new__(mcs, name, bases, attrs)

    @classmethod
    def __prepare__(mcs, name, bases, **kwargs):
        print('  Meta.__prepare__(mcs=%s, name=%r, bases=%s, **%s)' % (
            mcs, name, bases, kwargs
        ))
        return {}

    def __init__(cls, name, bases, attrs, **kwargs):
        print('  Meta.__init__(cls=%s, name=%r, bases=%s, attrs=[%s], **%s)' % (
            cls, name, bases, ', '.join(attrs), kwargs
        ))
        return super().__init__(name, bases, attrs)

    def __call__(cls, *args, **kwargs):
        print('  Meta.__call__(cls=%s, args=%s, kwargs=%s)' % (
            cls, args, kwargs
        ))
        return super().__call__(*args, **kwargs)


class Complex(metaclass=Meta):
    y = 77  # ignored as y DataDescriptor in Meta has priority

    def __new__(cls, myarg):
        print('  Class.__new__(cls=%s, myarg=%s)' % (
            cls, myarg
        ))
        return super().__new__(cls)

    def __init__(self, myarg):
        print('  Class.__init__(self=%s, myarg=%s)' % (
            self, myarg
        ))
        self.myarg = myarg
        return super().__init__()

    def __str__(self):
        return "<instance of Class; myarg=%s>" % (
            getattr(self, 'myarg', 'MISSING'),
        )

Complex.y = 88  # ignored as y  DataDescriptor in Meta has priority
c = Complex(111)
print(type(Complex))  # <class '__main__.Meta'>
print(Complex.x)  # 5
print(Complex.y)  # 6
