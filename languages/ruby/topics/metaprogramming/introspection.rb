
module M
end

class C
  @@a = 9
  DD = 7
  def initialize
    @a = 8
  end
  include M
end

o = C.new

p o.class # C
p C.superclass # Object
p C.singleton_class # #<Class:C>
p o.instance_of? C # true
p o.is_a? C # true
p o.kind_of? C # true
p C === o # true
p o.respond_to? :name # false


p C.ancestors # C, M, Object, Kernel, BasicObject]
p C.include? M # true
p C.included_modules # [M, Kernel]


# ================== variables and constants ===============

p global_variables
# [:$;, :$-F, :$@, :$!, :$SAFE, :$~, :$&, :$`, :$', :$+, :$=, :$KCODE, :$-K, :$,, :$/, :$-0, :$\, :$_, :$stdin, :$stdout, :$stderr, :$>, :$<, :$., :$FILENAME, :$-i, :$*, :$:, :$-I, :$LOAD_PATH, :$", :$LOADED_FEATURES, :$?, :$$, :$VERBOSE, :$-v, :$-w, :$-W, :$DEBUG, :$-d, :$0, :$PROGRAM_NAME, :$-p, :$-l, :$-a, :$1, :$2, :$3, :$4, :$5, :$6, :$7, :$8, :$9]

p local_variables # [:o]

p o.instance_variables # [:@a]
p C.class_variables # => [:@@a]
p C.constants # => [:DD]

# ================= Querying, Setting, and Testing Variables & Constants

x = 1
varname = 'x'
eval(varname)
eval("varname = '$g'")
eval("#{varname} = x")
eval(varname)

o = Object.new
o.instance_variable_set(:@x, 0)
o.instance_variable_get(:@x)
o.instance_variable_defined?(:@x) # => true
Object.class_variable_set(:@@x, 1)
Object.class_variable_get(:@@x)
Object.class_variable_defined?(:@@x)
Math.const_set(:EPI, Math::E*Math::PI)
Math.const_get(:EPI)
Math.const_defined? :EPI

o.instance_eval { remove_instance_variable :@x }
Object.class_eval { remove_class_variable(:@@x) }
Math.send :remove_const, :EPI # Use send to invoke private method

# ======================== Listing and Testing For Methods

=begin
-- list instance methods
o.methods([false]) | C.instance_methods([false])
o.public_methods([false])   | C.public_instance_methods([false])
o.protected_methods([false]) | C.protected_instance_methods([false])
o.private_methods([false]) | C.private_instance_methods([false])
o.singleton_methods([false]) # instance singleton methods

---- list class methods
C.singleton_methods() == C.methods(false) # public singleton class methods
C.public_methods([false]) # public class methods
C.protected_methods([false]) # protected class methods
C.private_methods([false]) # private class methods

----- check instance methods
String.public_method_defined?(:reverse) # true # check if public instance method defined
String.public_instance_methods(false).include?(:reverse) # the same as line before
C.protected_method_defined?(:do_some_prot) # check if protected instance method defined
C.private_method_defined?(:do_some_priv) # check if private instance method defined
String.method_defined? :upcase! # true


----- check class methods
C.public_methods(false).include?(:do_some_pub_st)
C.protected_methods(false).include?(:do_some_prot_st)
C.private_methods(false).include?(:do_some_priv_st)

------- obtaining method objects
o.method(:name) # returns bound Method of instance
C.singleton_method(:do_some_pub_st) # returns bound Method of class
C.method(:do_some_pub_st) # returns bound Method of class
C.instance_method(:name) # returns UnboundMethod of instance
C.singleton_class.instance_method(:do_some_pub_st) # returns UnboundMethod of class

# unbound class method detail
ucm =  (class << A; self; end).instance_method(:do_some_pub_st)
ucm = A.singleton_class.instance_method(:do_some_pub_st)
ucm.bind(A).call

p A.singleton_class == (class << A; self; end) # true
p o.singleton_class == (class << o; self end) # true

-------- invoking methods
method_object.call(params)
unbound_method_object.bind(object).call(params)
"hello".send :upcase
Math.send(:sin, Math::PI/2)
"hello".public_send :upcase

---------- setting method visibility
public, private, protected
&
C.private_class_method *C.singleton_methods
C.public_class_method *C.singleton_methods
=end

# ====================== Defining / Undefining methods

=begin
alias ~ alias_method
def <||> undef
define_method() <||>  remove_method() # allows inheritance
                     | undef_method() # more sever - prevent inheritance
=end

class Logger
  def self.add_logging(id_string)
    define_method(:log) do |msg|
      now = Time.now.strftime('%H:%M:%S')
      STDERR.puts "#{now}-#{id_string}: #{self} (#{msg})"
    end
  end
end

class Song < Logger
  add_logging 'Tune'
end

class AttrLogger
  def self.attr_logger(name)
    attr_reader name
    define_method("#{name}=") do |val|
      puts "Assigning #{val.inspect} to #{name}"
      instance_variable_set("@#{name}", val)
    end
  end
end

class Example < AttrLogger
  attr_logger :value
end