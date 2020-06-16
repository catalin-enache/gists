from typing import Union


class Node:
    __slots__ = 'value', 'children', 'parent'

    def __init__(self, value):
        self.value = value
        self.children = []
        self.parent = None

    def __repr__(self):
        return 'Node <{!s}> {!r}'.format(self.value, self.children)


class NodeBin:
    __slots__ = 'value', 'left', 'right', 'parent'

    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None
        self.parent = None

    def __repr__(self):
        return 'Node <{!s}> left: {!r} right: {!r} parent: {!r}'\
            .format(self.value, self.left, self.right, self.parent and self.parent.value or None)


def tree_builder(struct, binary=False, node=None):
    if node is None:
        node = NodeBin(struct['value']) if binary else Node(struct['value'])
        tree_builder(struct, binary, node)
        return node
    if binary:
        if struct['left']:
            left = NodeBin(struct['left']['value'])
            left.parent = node
            node.left = left
            tree_builder(struct['left'], binary, left)
        if struct['right']:
            right = NodeBin(struct['right']['value'])
            right.parent = node
            node.right = right
            tree_builder(struct['right'], binary, right)
    else:
        for obj in struct['children']:
            child = Node(obj['value'])
            child.parent = node
            node.children.append(child)
            tree_builder(obj, binary, child)


def print_tree(node, indent=0):
    print('\t' * indent + str(node.value))
    for child in node.children:
        print_tree(child, indent + 1)


def print_tree_bin(node, indent=0):
    if not node:
        print('\t' * indent + '*')
        return

    print_tree_bin(node.right, indent + 1)
    print('\t' * indent + str(node.value))
    print_tree_bin(node.left, indent + 1)


def find(node, value):
    if node.value == value:
        return node
    for child in node.children:
        result = find(child, value)
        if result:
            return result
    return None


def find_with_path(node, value, path=None):
    path = [] if path is None else path
    if node.value == value:
        path.append(node)
        return path
    for child in node.children:
        result = find_with_path(child, value, path)
        if len(result):
            result.append(node)
            return result
    return []


def find_iter(root, value):
    # using BFS
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node.value == value:
            return node
        for child in node.children:
            queue.append(child)
    return None


def find_iter_with_path(root, value):
    # using BFS
    # https://stackoverflow.com/questions/8922060/how-to-trace-the-path-in-a-breadth-first-search
    queue = [[root]]
    while queue:
        path = queue.pop(0)
        node = path[0]
        if node.value == value:
            return path
        for child in node.children:
            queue.append([child] + path)
    return []


def find_bin(node: NodeBin, value):
    if not node:
        return None
    if value == node.value:
        return node
    elif value > node.value:
        return find_bin(node.right, value)
    else:
        return find_bin(node.left, value)


def find_bin_with_path(node, value, path=None):
    path = path if path is not None else []
    if not node:
        return []
    if node.value == value:
        path.append(node)
        return path
    if value > node.value:
        result = find_bin_with_path(node.right, value, path)
        len(result) and result.append(node)
        return result
    else:
        result = find_bin_with_path(node.left, value, path)
        len(result) and result.append(node)
        return result


def find_bin_iter(node, value):
    while node and node.value != value:
        if value > node.value:
            node = node.right
        else:
            node = node.left
    return node


def find_bin_iter_with_path(node, value):
    path = [node]
    while node and node.value != value:
        if value > node.value:
            node = node.right
        else:
            node = node.left
        path.insert(0, node)
    return path if node else []


def first_bin(node):
    while node.left:
        node = node.left
    return node


def last_bin(node):
    while node.right:
        node = node.right
    return node


def before_bin(node):
    if node.left:
        return last_bin(node.left)
    parent = node.parent
    while parent and parent.left == node:
        node = parent
        parent = node.parent
    return parent


def after_bin(node):
    if node.right:
        return first_bin(node.right)
    parent = node.parent
    while parent and parent.right == node:
        node = parent
        parent = node.parent
    return parent


def depth(root, node_val):
    return len(find_with_path(root, node_val)) - 1


def depth_bin(root, node_val):
    return len(find_bin_with_path(root, node_val)) - 1


def depth_2(node):
    if not node.parent:
        return 0
    return 1 + depth_2(node.parent)


def height(node):
    if not len(node.children):
        return 0
    return 1 + max([height(child) for child in node.children])


def height_bin(node):
    if not node or not node.left and not node.right:
        return 0
    return 1 + max([height_bin(child) for child in [node.left, node.right]])


def subtree_search_bin(node, value):
    if node.value == value:
        return node
    if value < node.value and node.left:
        return subtree_search_bin(node.left, value)
    elif node.right:
        return subtree_search_bin(node.right, value)
    return node


def find_ge_bin(node, value):
    found = subtree_search_bin(node, value)
    if found.value < value:
        found = after_bin(found)
    return found


def find_le_bin(node, value):
    found = subtree_search_bin(node, value)
    if found.value > value:
        found = before_bin(found)
    return found


def find_range(node, start_val, stop_val):
    """
    Iterate all (key,value) pairs such that start <= key < stop.
    If start is None, iteration begins with minimum key of map.
    If stop is None, iteration continues through the maximum key of map.
    """
    walk = first_bin(node) if start_val is None else find_ge_bin(node, start_val)
    _range = []
    while walk and (stop_val is None or walk.value < stop_val):
        _range.append(walk)
        walk = after_bin(walk)
    return _range


def insert_bin(node: NodeBin, value) -> Union[NodeBin, None]:
    place = subtree_search_bin(node, value)
    if place.value == value:
        return
    new_node = NodeBin(value)
    if place.value < value:
        place.right = new_node
    else:
        place.left = new_node
    new_node.parent = place
    return new_node


def delete_bin(node: NodeBin, value) -> Union[NodeBin, None]:
    found = find_bin(node, value)
    if not found:
        return
    # handle one child or no child case
    if not found.left or not found.right:
        only_child = found.left or found.right
        # only_child might be None !!!
        # link only_child with parent
        if found.parent:
            if only_child:
                only_child.parent = found.parent
            # if found node is left child of its parent
            if found.parent.left is found:
                found.parent.left = only_child  # might be None
            # found node is right child of its parent
            else:
                found.parent.left = only_child  # might be None
        # cut all links
        found.parent = None
        found.left = None
        found.right = None
        return found
    else:  # found.left and found.right
        prev_inorder = last_bin(found.left)  # the right most child from the left subtree.
        # it can also be the left most child from the right subtree
        # swap values between found and prev_inorder
        prev_inorder_value = prev_inorder.value
        prev_inorder.value = found.value
        found.value = prev_inorder_value

        # we know that prev_inorder has no right child
        # because prev_inorder is the right most child from the left subtree of found.

        # alternate recursive approach
        # return delete_bin(prev_inorder, prev_inorder.value)

        if prev_inorder.parent is found:
            # last_bin was the found.left with no right descendants
            # (prev_inorder is left child of its parent)
            prev_inorder.parent.left = prev_inorder.left  # (left subtree or None) // prev_inorder has no right child
        else:
            # prev_inorder is a right child of its whatever parent in the chain
            prev_inorder.parent.right = prev_inorder.left  # (left subtree or None) // prev_inorder has no right child
        # cut all links
        prev_inorder.parent = None
        prev_inorder.left = None
        return prev_inorder


def bfs(node):
    queue = [node]
    while queue:
        n = queue.pop(0)
        yield n.value
        for child in n.children:
            queue.append(child)


def bfs_2(node, dir='asc'):
    result = []
    queue = [node]
    while queue:
        level = []
        level_length = len(queue)
        for _ in range(level_length):
            n = queue.pop(0)
            level.append(n.value)
            for child in n.children:
                queue.append(child)
        result.insert(len(result) if dir == 'asc' else 0, level)
    return result


def bfs_bin(node):
    queue = [node]
    while queue:
        n = queue.pop(0)
        yield n.value
        n.left and queue.append(n.left)
        n.right and queue.append(n.right)


def bfs_bin_2(node, dir='asc'):
    result = []
    queue = [node]
    while queue:
        level = []
        level_length = len(queue)
        for _ in range(level_length):
            n = queue.pop(0)
            level.append(n.value)
            n.left and queue.append(n.left)
            n.right and queue.append(n.right)
        result.insert(len(result) if dir == 'asc' else 0, level)
    return result


def preorder(node):
    yield node.value
    for child in node.children:
        yield from preorder(child)


def preorder_iter(node):
    stack = [node]
    while stack:
        n = stack.pop()
        yield n.value
        for i in range(len(n.children) - 1, -1, -1):
            stack.append(n.children[i])


def preorder_bin(node):
    if not node:
        return
    yield node.value
    for child in [node.left, node.right]:
        yield from preorder_bin(child)


def preorder_bin_iter(node):
    stack = [node]
    while stack:
        n = stack.pop()
        yield n.value
        n.right and stack.append(n.right)
        n.left and stack.append(n.left)


tree_one = {
    'value': 'a', 'children': [
        {'value': 'b', 'children': [
            {'value': 'e', 'children': []},
            {'value': 'f', 'children': [
                {'value': 'h', 'children': [
                    {'value': 'i', 'children': []},
                ]},
            ]},
        ]},
        {'value': 'c', 'children': [
            {'value': 'g', 'children': []},
        ]},
        {'value': 'd', 'children': []},
    ]
}

bin_tree_one = {
    'value': 16,
    'left': {
        'value': 8,
        'left': {
            'value': 4,
            'left': {
                'value': 2,
                'left': {},
                'right': {}
            },
            'right': {
                'value': 6,
                'left': {},
                'right': {}
            }
        },
        'right': {
            'value': 12,
            'left': {
                'value': 10,
                'left': {},
                'right': {}
            },
            'right': {
                'value': 14,
                'left': {
                    'value': 13,
                    'left': {},
                    'right': {}
                },
                'right': {}
            }
        }
    },
    'right': {
        'value': 24,
        'left': {
            'value': 20,
            'left': {
                'value': 18,
                'left': {},
                'right': {}
            },
            'right': {
                'value': 22,
                'left': {},
                'right': {}
            }
        },
        'right': {
            'value': 28,
            'left': {
                'value': 26,
                'left': {},
                'right': {}
            },
            'right': {
                'value': 30,
                'left': {},
                'right': {}
            }
        }
    }
}

if __name__ == '__main__':
    root_one = tree_builder(tree_one)
    bin_root_one = tree_builder(bin_tree_one, True)

    # print('BFS', list(bfs(root_one)))
    # print('BFS', list(bfs_2(root_one)))
    # print('BFS_BIN', list(bfs_bin(bin_root_one)))
    # print('BFS_BIN', list(bfs_bin_2(bin_root_one)))

    # print_tree(root_one)
    # print_tree_bin(bin_root_one)

    # print(find(root_one, 'h'))
    # print(find_iter(root_one, 'h'))
    # print(find_bin(bin_root_one, 26))
    # print(find_bin_iter(bin_root_one, 26))
    # print(find_bin_iter(bin_root_one, 99))
    # print(*map(lambda node: node.value, find_bin_iter_with_path(bin_root_one, 26)))
    # print(*map(lambda node: node.value, find_bin_iter_with_path(bin_root_one, 99)))
    # print(*map(lambda n: n.value, find_with_path(root_one, 'i')))
    # print(*map(lambda node: node.value, find_iter_with_path(root_one, 'i')))
    # print(*map(lambda n: n.value, find_bin_with_path(bin_root_one, 10)))
    # print(*map(lambda n: n.value, find_bin_iter_with_path(bin_root_one, 10)))

    # print(first_bin(bin_root_one).value)
    # print(last_bin(bin_root_one).value)

    # print(before_bin(find_bin(bin_root_one, 16)))  # 14
    # print(before_bin(find_bin(bin_root_one, 10)))  # 8
    # print(before_bin(find_bin(bin_root_one, 4)))  # 2
    # print(before_bin(find_bin(bin_root_one, 2)))  # None

    # print(after_bin(find_bin(bin_root_one, 16)))  # 18
    # print(after_bin(find_bin(bin_root_one, 30)))  # None
    # print(after_bin(find_bin(bin_root_one, 14)))  # 16

    # print(depth(root_one, 'i'))  # 4
    # print(depth(root_one, 'i'))  # 0
    # print(depth(root_one, 'xx'))  # -1
    # print(depth_bin(bin_root_one, 2))  # 3
    # print(depth_2(find(root_one, 'i')))  # 4
    # print(height(root_one))  # 4
    # print(height_bin(bin_root_one))  # 3

    # print(subtree_search_bin(bin_root_one, 2).value)  # 2
    # print(subtree_search_bin(bin_root_one, 29).value)  # 30
    # print(subtree_search_bin(bin_root_one, 27).value)  # 26
    # print(find_ge_bin(bin_root_one, 28).value)  # 28
    # print(find_ge_bin(bin_root_one, 27).value)  # 28
    # print(find_le_bin(bin_root_one, 28).value)  # 28
    # print(find_le_bin(bin_root_one, 29).value)  # 28

    # print(*map(lambda node: node.value, find_range(bin_root_one, 18, 26)))  # 18 20 22 24

    # print(insert_bin(bin_root_one, 21).parent.value)  # 22
    # print(delete_bin(bin_root_one, bin_root_one.value))
    # print_tree_bin(bin_root_one)

    # print(*preorder(root_one))
    # print(*preorder_iter(root_one))
    # print(*preorder_bin(bin_root_one))
    # print(*preorder_bin_iter(bin_root_one))

