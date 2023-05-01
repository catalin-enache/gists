#include <iostream>
#include <string>
#include<memory>


using namespace std;

int global = 100;

int add(int a, int b)
{
    return a + b;
}

int main() {
    int c = add(5, 7);
    cout << c << endl;
    return 0;
}

