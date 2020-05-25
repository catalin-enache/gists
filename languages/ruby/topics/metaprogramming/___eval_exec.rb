
# {instance|module|class}_{eval|exec}

String.class_eval('def len; size; end')
String.class_eval('alias len size') # | String.class_eval { alias len size }
String.instance_eval('def empty; ''; end') # | String.instance_eval { def empty; ""; end }
# o.instance_eval { @x }
String.class_eval {
  def len
    size
  end
}

# class_eval defines instance methods
# instance_eval defines class methods
# instance_exec class_exec are like instance_eval class_eval but accept parameters which in turn are passed to block

# module_eval and class_eval are the same thing

class String
  module_eval 'def last(n)
   self[-n, n]
  end'
end

String.module_eval 'def last(n)
  self[-n, n]
end'

def walk(&block)
    instance_eval(&block)
end
