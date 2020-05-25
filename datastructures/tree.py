
from collections import deque


def _preorder_label_callback(p, path):
    depth = len(path)
    label = '.'.join(str(j + 1) for j in path)
    print(2 * depth * ' ' + label + ':',  p.element())


def preorder_label(T, p=None, path=None, callback=_preorder_label_callback):
    p = p if p is not None else T.root()
    path = path if path is not None else []
    callback(p, path)
    path.append(0)
    for c in T.children(p):
        preorder_label(T, c, path, callback)
        path[-1] += 1
    path.pop()


def parenthesize(T, p=None):
    """
    Print parenthesized representation of subtree of T rooted at p
    Uses preorder traversal
    """
    p = p if p is not None else T.root()
    print(p.element(), end='')
    if not T.is_leaf(p):
        first_time = True
        for c in T.children(p):
            sep = ' (' if first_time else ', '
            print(sep, end='')
            first_time = False
            parenthesize(T, c)
        print(')', end='')


def disk_space(T, p=None):
    """
    Return total disk space for subtree of T rooted at p
    Uses postorder traversal
    """
    p = p if p is not None else T.root()
    subtotal = p.element()
    for c in T.children(p):
        subtotal += disk_space(T, c)
    return subtotal


class Tree:
    """Abstract base class representing a tree structure"""

    # ---------------- nested Position class ----------------

    class Position:
        """An abstraction representing the location of a single element"""

        def element(self):
            """Return the element stored at this Position"""
            raise NotImplementedError('must be implemented by subclass')

        def __eq__(self, other):
            """Return True if other Position represents the same location"""
            raise NotImplementedError('must be implemented by subclass')

        def __ne__(self, other):
            """Return True if other does not represent the same location"""
            return not (self == other)

    # -------------- abstract methods that concrete subclass must support -------------

    def root(self):
        """Return Position representing the tree's root (or None if empty)"""
        raise NotImplementedError('must be implemented by subclass')

    def parent(self, p):
        """Return Position representing p's parent (or None if p is root)"""
        raise NotImplementedError('must be implemented by subclass')

    def num_children(self, p):
        """Return the number of children that Position p has"""
        raise NotImplementedError('must be implemented by subclass')

    def children(self, p):
        """Generate an iteration of Positions representing p's children"""
        raise NotImplementedError('must be implemented by subclass')

    def __len__(self):
        """Return the total number of elements in the tree"""
        raise NotImplementedError('must be implemented by subclass')

    # -------------- concrete methods implemented in this class ------------------

    def is_root(self, p):
        """Return True if Position p represents the root of the tree"""
        return self.root() == p

    def is_leaf(self, p):
        """Return True if Position p does not have any children"""
        return self.num_children(p) == 0

    def is_empty(self):
        """Return True if the tree is empty"""
        return len(self) == 0

    def depth(self, p):
        """Return the number of levels separating Position p from the root"""
        if self.is_root(p):
            return 0
        else:
            return 1 + self.depth(self.parent(p))

    def height(self, p=None):
        """
        Return the height of the subtree rooted at Position p
        If p is None, return the height of the entire tree
        """
        if p is None:
            p = self.root()
        return self._height(p)

    def _height(self, p):
        """Return the height of the subtree rooted at Position p"""
        if self.is_leaf(p):
            return 0
        else:
            return 1 + max(self._height(c) for c in self.children(p))

    def __iter__(self):
        """Generate an iteration of the tree's elements"""
        for p in self.positions():
            yield p.element()

    def positions(self):
        """Generate an iteration of the tree's positions"""
        return self.preorder()

    def preorder(self):
        """Generate a preorder iteration of positions in the tree"""
        if not self.is_empty():
            for p in self._subtree_preorder(self.root()):
                yield p

    def _subtree_preorder(self, p):
        """Generate a preorder iteration of positions in subtree rooted at p"""
        yield p                                      # visit p before its subtrees
        for c in self.children(p):                   # for each child c
            for other in self._subtree_preorder(c):  # do preorder of c's subtree
                yield other                          # yielding each to our caller

    def postorder(self):
        """Generate a postorder iteration of positions in the tree"""
        if not self.is_empty():
            for p in self._subtree_postorder(self.root()):
                yield p

    def _subtree_postorder(self, p):
        """Generate a postorder iteration of positions in subtree rooted at p"""
        for c in self.children(p):                    # for each child c
            for other in self._subtree_postorder(c):  # do postorder of c's subtree
                yield other                           # yielding each to our caller
        yield p                                       # visit p after its subtrees

    def breadthfirst(self):
        """Generate a breadth-first iteration of the positions of the tree"""
        if not self.is_empty():
            fringe = deque()                # known positions not yet yielded
            fringe.append(self.root())      # starting with the root
            while len(fringe) > 0:
                p = fringe.popleft()        # remove from front of the queue
                yield p                     # report this position
                for c in self.children(p):
                    fringe.append(c)        # add children to back of queue
