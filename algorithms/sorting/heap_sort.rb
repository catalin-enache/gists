
=begin
https://en.wikipedia.org/wiki/Heapsort
https://www.youtube.com/watch?v=6NB0GHY11Iw
https://www.youtube.com/watch?v=51JGP4VVlDc
https://www.youtube.com/watch?v=onlhnHpGgC4
=end

=begin
the left child of node k is node 2k+1
the right child of node k is node 2k+2
the parent node k is node floor((k-1)/2)
If there are n nodes in the tree, the last one with a child is node floor(n/2) - 1
=end

def get_parent(k)
  parent = (k - 1) / 2
  parent if parent >= 0
end

def get_left_child(k, max_index)
  left_child = 2 * k + 1
  left_child if left_child <= max_index
end

def get_right_child(k, max_index)
  right_child = 2 * k + 2
  right_child if right_child <= max_index
end

def get_last_node_with_child(n)
  n / 2 - 1
end

def swap(arr, a, b)
  arr[a], arr[b] = arr[b], arr[a]
end

# =====================================================

def sift_down(arr, k, max_index, dir)
  loop do
    left_child = get_left_child k, max_index
    break unless left_child
    child_candidate = left_child

    right_child = get_right_child k, max_index
    if right_child && (dir == 'ASC' ? arr[right_child] > arr[left_child] : arr[right_child] < arr[left_child])
      child_candidate = right_child
    end

    break unless dir == 'ASC' ? arr[k] < arr[child_candidate] : arr[k] > arr[child_candidate]

    swap arr, k, child_candidate
    k = child_candidate
  end
end

def sift_up(arr, k, dir)
  # for every child navigate up through parents, check condition at every step and eventually swap
  parent = get_parent k
  # for every child navigate up through parents, check condition at every step and eventually swap
  while parent
    break if dir == 'ASC' ? arr[k] <= arr[parent] : arr[k] >= arr[parent] # check condition
    swap arr, k, parent # swap if condition not met
    k, parent = parent, get_parent(parent) # navigate up through parents
  end
end

# O(n log n)
def heapify_top_to_bottom(arr, dir)
  # iterate nodes from top to bottom
  (0..arr.length - 1).each do |k|
    sift_up arr, k, dir
  end
end

# O(n)
def heapify_bottom_to_top(arr, dir)
  # start from last node with a child and navigate left and up
  start = get_last_node_with_child arr.length
  max_index = arr.length - 1
  start.downto(0) do |k|
    sift_down arr, k, max_index, dir
  end
end

def heap_sort(arr, dir)
  max_index = arr.length - 1
  heapify_top_to_bottom arr, dir
  # heapify_bottom_to_top arr, dir
  while max_index > 0
    swap arr, 0, max_index
    max_index -= 1
    sift_down arr, 0, max_index, dir
  end
end

# a = [41, 67, 34, 0, 69, 24, 78, 58, 62, 64, 5, 45, 81, 27, 61]
a = [10, 1, 30, 20, 50, 40, 1, 2, 3, 2, 3, 3]


heap_sort(a, 'ASC')
p a