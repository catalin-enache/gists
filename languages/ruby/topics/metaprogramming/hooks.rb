
=begin
method_added, singleton_method_added
method_removed, singleton_method_removed
method_undefined, singleton_method_undefined

included, extended # for modules
inherited # for classes
append_features # called when including a module into another
extend_object # called when obj.extend

initialize_clone
initialize_copy
initialize_dup

marshal_dump, marshal_load

coerce, induced_from, to_xxx

method_missing
const_missing

# objects creation hook
class Class
  old_new = instance_method :new
  define_method :new do |*args, &block|
    result = old_new.bind(self).call(*args, &block)
    result.timestamp = Time.now
    result
  end
end


=end

# =========== copy methods from module to class when inherited from special crafted class

module M
  def self.f(a, b)  a + b; end
end

class B
  def self.inherited(child)
    mdl = Module.const_get(child.to_s.split('::')[0])
    mdl.methods(false).each do |meth|
      child.define_singleton_method(meth) do |*args, &block|
        mdl.method(meth).call *args, &block
      end
    end
  end
end

# M.methods are transferred to A when inheriting from B(special crafted)
class M::A < B ; end

p M::A.methods(false) # [:f]
p M::A.f(5, 7) #  12
