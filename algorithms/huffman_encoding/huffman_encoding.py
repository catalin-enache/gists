from collections import defaultdict


def print_tree_bin(node, indent=0):
    if not node:
        print('\t' * indent + '*')
        return

    print_tree_bin(node.right, indent + 1)
    print('\t' * indent + str(node.value) + (node.char if node.char else ''))
    print_tree_bin(node.left, indent + 1)


class Node:
    __slots__ = 'left', 'right', 'parent', 'value', 'char'

    def __init__(self, value=0):
        self.left = None
        self.right = None
        self.parent = None
        self.value = value
        self.char = None


def counts(s):
    d = defaultdict(Node)
    for c in s:
        d[c].value += 1
        d[c].char = c
    return d


# normally this is done with a priority queue
def insert_sort(item, seq):
    seq.append(item)
    i = len(seq) - 2
    while i >= 0:
        if seq[i].value >= item.value:
            seq[i + 1] = seq[i]
            i -= 1
        else:
            break
    seq[i + 1] = item


def get_encoding_for_char(char, counts_map):
    encoding = []
    node = counts_map[char]
    # print('node', node.parent.parent.left.value)
    # print('char', node.char, 'counts', node.value, 'parent', node.parent)
    walk = node
    while walk.parent:
        encoding.append('0' if walk.parent.left == walk else '1')
        walk = walk.parent
    return ''.join(reversed(encoding))


def huffman(s):
    _counts = counts(s)
    _sorted_counts = []  # normally this is a priority queue PQ
    for c, node in _counts.items():
        insert_sort(node, _sorted_counts)
    print([(node.char, node.value) for k, node in _counts.items()])
    print([(node.char, node.value) for node in _sorted_counts])
    while len(_sorted_counts) > 1:
        node_1 = _sorted_counts.pop(0)  # PQ.remove_min()
        node_2 = _sorted_counts.pop(0)  # PQ.remove_min()
        new_node = Node(node_1.value + node_2.value)
        new_node.left = node_1
        new_node.right = node_2
        node_1.parent = new_node
        node_2.parent = new_node
        insert_sort(new_node, _sorted_counts)  # PQ.insert(new_node)
    # _sorted_counts has only one item at this point: the huffman tree root
    root = _sorted_counts.pop()  # PQ.remove_min()
    print_tree_bin(root)

    encodings = {}
    for _, item in _counts.items():
        encodings[item.char] = get_encoding_for_char(item.char, _counts)
    return encodings


print(huffman('BCCABBDDAECCBBAEDDCC'))

