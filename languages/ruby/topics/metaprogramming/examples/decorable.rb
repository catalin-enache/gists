module Decorable
=begin
inspired from: http://blog.sgtfloyd.com/post/84242904702
=end
  def decorate(deco)
    -> (*deco_args) {
      decorator = deco[*deco_args]
      -> (*fns) {
        fns.each { |fn|
          original = instance_method(fn) rescue original = method(fn)
          if original.instance_of? UnboundMethod # (UnboundMethod | Method)
            define_method(fn) { |*args|
              decorator[original.bind(self), *args]
            }
          else
            define_singleton_method(fn) { |*args|
              decorator[original, *args]
            }
          end
        }
      }
    }
  end
end

module Decorable::Decorators
  CacheDeco = -> (max) {
    cache = {}
    -> (fn, *args) {
      entry = fn.receiver.object_id
      cache[entry] ||= {}
      cache[entry].shift if cache[entry].length > max
      cache[entry].include?(args) ? cache[entry][args] : cache[entry][args] = fn.call(*args)
    }
  }

  Test = -> (factor) {
    -> (fn, *args) {
      fn.call(*args) * factor
    }
  }
end

# TEST

class AA
  extend Decorable
  include Decorable::Decorators
  decorate(CacheDeco)[3][
    def ff(n) # cache on instance method
      sleep(0.5)
      n*n
    end,
    def self.gg(n) # cache on class method
      sleep(0.5)
      n*n
    end
  ]
end

class BB
  extend Decorable
  include Decorable::Decorators
  def multi(n)
    n*n
  end
  def self.add(n)
    n+n
  end
  def self.exc
    raise 'On Purpose'
  end
  decorate(Test)[10][:multi, :add]
end

aa = AA.new
p aa.ff(1)
p aa.ff(2)
p aa.ff(2)
p aa.ff(3)
p aa.ff(4)
p aa.ff(5)
p aa.ff(5)
p aa.ff(2)
p aa.ff(2)

p '-'*30

bb = AA.new
p bb.ff(9)
p bb.ff(9)

p '-'*30

p AA.gg(1)
p AA.gg(1)
p AA.gg(1)


p '-'*30

puts BB.new.multi(3)
puts BB.add(3)
BB.exc rescue puts 'caught exc'
puts BB.add(3)

puts '------- END ------------'