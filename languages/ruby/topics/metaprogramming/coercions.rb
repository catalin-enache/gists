
=begin

http://zverok.github.io/blog/2016-01-18-implicit-vs-expicit.html
http://www.rubyfleebie.com/to_i-vs-to_int/
http://briancarper.net/blog/98.html

1. loose: to_i, to_s, to_a ...

2. strict: to_int, to_str, to_ary, to_enum, to_hash, to_io, to_open, to_path, to_proc, to_regexp, to_sym

3. numeric: coerce
This technique, called double dispatch, allows a method to change its behavior based not only
on its class but also on the class of its parameter. In this case, we’re letting the parameter
decide exactly what classes of objects should get added (or multiplied, divided, and so on).
Ex:

=end

class Roman
  def initialize(value)
    @value = value
  end
  def coerce(other)
    if Integer === other
      [ other, @value ]
    else
      [ Float(other), Float(@value) ]
    end
  end
end
iv = Roman.new(4)
p 3 * iv
