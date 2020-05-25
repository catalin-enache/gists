
=begin
module A
  def self.included(base)
    base.extend ClassMethods
    interceptor = const_set "#{base.name}Interceptor", Module.new
    base.prepend interceptor
  end

  module ClassMethods
    def watch(method_name)
      interceptor = const_get "#{self.name}Interceptor"
      interceptor.class_eval do
        define_method(method_name) do |*args, &block|
          ret_val = super *args, &block
          puts "ret_val for #{method_name}: #{ret_val}"
          ret_val
        end
      end
    end
  end
end

class C
  include A
  watch :meth
  def meth
    5
  end
end

c = C.new
c.meth

p C.ancestors # [A::CInterceptor, C, A, Object, Kernel, BasicObject]
=end

module Cache
  def self.included(base)
    base.extend ClassMethods
    interceptor = const_set "#{base.name}Interceptor", Module.new
    base.prepend interceptor
  end

  module ClassMethods
    def cache(method_name)
      interceptor = const_get "#{self.name}Interceptor"
      interceptor.class_eval do
        define_method(method_name) do |*args, &block|
          method_cache_instance_var = "@_cache_#{method_name}"
          instance_variable_set(method_cache_instance_var, {}) unless instance_variable_defined?(method_cache_instance_var)
          puts 'cache hit' if instance_variable_get(method_cache_instance_var)[args.to_s]
          instance_variable_get(method_cache_instance_var)[args.to_s] ||= super *args, &block
        end
      end
    end
  end
end

class C
  include Cache
  cache :multiply
  def multiply(a, b)
    puts 'cache missed'
    a * b
  end
end

c = C.new
p c.multiply(4, 5) # cache missed
p c.multiply(4, 5) # cache hit
p c.instance_variables #[:@_cache_multiply]

c1 = C.new
p c1.multiply(6, 7) # cache missed
p c1.multiply(6, 7) # cache hit

p C.ancestors # [Cache::CInterceptor, C, Cache, Object, Kernel, BasicObject]
p Cache.constants # [:ClassMethods, :CInterceptor]

