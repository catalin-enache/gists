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
    n += 1;
    return n;
}

int* ref_function2(int& n){
    n += 1;
    return &n;
}

int main() {
    int a = 0;
    int b = ref_function(a);
    cout << "a: " << a << "[" << &a << "]" << " b: " << b << "[" << &b << "]" << endl;
    b += 1;
    cout << "a: " << a << "[" << &a << "]" << " b: " << b << "[" << &b << "]" << endl;
    a = 0;
    int &c = ref_function(a);
    int *d = ref_function2(c);
    cout << "a: " << a << "[" << &a << "]" << " c: " << c << "[" << &c << "]" << " d: " << *d << "[" << d << "]" << "[" << &d << "]" << endl;
    c += 1;
    cout << "a: " << a << "[" << &a << "]" << " c: " << c << "[" << &c << "]" << " d: " << *d << "[" << d << "]" << "[" << &d << "]" << endl;
}
/*
a: 1[0x16f9633cc] b: 1[0x16f9633c8]
a: 1[0x16f9633cc] b: 2[0x16f9633c8]
a: 2[0x16f9633cc] c: 2[0x16f9633cc] d: 2[0x16f9633cc][0x16f9633b8]
a: 3[0x16f9633cc] c: 3[0x16f9633cc] d: 3[0x16f9633cc][0x16f9633b8]
*/

