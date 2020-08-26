from functools import cmp_to_key
import math

# https://baptiste-wicht.com/posts/2010/04/closest-pair-of-point-plane-sweep-algorithm.html
# https://www.hackerearth.com/practice/math/geometry/line-sweep-technique/tutorial/
# https://www.cs.mcgill.ca/~cs251/ClosestPair/ClosestPair1D.html
# https://www.cs.mcgill.ca/~cs251/ClosestPair/ClosestPairDQ.html
# https://www.cs.mcgill.ca/~cs251/ClosestPair/ClosestPairPS.html
# http://www.jn.inf.ethz.ch/education/script/P6_C26.pdf

class DummyTreeSet:
    def __init__(self, seq=[], cmp=lambda a, b: a - b):
        self.key = cmp_to_key(cmp)
        self.seq = sorted(seq, key=self.key)

    def __repr__(self):
        return self.seq.__repr__()

    def __len__(self):
        return len(self.seq)

    def __getitem__(self, item):
        return self.seq[item]

    def __iter__(self):
        return iter(self.seq)

    def first(self):
        return self.seq[0] if self.seq else None

    def last(self):
        return self.seq[-1] if self.seq else None

    def get_first(self):
        return self.seq.pop(0)

    def get_last(self):
        return self.seq.pop()

    def set(self, value):
        if not len(self.seq):
            self.seq.append(value)
            return
        key = self.key
        index_to_insert = self._index(value, comp='gte')

        if index_to_insert == -1:  # did not found a value gte with value
            index_to_insert = len(self.seq)

        if index_to_insert == len(self.seq):
            self.seq.append(value)
            return

        if key(self.seq[index_to_insert]) == key(value):
            return
        # self.seq[index_to_insert:index_to_insert] = [value]
        self.seq.insert(index_to_insert, value)

    def delete(self, value):
        index_to_delete = self._index(value)
        if index_to_delete >= 0:
            return self.seq.pop(index_to_delete)

    def subset(self, low_value=None, high_value=None, low_inclusive=True, high_inclusive=True):
        if not self.seq:
            return []

        key = self.key
        low_value = low_value if low_value is not None else self.seq[0]
        high_value = high_value if high_value is not None else self.seq[-1]

        low_index = self._index(low_value, comp='gte')
        if key(self.seq[low_index]) > key(high_value):
            return []
        high_index = self._index(high_value, comp='lte')
        if key(self.seq[high_index]) < key(low_value):
            return []

        if high_inclusive or key(high_value) > key(self.seq[high_index]):
            high_index += 1
        if key(low_value) == key(self.seq[low_index]) and not low_inclusive:
            low_index += 1

        return self.seq[low_index:high_index]

    def _index(self, value, comp='eq'):
        # binary search
        key = self.key
        low = 0
        high = len(self.seq) - 1
        while low <= high:
            mid = (low + high) // 2
            if key(self.seq[mid]) == key(value):
                return mid
            elif key(self.seq[mid]) < key(value):
                low = mid + 1
            else:
                high = mid - 1

        # at this point low is > than high
        if comp == 'gte' and low <= len(self.seq) - 1:
            return low
        elif comp == 'lte':
            return high
        else:
            return -1


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return '(x: {}, y: {})'.format(self.x, self.y)

    def distance(self, other):
        return round(math.sqrt((other.x - self.x) ** 2 + (other.y - self.y) ** 2), 2)


def print_points(sorted_set):
    last_y = 0
    for x in range(20):
        if sorted_set.first() is not None and sorted_set.first().y == 0 and sorted_set.first().x == x:
            sorted_set.get_first()  # pop first
            print(' *', end='  ')
        else:
            print('{0:02d}'.format(x), end='  ')
    print('')

    first_line_point = None
    for i, p in enumerate(sorted_set):
        if p.y > last_y:
            first_line_point = p
        while p.y > last_y:
            last_y += 1
            print(
                ' *' if p.x == 0 and p.y == last_y else '{0:02d}'.format(last_y),
                end='\n\n' if (p.y > last_y) else ''
            )
        print(
            (((p.x - (sorted_set[i-1].x if p is not first_line_point else 0)) * 4 - 4) * ' ') + '   *' if p.x > 0 else '',
            end='\n\n' if i < len(sorted_set) - 1 and sorted_set[i + 1].y > p.y else ''
        )
    print('')


def closets_pair(points, last=False):
    sorted_x = sorted(points, key=cmp_to_key(lambda p1, p2: p1.x - p2.x or p1.y - p2.y))
    candidates_sorted_y = DummyTreeSet([], lambda p1, p2: p1.y - p2.y or p1.x - p2.x)
    min_dist = float('inf')
    left_most_candidate = 0
    closest_pair = [None, None]

    for curr_point in sorted_x:
        while curr_point.x - sorted_x[left_most_candidate].x > min_dist:
            candidates_sorted_y.delete(sorted_x[left_most_candidate])
            left_most_candidate += 1

        upper_bound = Point(curr_point.x, curr_point.y + min_dist)
        lower_bound = Point(curr_point.x, curr_point.y - min_dist)

        for candidate in candidates_sorted_y.subset(lower_bound, upper_bound):
            distance = curr_point.distance(candidate)
            # print(curr_point, candidate, distance)
            if last and distance <= min_dist or distance < min_dist:
                min_dist = distance
                closest_pair[0] = candidate
                closest_pair[1] = curr_point

        candidates_sorted_y.set(curr_point)
    return min_dist, closest_pair


points = [
    Point(0, 0),
    Point(3, 2),
    Point(5, 2),
    Point(6, 3),
    Point(3, 4),
    Point(0, 5),
    Point(2, 5),
    Point(6, 6),
]

tree_set = DummyTreeSet(points, cmp=lambda p1, p2: p1.y - p2.y or p1.x - p2.x)


print(tree_set)
print_points(tree_set)
print(closets_pair(points, last=False))
