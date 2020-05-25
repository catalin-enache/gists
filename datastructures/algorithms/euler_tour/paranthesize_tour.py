
from .euler_tour import EulerTour


class ParanthesizeTour(EulerTour):

    def _hook_previsit(self, p, d, path):
        if path and path[-1] > 0:  # p follows a sibling
            print(', ', end='')  # so preface with comma
        print(p.element(), end='')  # then print element
        if not self.tree().is_leaf(p):  # if p has children
            print(' (', end='')  # print opening parenthesis

    def _hook_postvisit(self, p, d, path, results):
        if not self.tree().is_leaf(p):  # if p has children
            print(')', end='')  # print closing parenthesis

