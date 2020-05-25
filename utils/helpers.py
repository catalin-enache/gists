from contextlib import contextmanager
import time


@contextmanager
def bench(name):
    start = time.time()
    yield
    print('{}: '.format(name), time.time() - start)