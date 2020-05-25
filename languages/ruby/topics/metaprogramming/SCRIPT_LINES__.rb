
=begin
If your program defines a
global constant named SCRIPT_LINES__ and sets it equal to a hash, then the require and
load methods add an entry to this hash for each file they load

SCRIPT_LINES__ = {}
require './test2.rb'
p SCRIPT_LINES__ # {"/home/catalin/my_git_projects/rcms/test2.rb"=>["x = 8"]}

If you want to include the main file (rather than just the files it requires) in
the hash, initialize it like this:

SCRIPT_LINES__ = {__FILE__ => File.readlines(__FILE__)}
=end