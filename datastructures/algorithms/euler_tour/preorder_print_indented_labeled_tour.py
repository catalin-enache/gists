from .euler_tour import EulerTour


class PreorderPrintIndentedLabeledTour(EulerTour):
    def _hook_previsit(self, p, d, path):
        label = '.'.join(str(j + 1) for j in path)
        print(2 * d * ' ' + label + ':', p.element())
