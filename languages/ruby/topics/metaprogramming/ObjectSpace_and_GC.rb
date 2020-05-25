
# ============ ObjectSpace and GC =================

class A
end

a = A.new
b = A.new

# shows every object (or every instance of a specified class) that the interpreter knows about
ObjectSpace.each_object(A) {|c| puts c }
#<A:0x000000021f24b0>
#<A:0x000000021f2550>

a_id = a.object_id
p a_id
p ObjectSpace._id2ref(a_id)

=begin

---

ObjectSpace._id2ref is the inverse of Object.object_id
it takes an object ID as its argument and returns the corresponding object

---

ObjectSpace.define_finalizer allows the registration of a Proc or a block of code to be
invoked when a specified object is garbage collected

ObjectSpace.undefine_finalizer to delete all finalizer blocks registered for an object

Garbage collection can be temporarily disabled with GC.disable, and it can be enabled again with GC.enable .

----

ObjectSpace.garbage_collect # forces Ruby’s garbage collector to run

GC.start is a synonym for ObjectSpace.garbage_collect
=end