
class Object
  def eigenclass
    class << self; self; end
  end
end

class X
end

p X.eigenclass.equal? X.singleton_class # true

class A
  p self # A
  p self.singleton_class #<Class:A>
end

class B < A
  p self # B
  p self.superclass # A
  p self.singleton_class.superclass # #<Class:A>
  p self.superclass.singleton_class # #<Class:A>
  p self.singleton_class.superclass.equal? self.superclass.singleton_class # true
end

class C
  class << self
    def f
      p 'f'
    end
  end
end

class D < C
end

C.f # f
D.f # f

