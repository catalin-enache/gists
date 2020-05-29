from exceptions import Empty


class ArrayDeque:
    DEFAULT_CAPACITY = 10

    def __init__(self):
        self._data = [None] * self.__class__.DEFAULT_CAPACITY
        self._size = 0
        self._front = 0

    def __len__(self):
        return self._size

    def is_empty(self):
        return self._size == 0

    def first(self):
        if self.is_empty():
            raise Empty('Deque is empty')
        return self._data[self._front]

    def last(self):
        if self.is_empty():
            raise Empty('Deque is empty')
        return self._data[(self._front + self._size - 1) % len(self._data)]

    # queue FIFO
    def delete_first(self):
        if self.is_empty():
            raise Empty('Deque is empty')
        answer = self._data[self._front]
        self._data[self._front] = None
        self._front = (self._front + 1) % len(self._data)
        self._size -= 1
        if 0 < self._size < len(self._data) // 4:
            self._resize(len(self._data) // 2)
        return answer

    # queue FIFO
    def add_last(self, e):
        if self._size == len(self._data):
            self._resize(2 * len(self._data))
        avail = (self._front + self._size) % len(self._data)
        self._data[avail] = e
        self._size += 1

    def delete_last(self):
        if self.is_empty():
            raise Empty('Deque is empty')
        last = (self._front + self._size - 1) % len(self._data)
        answer = self._data[last]
        self._data[last] = None
        self._size -= 1
        if 0 < self._size < len(self._data) // 4:
            self._resize(len(self._data) // 2)
        return answer

    def add_first(self, e):
        if self._size == len(self._data):
            self._resize(2 * len(self._data))
        # def mod(a, b):
        #     return (((a % b) + b) % b)
        self._front = (self._front - 1) % len(self._data)
        self._data[self._front] = e
        self._size += 1

    def _resize(self, cap):
        old = self._data
        self._data = [None] * cap
        for k in range(self._size):
            self._data[k] = old[(self._front + k) % len(old)]
        self._front = 0


if __name__ == "__main__":
    deque = ArrayDeque()
    for i in range(11):
        deque.add_last(i)
    assert deque._data == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, None, None, None, None, None, None, None, None, None]
    for _ in range(7):
        deque.delete_first()
    assert deque._data == [7, 8, 9, 10, None, None, None, None, None, None]
    assert deque.first() == 7
    assert deque.last() == 10
    assert deque.delete_last() == 10
    assert deque._data == [7, 8, 9, None, None, None, None, None, None, None]
    deque.add_first(6)
    assert deque._data == [7, 8, 9, None, None, None, None, None, None, 6]
    assert deque.first() == 6
    deque.add_last(10)
    assert deque._data == [7, 8, 9, 10, None, None, None, None, None, 6]
    assert deque.delete_first() == 6
    assert deque._data == [7, 8, 9, 10, None, None, None, None, None, None]

