
class Meta(type):
    def __getattribute__(*args):
        print("Metaclass getattribute invoked")
        return type.__getattribute__(*args)


class C(object, metaclass=Meta):
    def __len__(self):
        return 10

    def __getattribute__(*args):
        print("Class getattribute invoked")
        return object.__getattribute__(*args)

c = C()
# Explicit lookup via instance
print(c.__len__())  # Class getattribute invoked => 10
# Explicit lookup via type
print(type(c).__len__(c))  # Metaclass getattribute invoked => 10
# Implicit lookup : __getattribute__ was skipped by builtin implementation => 10
# https://docs.python.org/3/reference/datamodel.html#special-lookup
print(len(c))

