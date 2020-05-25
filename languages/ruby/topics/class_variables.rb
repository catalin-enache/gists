
# instance method CAN access class variable

class Song
  @@count = 0
  def initialize
    @@count += 1
  end
  def Song.get_count
    @@count
  end
  def get_count # instance method CAN access class variable
    @@count
  end
end

p Song.new.get_count # 1
p Song.new.get_count # 2
p Song.get_count # 2

# global class variable weirdness

class Holder # => prog.rb:13: warning: class variable access from toplevel
  @@var = 99
  def Holder.var=(val)
    @@var = val
  end
  def var
    @@var
  end
end

=begin
@@var = 'top level variable'
a = Holder.new
p a.var # => "top level variable"
Holder.var = 123
p a.var # => 123
p @@var # 123 # global class variable changed through Holder.var assignment
=end

# class variable inheritance

class A
  @@a = 'A @@a'
  def self.dump
    puts "@@a == #{@@a}"
    puts "@@b == #{@@b}" rescue puts '@@b is not defined'
  end
end

A.dump # @@a == A @@a; @@b is not defined

class B < A
  @@a = 'B @@a' # @@a propagates upward due to being defined in ancestor
  @@b = 'B @@b' # @@b does not propagate upward
end

A.dump # @@a == B @@a; @@b is not defined