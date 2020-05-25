
module Enumerable
  def map_send(*args)
    map { |obj| obj.send(*args) }
  end
end
# [1,3,4].map_send(:to_s, 2) #=> ["1", "11", "100"]

class Symbol
  def with(*args, &block)
    ->(caller, *rest) { caller.send(self, *rest, *args, &block) }
  end
end
# [1,3,4].map(&:to_s.with(2)) #=> ["1", "11", "100"]










