# ==================== Serialization =====================================
# http://ruby-doc.org/core-2.2.3/Marshal.html#method-c-dump

# Marshal.dump # will trigger marshal_dump | _dump instance method if defined # marshal_dump takes precedence over _dump
# Marshal.load # will trigger marshal_load | _load instance method if defined # marshal_load takes precedence over _load
# _load and _dump were used in older versions of Ruby

class Special
  def initialize(valuable, volatile, precious)
    @valuable = valuable
    @volatile = volatile
    @precious = precious
  end

  def marshal_dump
    [@valuable, @precious]
  end

  def marshal_load(variables)
    @valuable = variables[0]
    @precious = variables[1]
    @volatile = 'unknown'
  end

  def to_s
    "#@valuable #@volatile #@precious"
  end
end
obj = Special.new('Hello', 'there', 'World')
puts "Before: obj = #{obj}" # Before: obj = Hello there World
data = Marshal.dump(obj)
obj = Marshal.load(data)
puts "After: obj = #{obj}" # After: obj = Hello unknown World

# ---- Yaml version

require 'yaml'
class Special
  def initialize(valuable, volatile, precious)
    @valuable = valuable
    @volatile = volatile
    @precious = precious
  end

  def to_yaml_properties
    %w{ @precious @valuable }
  end

  def to_s
    "#@valuable #@volatile #@precious"
  end
end
obj = Special.new('Hello', 'there', 'World')
puts "Before: obj = #{obj}"
data = YAML.dump(obj)
obj = YAML.load(data)
puts "After: obj = #{obj}"