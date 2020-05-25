
class A
  def initialize
    @aa = 9
  end
  def bindings(a, b)
    binding # return environment in effect here
  end
end

=begin
Since a Binding object contains references to all the objects that were in scope when
it was created, those objects can’t be garbage-collected until both they and the Bind
ing object have gone out of scope.
=end

a = A.new
bindings = a.bindings(7, 8)
p bindings.eval('a') # 7
p eval('a', bindings) # 7
p eval('b', bindings) # 8
p eval('@aa', bindings) # 9