


def Object.const_missing(name)
  @looked_for ||= {}
  str_name = name.to_s
  raise "Class not found: #{name}" if @looked_for[str_name]
  @looked_for[str_name] = 1
  file = str_name.downcase
  require './'+file+'.rb'
  klass = const_get(name)
  return klass if klass
  raise "Class not found: #{name}"
end

# or

Object.instance_eval do
  def const_missing(name)
    # ... same as before
  end
end

# p Test2

# ----

def Symbol.const_missing(name)
  name # Return the constant name as a symbol
end
p Symbol::Test # => :Test: undefined constant evaluates to a Symbol


