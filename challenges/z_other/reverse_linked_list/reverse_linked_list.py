
class Node:
    def __init__(self, value):
        self.next = None
        self.value = value

    def __repr__(self):
        return 'Node <{0:s}>'.format(str(self.value))


class LinkedList:
    def __init__(self, node):
        self.head = node
        self.size = 1

    def add(self, node):
        node.next = self.head
        self.head = node
        self.size += 1

    def walk(self):
        current = self.head
        while current.next:
            yield current
            current = current.next
        yield current


def reverse_linked_list(ll):
    prev = None
    current = ll.head
    while current:
        next = current.next
        current.next = prev
        prev = current
        current = next
    ll.head = prev


linked_list = LinkedList(Node(1))
for i in range(2, 11):
    linked_list.add(Node(i))


print([node for node in linked_list.walk()])
reverse_linked_list(linked_list)
print([node for node in linked_list.walk()])





