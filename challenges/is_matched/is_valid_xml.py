
invalid_tag_char = ['<', '/', '\\']
invalid_txt_char = []


def is_valid_xml(txt):
    cursor = 0
    txt_len = len(txt)
    stack = []
    at_least_a_tag_found = False
    while cursor < txt_len:
        char = txt[cursor]
        if char in invalid_txt_char:
            return False
        if char != '<':
            cursor += 1
        else:
            j = cursor + 1
            if j == txt_len:
                return False
            is_starting_tag = txt[j] != '/'
            tag = [txt[j]] if is_starting_tag else []
            while txt[j] != '>':
                j += 1
                if j == txt_len or txt[j] in invalid_tag_char:
                    return False
                tag.append(txt[j])
            tag_str = ''.join(tag)
            if is_starting_tag:
                stack.append(tag_str)
                at_least_a_tag_found = True
            else:  # is closing tag
                if not len(stack):
                    return False
                last_starting_tag = stack.pop()
                if last_starting_tag != tag_str:
                    return False
            cursor = j + 1

    return at_least_a_tag_found and not len(stack)


if __name__ == "__main__":
    assert is_valid_xml("<a>xx</a>")
    assert is_valid_xml("<a></a>")
    assert is_valid_xml("<a>aa<b>bb<c>/</c></b></a>")
    assert is_valid_xml("<a>aa<b>bb<c>></c></b></a>")
    assert not is_valid_xml("<a>aa<b>bb<c>/></c></b></b>")
    assert not is_valid_xml("<")
    assert not is_valid_xml("<a")
    assert not is_valid_xml(">")
    assert not is_valid_xml("/")
    assert not is_valid_xml("</>")
    assert not is_valid_xml("<a>xx</b>")
    assert not is_valid_xml("<a></b>")
    assert not is_valid_xml("<a/>xx</a/>")
    assert not is_valid_xml("<a<>xx</a<>")
    assert not is_valid_xml("</b>")
    assert not is_valid_xml("<a>")
    assert not is_valid_xml("a</b>")
    assert not is_valid_xml("abc")
    assert not is_valid_xml("")

