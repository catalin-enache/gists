
# ====================  $LOAD_PATH or $: ==============================

# ruby -e 'puts $:'

# Add the installation directory for the current program to the beginning of the load path
$LOAD_PATH.unshift File.expand_path($PROGRAM_NAME)
# Add the value of an environment variable to the end of the path
$LOAD_PATH << ENV['MY_LIBRARY_DIRECTORY']
