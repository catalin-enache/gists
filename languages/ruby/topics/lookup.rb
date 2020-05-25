
=begin

==================== instance method lookup ============================

1. look in eigenclass of the object
2. look in instance methods defined by object.class
3. look in modules included by object.class
4. move up to the superclass of object.class and repeat steps: 2, 3
5. eventually look up for "method_missing" hook in each of the spots above and call it


                   - instance methods-
                   Integer (+ included modules)
     -methods-      /\
     Eigenclass -> Fixnum  (+ included modules)

==================== class method lookup ============================

the same as for instance method lookup +  a twist
Class objects are special: they have superclasses.
The eigenclasses of class objects are also special: they have superclasses, too.
The eigenclass of an ordinary object stands alone and has no superclass

when Ruby searches for singleton methods in the eigenclass of an object,
it also searches the superclass (and all ancestors) of the eigenclass as well

def Integer.parse(text)
  text.to_i
end

n = Fixnum.parse("1") # Fixnum is a subclass of Integer

Let’s use the names Fixnum' and Integer' to refer to the eigenclasses of Fixnum and Integer
The superclass of Fixnum' is Integer'.

Ruby first checks the singleton methods of
Fixnum', Integer', Numeric', and Object', and then checks the instance methods of
Class, Module, Object, and Kernel.

    -methods-    -instance methods-
    Object'      Kernel
     /\           /\
    Numeric'     Object
     /\           /\
    Integer'     Module
     /\           /\
    Fixnum' ->   Class

class links go to the right, and superclass links go up

==================== constant lookup ============================

1. attempts to resolve a constant reference in the lexical scope of the reference (enclosing class or module)
2. checks the next enclosing class or module
(The class method "Module.nesting" returns the list of classes and modules that are searched in this step)
3. tries to resolve the constant in the inheritance hierarchy (ancestors)
(The "ancestors" method of the containing class or module returns the list of classes and modules searched in this step)
4. top-level constant definitions are checked
5. eventually look for "const_missing" hook and call it

In other words: iterate through Module.nesting then through Module.nesting[0].ancestors

notice:
 - Constants defined in enclosing modules are found in preference to constants defined in included modules.
 - The modules included by a class are searched before the superclass of the class


=end

module Kernel
  A = B = C = D = E = F = "defined in kernel"
end

# Top-level or "global" constants defined in Object
A = B = C = D = E = "defined at toplevel"

class Super
  A = B = C = D = "defined in superclass"
end

module Included
  A = B = C = "defined in included module"
end

module Enclosing
  A = B = "defined in enclosing module"
  class Local < Super
    include Included
    A = "defined locally"
    # The list of modules searched, in the order searched
    # [Enclosing::Local, Enclosing, Included, Super, Object, Kernel]
    search = (Module.nesting + self.ancestors + Object.ancestors).uniq
    puts A # defined locally
    puts B # defined in enclosing module
    puts C # defined in included module
    puts D # defined in superclass
    puts E # defined at toplevel
    puts F # defined in kernel
  end
end
