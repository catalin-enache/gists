
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
        return 'Node <{!s}> left: {!r} right: {!r}'.format(self.value, self.left, self.right)


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
    node.right and print_tree_bin(node.right, indent + 1)
    print('\t' * indent + str(node.value))
    node.left and print_tree_bin(node.left, indent + 1)


def find(node, value):
    if node.value == value:
        return node
    for child in node.children:
        result = find(child, value)
        if result:
            return result
    return None


def find_iter(root, value):
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node.value == value:
            return node
        [queue.append(child) for child in node.children]
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


def find_bin(node, value):
    if not node:
        return None
    if value == node.value:
        return node
    elif value > node.value:
        return find_bin(node.right, value)
    else:
        return find_bin(node.left, value)


def find_bin_iter(node, value):
    while node and node.value != value:
        if value > node.value:
            node = node.right
        else:
            node = node.left
    return node


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


def bfs(node):
    queue = [node]
    while queue:
        n = queue.pop(0)
        yield n.value
        for child in n.children:
            queue.append(child)


def bfs_bin(node):
    queue = [node]
    while queue:
        n = queue.pop(0)
        yield n.value
        n.left and queue.append(n.left)
        n.right and queue.append(n.right)


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
                'left': {},
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
    # print('BFS_BIN', list(bfs_bin(bin_root_one)))

    # print_tree(root_one)
    # print_tree_bin(bin_root_one)

    # print(find(root_one, 'h'))
    # print(find_iter(root_one, 'h'))
    # print(find_bin(bin_root_one, 26))
    # print(find_bin_iter(bin_root_one, 26))
    # print(*map(lambda n: n.value, find_with_path(root_one, 'i')))
    # print(*map(lambda n: n.value, find_bin_with_path(bin_root_one, 10)))



