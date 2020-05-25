class Object
  old_system_method = instance_method(:system)
  define_method(:system) do |*args|
    old_system_method.bind(self).call(*args).tap do |result|
      puts "system(#{args.join(', ')}) returned #{result.inspect}"
    end
  end
end

# new way in ruby 2.0 (prepend)
module SystemHook
  private
  def system(*args)
    super.tap do |result|
      puts "system(#{args.join(', ')}) returned #{result.inspect}"
    end
  end
end

class Object
  prepend SystemHook
end