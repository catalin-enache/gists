
import functools


def to_binary(days):
    res = [0 for _ in range(30)]
    for day in days:
        res[day - 1] = 1
    return res

ranges = list(map(lambda num: num * 7, [1, 2, 3, 5]))  # [7, 14, 21, 35]


def min_price_for_days(days):
    days_length = len(days)

    if days_length <= 7:
        return min(7, functools.reduce(lambda acc, day: acc + 2 * day, days, 0))

    for interval_index in range(len(ranges) - 1):
        interval = ranges[interval_index]
        next_interval = ranges[interval_index + 1]

        if days_length <= next_interval:
            possible_results = []
            for range_start, range_end in ([i, i + interval] for i in range(days_length - interval + 1)):
                min_price_left = min_price_for_days(days[0:range_start])
                min_price_interval = min_price_for_days(days[range_start:range_end])
                min_price_right = min_price_for_days(days[range_end:days_length])
                possible_result = min_price_left + min_price_interval + min_price_right
                possible_results.append(possible_result)

            return min(possible_results)
    return 0


def solution(days):
    if len(days) >= 23: return 25
    bin_array = to_binary(days)
    return min_price_for_days(bin_array)


months = [
    [1, 2, 4, 5, 7, 29, 30],  # => 11 // original example
    [5],  # => 2
    [5, 7],  # => 4
    [5, 6, 8],  # => 6
    [15, 16, 17, 18, 19, 20, 21, 22],  # => 9
    [2, 6, 7, 8, 9, 10],  # => 9 // should take the right side
    [1, 2, 5, 6, 7, 8, 9, 10, 12, 13],  # => 14 // should not take from middle even is max possible but should split in two
    [1, 2, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17],  # => 18
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23],  # => 23
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],  # => 25
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],  # => 25
]


def run():
    for days in months:
        print(days, ' => ', solution(days))


if __name__ == '__main__':
    import timeit
    print('time:', int(round(timeit.timeit("run()", setup="from __main__ import run", number=1) * 1000)), 'ms')




