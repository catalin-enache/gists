#include <iostream>
#include <string>
#include <memory>

using namespace std;

void print_array(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int& ref_function(int& n){
    // required action --> incrementing
    n += 1;
    // return reference variable
    return n;
}

int main() {
    int a = 0;
    int b = ref_function(a);
    cout << "a: " << a << "[" << &a << "]" << " b: " << b << "[" << &b << "]" << endl;
    b += 1;
    cout << "a: " << a << "[" << &a << "]" << " b: " << b << "[" << &b << "]" << endl;
    a = 0;
    int &c = ref_function(a);
    cout << "a: " << a << "[" << &a << "]" << " c: " << c << "[" << &c << "]" << endl;
    c += 1;
    cout << "a: " << a << "[" << &a << "]" << " c: " << c << "[" << &c << "]" << endl;
}
/*
a: 1[0xbc70fff6e4] b: 1[0xbc70fff6e0]
a: 1[0xbc70fff6e4] b: 2[0xbc70fff6e0]
a: 1[0xbc70fff6e4] c: 1[0xbc70fff6e4]
a: 2[0xbc70fff6e4] c: 2[0xbc70fff6e4]

*/

