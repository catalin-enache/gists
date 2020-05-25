
M = Module.new
C = Class.new
D = Class.new(C) { # useful also if we need to use free variables inside class
  include M
}

# How Classes Get Their Names ?
# You may have noticed that the classes created by Class.new have no name.
# However, if you assign the class object for a class with no name to a constant,
# Ruby automatically names the class after the constant:
some_class = Class.new
obj = some_class.new
puts "Initial name is #{some_class.name}" # Initial name is
SomeClass = some_class
puts "Then the name is #{some_class.name}" # Then the name is SomeClass
puts "also works via the object: #{obj.class.name}" # also works via the object: SomeClass

