import ctypes


class DynamicArray:
    """A dynamic Array class akin to a simplified Python list"""

    def __init__(self, *args):
        args_len = len(args)
        _iter = args if args_len > 1 else args[0] if args_len == 1 else None

        self._n = 0
        self._capacity = len(_iter) if _iter is not None else 1
        self._A = self._make_array(self._capacity)

        [self.append(value) for value in _iter if _iter is not None]

    def __len__(self):
        """Return number of elements stored in the array"""
        return self._n

    def __getitem__(self, key):
        """Return element at index k"""
        if isinstance(key, slice):
            start = key.start
            stop = key.stop
            step = key.step
            if stop is None or stop > self._n:
                stop = self._n
            new_slice = slice(start, stop, step)
            return DynamicArray(self._A[new_slice])
        else:
            if key < 0:
                key = self._n + key
            if not 0 <= key < self._n:
                raise IndexError('invalid index')
            return self._A[key]

    def __setitem__(self, key, value):
        self._A[key] = value

    def __str__(self):
        return 'DynamicArray: [' + ', '.join([str(self._A[i]) for i in range(self._n)]) + ']'

    def index(self, value, start=None, stop=None):
        start = 0 if start is None else start
        stop = self._n if stop is None else stop
        for k in range(start, stop):
            if self._A[k] == value:
                return k
        raise ValueError('value not found')

    def append(self, value):
        """Add value to end of the array"""
        self.insert(self._n, value)

    def insert(self, key, value):
        """Insert value at index k, shifting subsequent values rightward"""
        if key < 0:
            key = self._n + key + 1
        if not 0 <= key <= self._n:
            raise IndexError('invalid index')
        if self._n == self._capacity:
            self._resize(2 * self._capacity)
        for j in range(self._n, key, -1):
            self._A[j] = self._A[j - 1]
        self._A[key] = value
        self._n += 1

    def remove(self, value):
        """Remove first occurrence of value (or raise ValueError)"""
        self.pop(self.index(value))

    def pop(self, k=None):
        k = self._n if k is None else k
        for j in range(k, self._n - 1):
            self._A[j] = self._A[j + 1]
        self._A[self._n - 1] = None
        self._n -= 1
        quarter_capacity = self._capacity // 4
        if self._n <= quarter_capacity:
            self._resize(quarter_capacity)

    def _resize(self, c):
        """Resize internal array to capacity c"""
        if c == 0:
            # do not resize to 0; we need at least 1
            return
        B = self._make_array(c)
        for k in range(self._n):
            B[k] = self._A[k]
        self._A = B
        self._capacity = c

    @staticmethod
    def _make_array(c):
        """Return new array with capacity c"""
        return (c * ctypes.py_object)()  # see ctypes documentation

if __name__ == "__main__":
    seed = [3, 4, 5, 6, 7]
    arr = DynamicArray(seed)
    arr_2 = DynamicArray(*seed)
    assert list(arr) == seed
    assert list(arr_2) == seed
    arr.append(8)
    assert list(arr) == [3, 4, 5, 6, 7, 8]
    arr.pop()
    assert list(arr) == seed
    try:
        arr.index(3, 1)
    except ValueError:
        pass
    assert arr.index(3) == 0
    arr.insert(0, 9)
    assert arr[0] == 9
    assert len(arr) == 6
    arr.remove(9)
    assert list(arr) == seed
    arr[0:3] = [8, 9, 10]
    assert list(arr) == [8, 9, 10, 6, 7]
    arr[0], arr[1], arr[2] = 3, 4, 5
    assert list(arr) == seed
    assert isinstance(arr[:], DynamicArray)











