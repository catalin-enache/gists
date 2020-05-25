from doubly_linked_base import _DoublyLinkedBase
from exceptions import Empty


class LinkedDeque(_DoublyLinkedBase):
    """Double-ended queue implementation based on a doubly linked list"""

    def first(self):
        """Return (but do not remove) the element at the front of the deque"""
        if self.is_empty():
            raise Empty('Deque is empty')
        return self._header._next._element

    def last(self):
        """Return (but do not remove) the element at the back of the deque"""
        if self.is_empty():
            raise Empty('Deque is empty')
        return self._trailer._prev._element

    def insert_first(self, e):
        """Add an element to the front of the deque"""
        self._insert_between(e, self._header, self._header._next)

    def insert_last(self, e):
        """Add an element to the back of the deque"""
        self._insert_between(e, self._trailer._prev, self._trailer)

    def delete_first(self):
        """
        Remove and return the element from the front of the deque
        Raise Empty exception if the deque is empty
        """
        if self.is_empty():
            raise Empty('Deque is empty')
        return self._delete_node(self._header._next)

    def delete_last(self):
        """
        Remove and return the element from the back of the deque
        Raise Empty exception if the deque is empty
        """
        if self.is_empty():
            raise Empty('Deque is empty')
        return self._delete_node(self._trailer._prev)


if __name__ == "__main__":
    deq = LinkedDeque()
    assert deq.is_empty()
    deq.insert_first(1)
    assert not deq.is_empty()
    assert deq.first() == 1
    assert deq.last() == 1
    deq.insert_last(2)
    assert deq.first() == 1
    assert deq.last() == 2
    deq.delete_first()
    assert deq.first() == 2
    assert deq.last() == 2
    deq.delete_last()
    assert deq.is_empty()
