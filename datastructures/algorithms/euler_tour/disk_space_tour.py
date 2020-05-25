
from .euler_tour import EulerTour


class DiskSpaceTour(EulerTour):

    def _hook_postvisit(self, p, d, path, results):
        # we simply add space associated with p to that of its subtrees
        return p.element() + sum(results)

