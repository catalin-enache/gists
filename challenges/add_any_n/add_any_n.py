

def find_any(seq, total, take=2, start=0):
    if take < 2:
        raise ValueError('take must be >= 2')
    if take == 2:
        candidates = set()
        for cursor in range(start, len(seq)):
            current = seq[cursor]
            if current in candidates:
                candidates.remove(current)
                yield total - current, current
            else:
                candidates |= {total - current}
    else:
        for cursor in range(start + 1, len(seq)):
            current = seq[cursor - 1]
            for match in find_any(seq, total - current, take - 1, start=cursor):
                yield (current,) + match


def find_any_using_stack(seq, total, take=2):
    if take < 2:
        raise ValueError('take must be >= 2')

    seq_len = len(seq)
    stack = [{
        'history': [],
        'current': None,
        'total': total,
        'take': take,
        'start': 0,
    }]

    while not len(stack) == 0:
        entry = stack.pop()
        _history = entry['history']
        _current = entry['current']
        _total = entry['total']
        _take = entry['take']
        _start = entry['start']
        if _take == 2:
            # main trick
            candidates = set()

            for i in range(_start, seq_len):
                current = seq[i]
                remaining = _total - current
                if current in candidates:
                    candidates.remove(current)
                    # one result at a time for take=2
                    if _current is not None:
                        yield (*_history, _current, remaining, current)
                    else:
                        yield (*_history, remaining, current)
                else:
                    candidates |= {_total - current}
        else:
            # try to reach main trick
            for i in range(_start + 1, seq_len - _take):
                current = seq[i - 1]
                remaining = _total - current
                take_less = _take - 1
                # basic optimisation
                if take_less * current >= remaining:
                    continue

                new_entry = {
                    'history': _history + [_current] if _current is not None else _history,
                    'current': current,
                    'total': remaining,
                    'take': take_less,
                    'start': i,
                }

                stack.append(new_entry)


_total = 25
_seq = list(range(1, _total + 1))

for _take in range(2, 7):
    res = list(find_any(_seq, _total, _take))
    print(len(res), len(set(res)))
    print(res)

print('-' * 50)

for _take in range(2, 7):
    res = list(find_any_using_stack(_seq, _total, _take))
    print(len(res), len(set(res)))
    print(res)

