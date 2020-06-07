
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


def print_tree(node, indent=0):
    print('\t' * indent + str(node.value))
    for child in node.children:
        print_tree(child, indent + 1)


def print_bin_tree(node, indent=0):
    node.right and print_bin_tree(node.right, indent + 1)
    print('\t' * indent + str(node.value))
    node.left and print_bin_tree(node.left, indent + 1)


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
    print('BFS', list(bfs(root_one)))

    bin_root_one = tree_builder(bin_tree_one, True)
    print('BFS_BIN', list(bfs_bin(bin_root_one)))

    # print_tree(root_one)
    # print_bin_tree(bin_root_one)



