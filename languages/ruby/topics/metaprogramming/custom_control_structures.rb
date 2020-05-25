def after(seconds, &block)
  Thread.new do
    sleep(seconds) # First sleep
    block.call
  end
end

1.upto(5) { |i| after(i) { puts i } }
sleep(5)

def every(seconds, value=nil, &block)
  Thread.new do
    loop do
      sleep(seconds)
      value = block.call(value) # And invoke block
    end
  end
end

every(1, 'hello') { |v| p v }
sleep(6)

def bench(method=nil, *args)
  beginning_time = Time.now
  res = block_given? ? yield : method.call(*args)
  end_time = Time.now
  puts "Time elapsed #{(end_time - beginning_time)*1000} milliseconds"
  res
end

def fib(n)
  return n if n < 2
  return fib(n - 1) + fib(n - 2)
end


p bench(method(:fib), 32)
p bench {
  fib(32)
}