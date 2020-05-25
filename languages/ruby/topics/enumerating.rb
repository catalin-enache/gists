

# ==================== enumerable ======================

class MyGen
  def initialize(num)
    @num = num
  end

  def my_enum
    return enum_for :my_enum unless block_given? # enum_for ~ to_enum
    (0..@num).each do |n|
      yield n * 2
    end
  end
end

MyGen.new(8)
    .my_enum
    .each_with_index do |n, i|
  puts "#{n} #{i}"
end

=begin
0 0
2 1
4 2
6 3
8 4
10 5
12 6
14 7
16 8
=end

# ==================== enumerator | generator ======================

def fib()
  Enumerator.new do |e|
    a = b = 1
    loop do
      e.yield a
      a, b = b, a + b
    end
  end
end

p fib.take(10)
p fib.lazy.map{ |x| x * x }.take(10).force

# [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
# [1, 1, 4, 9, 25, 64, 169, 441, 1156, 3025]