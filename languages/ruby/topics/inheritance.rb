
# ==================== inheritance: variables and constants ==================

# constants are looked up in the lexical scope of the place they are used
# before they are looked up in the inheritance hierarchy

# variable are not inherited (even it might look that they would).
# they are initialized for every instance
# a child variable does not shadow the parent variable (again - even it might look that it does)
# php late state binding behavior is close to how variables seems to be evaluated in ruby

class A
 Y = 'A'
 def initialize
   @x = 'a'
 end
 def report
   "#{@x} #{Y}"
 end
end

class B < A
 Y = 'B'
 def initialize
   @x = 'b'
 end
 def report2
   "#{@x} #{Y}"
 end
end


b  = B.new
p b.report  # b A
p b.report2 # b B
