
# ================ const_set ======================

Object.const_set 'Name', 5 # dynamically define constant
p Name # 5
Object.send :remove_const, 'Name'
# p Name # uninitialized constant Name (NameError)
