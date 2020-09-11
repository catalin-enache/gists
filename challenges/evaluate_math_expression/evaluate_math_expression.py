import re


def evaluate(s):
    def precedence(op):
        if op in ('*', '/'):
            return 2
        elif op in ('+', '-'):
            return 1
        else:
            return 0

    def calc(left, right, op):
        # print('calc', left, op, right)
        return {
            '+': lambda: left + right,
            '-': lambda: left - right,
            '*': lambda: left * right,
            '/': lambda: left / right,
        }[op]()

    def operate(op, _operators_stack, _operands_stack):
        # print('operate', op, _operators_stack, _operands_stack)
        if op == ')':
            while _operators_stack[-1] != '(':
                right, _op, left = _operands_stack.pop(), _operators_stack.pop(), _operands_stack.pop()
                _operands_stack.append(calc(left, right, _op))
            _operators_stack.pop()  # also eject '('
        elif op == '(' or precedence(_operators_stack[-1]) < precedence(op):
            _operators_stack.append(op)
        else:
            while precedence(_operators_stack[-1]) >= precedence(op):
                top_op = _operators_stack.pop()
                right, left = _operands_stack.pop(), _operands_stack.pop()
                _operands_stack.append(calc(left, right, top_op))
            _operators_stack.append(op)

    seq = s.split()
    seq.append(')')
    operands_stack = []
    operators_stack = ['(']

    while seq:
        curr = seq.pop(0)
        # print('curr', curr)
        if re.match(r'\d+', curr):
            operands_stack.append(int(curr))
        else:
            operate(curr, operators_stack, operands_stack)

    return operands_stack.pop()


# every char must be separated by a space
print(evaluate('3 * 6 + 3'))  # 21
print(evaluate('3 + 5 * 3'))  # 18
print(evaluate('( 1 + 1 ) * ( 5 - 1 ) + 1 * 3'))  # 11
print(evaluate('( 6 + 5 ) * 4 - 9'))  # 35
print(evaluate('6 + 5 * 4 - 9'))  # 17
print(evaluate('6 + 5 + 4 - 9'))  # 6

