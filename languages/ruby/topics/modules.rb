# ==================  Modules =============================================

# http://yehudakatz.com/2009/11/12/better-ruby-idioms/

# use modules as simple namespaces or as mixins

# =========== extend, include ===================

module M
  module ClassMethods
    def class_method
      __method__
    end
  end

  def self.included(base)
    base.extend(ClassMethods)
    # base.send :extend, ClassMethods
  end

  def instance_method
    __method__
  end
end

class A
  include M
  # extend M::ClassMethods
end

p A.class_method # :class_method
a = A.new
p a.instance_method # :instance_method

# ----------------------------------------

module M1
  # any method placed here will apply to classes
  def acts_as_something
    send :include, InstanceMethods
  end

  module InstanceMethods
    # any method placed here will apply to instances
    def something
      'something'
    end
  end
end

class A1
  extend M1
end

A1.acts_as_something
a1 = A1.new
p a1.something # "something"

# ================= module_function ===============

# module_function :foo
# (will make foo accessible directly from module M.foo and also accesible from instance of classes including the module)
# The primary effect of calling module_function is that it makes class method copies of the specified methods.
# A secondary effect is that it makes the instance methods private.

module M
  def foo
    'doing foo'
  end
  module_function :foo
end

class A
  include M
  def bar
    foo
  end
end

a = A.new
p a.bar # doing foo
p M.foo # doing foo

# =============== Module.nesting =================

module M1
  module M2
    $a = Module.nesting # Returns the list of Modules nested at the point of call.
  end
end
p $a           #=> [M1::M2, M1]
p $a[0].name   #=> "M1::M2"

# =============== prepend ==========================

# Makes prepended module methods to take precedence over Class instance_methods
# Calling super in prepended Module methods will call Class instance_methods

module VanityPuts
  def puts(*args)
    args.each do
    |arg| super("Dave says: #{arg}")
    end
  end
end
class Object
  prepend VanityPuts
end
puts 'Hello and', 'goodbye'
# Dave says: Hello and
# Dave says: goodbye

=begin

======== prepend module & memoize
http://dev.af83.com/2012/10/19/ruby-2-0-module-prepend.html
module Memoize
  def calc(n)
    @@memo ||= {}
    @@memo[n] ||= super
  end
end

class Fibonacci
  prepend Memoize
  def calc(n)
    return n if n < 2
    return calc(n - 1) + calc(n - 2)
  end
end
=end


# ================= refine ===============================
=begin
A refinement is a way of packaging a set of changes to one or more classes.
These refinements are defined within a module.
If a Ruby source file then elects to use this module of refinements,
the change will apply to the source in that module past the point where the refinement is used.
However code outside this file is not affected.


The refinement is contained in the module VanityPuts.
The refine block takes a class and a block.
Within the block are the methods that you would like to update in that class.
At this point, no change is made—you have defined a method, but haven’t yet told Ruby to use it.
That’s what the using clause does.
You give it a module containing one or more refinements,
and it marks the refined objects to say
“for the rest of this source file, when you make a call to an instance of Object,
first check to see if the method can be found in the refinement.
If so, invoke it, otherwise invoke the original.

You can define refinements in any module.
A refinement may only refer to a class (not a module).

The "using" call that activates a refinement module can only occur at the top-level scope
or in a string that is evaluated.
"using" may not be called inside a class or module definition.

The basic scoping rule is simple.
A refinement is activated in a source file by calling using.
For the rest of that source file, the methods that are defined in that refinement are active.
=end

module VanityPuts
  refine Object do
    private
    def puts(*args)
      args.each do
      |arg| Kernel::puts("John says: #{arg}")
      end
    end
  end
end
using VanityPuts
puts 'Hello', 'world'
# John says: Hello
# John says: world






