
from binary_tree import BinaryTree


class LinkedBinaryTree(BinaryTree):
    """Linked representation of a binary tree structure"""

    class _Node:
        """Lightweight, nonpublic class for storing a node"""
        __slots__ = '_element', '_parent', '_left', '_right'

        def __init__(self, element, parent=None, left=None, right=None):
            self._element = element
            self._parent = parent
            self._left = left
            self._right = right

        def __str__(self):
            return '_Node {}'.format(self._element)

        def __repr__(self):
            return self.__str__()

    class Position(BinaryTree.Position):
        """An abstraction representing the location of a single element"""

        def __init__(self, container, node):
            """Constructor should not be invoked by user"""
            self._container = container
            self._node = node

        def element(self):
            """Return the element stored at this Position"""
            return self._node._element

        def __eq__(self, other):
            """Return True if other is a Position representing the same location"""
            return type(other) is type(self) and other._node is self._node

        def __str__(self):
            return 'Position <{}>'.format(self._node)

        def __repr__(self):
            return self.__str__()

    def _validate(self, p):
        """Return associated node, if position is valid"""
        if not isinstance(p, self.Position):
            raise TypeError('p must be proper Position type')
        if p._container is not self:
            raise ValueError('p does not belong to this container')
        if p._node._parent is p._node:  # convention for deprecated nodes
            raise ValueError('p is no longer valid')
        return p._node

    def _make_position(self, node):
        """Return Position instance for given node (or None if no node)"""
        return self.Position(self, node) if node is not None else None

    # -------------------- binary tree constructor ---------------

    def __init__(self):
        """Create an initially empty binary tree"""
        self._root = None
        self._size = 0

    # ----------------- public accessors --------------------------

    def __len__(self):
        """Return the total number of elements in the tree"""
        return self._size

    def root(self):
        """Return the root Position of the tree (or None if tree is empty)"""
        return self._make_position(self._root)

    def parent(self, p):
        """Return the Position of p's parent (or None if p is root)"""
        node = self._validate(p)
        return self._make_position(node._parent)

    def left(self, p):
        """Return the Position of p's left child (or None if no left child)"""
        node = self._validate(p)
        return self._make_position(node._left)

    def right(self, p):
        """Return the Position of p's right child (or None if no right child)"""
        node = self._validate(p)
        return self._make_position(node._right)

    def num_children(self, p):
        """Return the number of children of Position p"""
        node = self._validate(p)
        count = 0
        if node._left is not None:
            count += 1
        if node._right is not None:
            count += 1
        return count

    def _add_root(self, e):
        """
        Place element e at the root of an empty tree and return new Position
        Raise ValueError if tree nonempty
        """
        if self._root is not None:
            raise ValueError('Root exists')
        self._size = 1
        self._root = self._Node(e)
        return self._make_position(self._root)

    def _add_left(self, p, e):
        """
        Create a new left child for Position p, storing element e
        Return the Position of new node
        Raise ValueError if Position p is invalid or p already has a left child
        """
        node = self._validate(p)
        if node._left is not None:
            raise ValueError('Left child exists')
        self._size += 1
        node._left = self._Node(e, node)
        return self._make_position(node._left)

    def _add_right(self, p, e):
        """
        Create a new right child for Position p, storing element e
        Return the Position of new node
        Raise ValueError if Position p is invalid or p already has a right child
        """
        node = self._validate(p)
        if node._right is not None:
            raise ValueError('Right child exists')
        self._size += 1
        node._right = self._Node(e, node)
        return self._make_position(node._right)

    def _replace(self, p, e):
        """Replace the element at position p with e, and return old element"""
        node = self._validate(p)
        old = node._element
        node._element = e
        return old

    def _delete(self, p):
        """
        Delete the node at Position p, and replace it with its child, if any
        Return the element that had been stored at Position p
        Raise ValueError if Position p is invalid or p has two children
        """
        node = self._validate(p)
        if self.num_children(p) == 2:
            raise ValueError('p has two children')
        child = node._left if node._left else node._right  # might be None
        if child is not None:
            child._parent = node._parent  # child's grandparent becomes parent
        if node is self._root:
            self._root = child  # child becomes root
        else:
            parent = node._parent
            if node is parent._left:
                parent._left = child
            else:
                parent._right = child
        self._size -= 1
        node._parent = node  # convention for deprecated node
        return node._element

    def _attach(self, p, t1, t2):
        """Attach trees t1 and t2 as left and right subtrees of external p"""
        node = self._validate(p)
        if not self.is_leaf(p):
            raise ValueError('position must be leaf')
        if not type(self) is type(t1) is type(t2):
            raise TypeError('Tree types must match')
        self._size += len(t1) + len(t2)
        if not t1.is_empty():  # attached t1 as left subtree of node
            t1._root._parent = node
            node._left = t1._root
            t1._root = None  # set t1 instance to empty
            t1._size = 0
        if not t2.is_empty():  # attached t2 as right subtree of node
            t2._root._parent = node
            node._right = t2._root
            t2._root = None  # set t2 instance to empty
            t2._size = 0


if __name__ == "__main__":
    bt = LinkedBinaryTree()
    assert len(bt) == 0
    assert bt.root() is None
    root = bt._add_root(0)
    c1 = bt._add_left(root, 1)
    c2 = bt._add_right(root, 2)
    c3 = bt._add_left(c1, 3)
    c4 = bt._add_right(c1, 4)
    c5 = bt._add_left(c2, 5)
    c6 = bt._add_right(c2, 6)
    assert bt.root() == root
    assert len(bt) == 7
    assert bt.num_children(root) == 2
    assert bt.num_children(c1) == 2
    assert bt.num_children(c2) == 2
    assert list(bt.children(root)) == [c1, c2]
    assert bt.sibling(c3) == c4
    assert bt.sibling(c5) == c6
    assert bt.left(c2) == c5
    assert bt.right(c2) == c6
    assert bt.parent(c6) == c2
    assert bt._replace(c6, 7) == 6
    assert c6.element() == 7
    assert bt._replace(c6, 6) == 7
    assert c6.element() == 6
    c7 = bt._add_left(c3, 7)
    assert c3._node._parent is not c3._node
    assert bt._delete(c3) == 3
    assert c3._node._parent is c3._node
    assert bt.left(c1) == c7  # c7 was promoted
    assert bt.sibling(c4) == c7
    assert bt._delete(c7) == 7
    assert bt._delete(c4) == 4
    assert bt.left(c1) is None
    assert bt.right(c1) is None
    bt2, bt3 = LinkedBinaryTree(), LinkedBinaryTree()
    c3_bis = bt2._add_root(c3.element())
    c4_bis = bt3._add_root(c4.element())
    bt._attach(c1, bt2, bt3)
    assert c3.element() == c3_bis.element()
    assert c4.element() == c4_bis.element()
    assert bt.left(c1) == c3_bis  # _Node is the same but _container is different
    assert bt.right(c1) == c4_bis  # _Node is the same but _container is different
    assert bt.height() == 2
    assert bt.depth(c6) == 2
    assert bt.depth(bt.right(c1)) == 2
    """
              0
        1             2
    3       4     5       6
    """
    assert list(bt) == [0, 1, 3, 4, 2, 5, 6]
    assert list(bt) == list(p.element() for p in bt.preorder())
    assert list(p.element() for p in bt.postorder()) == [3, 4, 1, 5, 6, 2, 0]
    assert list(p.element() for p in bt.breadthfirst()) == [0, 1, 2, 3, 4, 5, 6]
    assert list(p.element() for p in bt.inorder()) == [3, 1, 4, 0, 5, 2, 6]

    from tree import preorder_label, parenthesize, disk_space
    preorder_label(bt)
    parenthesize(bt)
    print()
    print('disk_space:', disk_space(bt))  # the sum of all nodes

    from algorithms.euler_tour import PreorderPrintIndentedLabeledTour, ParanthesizeTour, DiskSpaceTour

    tour = PreorderPrintIndentedLabeledTour(bt)
    tour.execute()

    tour = ParanthesizeTour(bt)
    tour.execute()

    tour = DiskSpaceTour(bt)
    print()
    print('DiskSpaceTour', tour.execute())



