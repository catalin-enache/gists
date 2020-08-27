# https://www.cs.mcgill.ca/~cs251/ClosestPair/ClosestPair1D.html
# https://www.cs.mcgill.ca/~cs251/ClosestPair/ClosestPairDQ.html
# https://www.geeksforgeeks.org/closest-pair-of-points-using-divide-and-conquer-algorithm/
# https://www.geeksforgeeks.org/closest-pair-of-points-onlogn-implementation ***

import math


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return '(x: {}, y: {})'.format(self.x, self.y)

    def distance(self, other):
        return round(math.sqrt((other.x - self.x) ** 2 + (other.y - self.y) ** 2), 2)


def brute_force(points):
    _min = float('inf')
    n = len(points)

    for i in range(n):
        for j in range(i + 1, n):
            dist = points[i].distance(points[j])
            if dist < _min:
                _min = dist
    return _min


def strip_closest(strip, d):
    """
    A utility function to find the distance between the closest points of
    strip of a given size. All points in strip[] are sorted according to
    y coordinate. They all have an upper bound on minimum distance as d.
    Note that this method seems to be a O(n^2) method, but it's a O(n)
    method as the inner loop runs at most 6 times
    """
    size = len(strip)
    _min = d

    # Pick all points one by one and try the next points till the difference
    # between y coordinates is smaller than d.
    # This is a proven fact that this loop runs at most 6 times
    for i in range(size):
        for j in range(i + 1, size):
            if strip[j].y - strip[i].y >= _min:
                break
            _min = strip[i].distance(strip[j])
    return _min


# A recursive function to find the smallest distance. The array Px contains
# all points sorted according to x coordinates and Py contains all points
# sorted according to y coordinates
def closest_util(px, py):
    # len(px) must be equal with len(py) !
    n = len(px)  # or len(Py)
    # If there are 2 or 3 points, then use brute force
    if n <= 3:
        return brute_force(px)

    # Find the middle point
    mid = n // 2
    mid_point = px[mid]

    # Divide points in y sorted array around the vertical line.
    # Assumption: All x coordinates are distinct ??
    pyl = []  # y sorted points on left of vertical line
    pyr = []  # y sorted points on right of vertical line
    for i in range(n):
        # len(pyl) - 1 < mid condition is because len(px) must be equal with len(py)
        if py[i].x <= mid_point.x and len(pyl) < mid:
            pyl.append(py[i])
        else:
            pyr.append(py[i])

    # print(mid_point, px[:mid], pyl, px[mid:], pyr)

    # Consider the vertical line passing through the middle point
    # calculate the smallest distance dl on left of middle point and
    # dr on right side
    dl = closest_util(px[:mid], pyl)
    dr = closest_util(px[mid:], pyr)
    # Find the smaller of two distances
    d = min(dl, dr)

    # Build an array strip[] that contains points close (closer than d)
    # to the line passing through the middle point
    # strip is already sorted by y due to operating on py
    strip = []
    for i in range(n):
        if abs(py[i].x - mid_point.x) < d:
            strip.append(py[i])

    # Find the closest points in strip.
    # Return the minimum of d and closest distance is strip[]
    return strip_closest(strip, d)


def closest_pair(points):
    px = sorted(points[:], key=lambda p: p.x)
    py = sorted(points[:], key=lambda p: p.y)
    print('px', px)
    print('py', py)
    return closest_util(px, py)
    # return brute_force(points)


points_arr = [Point(2, 3), Point(12, 30), Point(40, 50), Point(5, 1), Point(12, 10), Point(3, 4)]
print(closest_pair(points_arr))
