
# ============= caller ===============

# Kernel.caller # reveals the current stacktrace
def cat_a
  puts caller
end
def cat_b
  cat_a
end
def cat_c
  cat_b
end
cat_c

# produces:
# prog.rb:5:in `cat_b'
# prog.rb:8:in `cat_c'
# prog.rb:10:in `<main>'

# ============== trace_var ===================

# Kernel.trace_var # traces global variables changes
# Kernel.untrace_var

trace_var(:$SAFE) {|v|
  puts "$SAFE set to #{v} at #{caller[1]}"
}

trace_var(:$aaa) {|v|
  puts "$aaa set to #{v} at #{caller[1]}"
}

$aaa = 9 # $aaa set to 9 at -e:1:in `load'

# ============== set_trace_func ==================

# In ruby 2.0
class Test
  def test
    a=1
  end
end
TracePoint.trace do |tp| p tp end
t = Test.new
t.test
#<TracePoint:c_return `trace'@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:44>
#<TracePoint:line@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:45>
#<TracePoint:c_call `new'@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:45>
#<TracePoint:c_call `initialize'@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:45>
#<TracePoint:c_return `initialize'@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:45>
#<TracePoint:c_return `new'@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:45>
#<TracePoint:line@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:46>
#<TracePoint:call `test'@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:40>
#<TracePoint:line@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:41 in `test'>
#<TracePoint:return `test'@/Users/enachecatalin/Projects/gists/languages/ruby/topics/metaprogramming/tracing.rb:42>
#<TracePoint:c_return `load'@-e:1>