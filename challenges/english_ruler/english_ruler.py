
def draw_line(ticks):
    print('-' * ticks)


def draw_interval(ticks):
    if ticks == 0:
        return
    draw_interval(ticks - 1)
    draw_line(ticks)
    draw_interval(ticks - 1)

def english_ruler_1(ticks):
    draw_line(ticks)
    draw_interval(ticks)
    draw_line(ticks)

def english_ruler_2(ticks, length):
    draw_line(ticks)
    for i in range(length):
        draw_interval(ticks)
        draw_line(ticks)


draw_interval(3)
# english_ruler_1(3)
# english_ruler_2(3, 2)
