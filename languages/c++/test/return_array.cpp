#include <iostream>
#include <string>
#include <memory>

using namespace std;

double* return_array_a(double x) {
    static double arr[10];
    for (auto &e: arr) {
        e = x;
    }
    return arr;
}

double (&return_array_b(double x))[10] {
    static double arr[10];
    for (auto &e: arr) {
        e = x;
    }
    return arr;
}

//template <typename T> void print_array(const T arr[], int size)
template <typename T> void print_array(const T (&arr), int size) {
    for (int i = 0; i < size; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
}


int main() {
    auto *ra_a = return_array_a(42.0);
    print_array(ra_a, 10);
    auto &ra_b = return_array_b(43.0);
    print_array(ra_b, 10);
}
/*
42 42 42 42 42 42 42 42 42 42
43 43 43 43 43 43 43 43 43 43
*/

