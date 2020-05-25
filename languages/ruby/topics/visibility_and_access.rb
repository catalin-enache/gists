# =====================class methods visibility ======================================

class A
  def self.subjects_xml; end

  def self.subjects_html; end

  # class<<self;self;end.send :protected, :subjects_xml, :subjects_html
  self.singleton_class.instance_eval do
    protected :subjects_xml, :subjects_html
  end
end


# ===================== access private stuff from outside =========================
class B
  def initialize
    @a = 5
  end
  private
  def do_something
    'doing something private'
  end
end

b = B.new
p b.send(:do_something) # "doing something private"
p b.instance_eval { do_something } # "doing something private"
p b.instance_eval { @a } # 5

# ================== access class instance variables from within instance =========================

class C
  @instances = 0
  class << self
    attr_accessor :instances
  end
  def initialize
    self.class.instances += 1
  end
end

C.new; C.new
p C.instances # 2