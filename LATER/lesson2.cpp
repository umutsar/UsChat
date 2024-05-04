
#include <iostream>

using namespace std;

int main() {


    int x = 25, y = 50, z = 75;

    int *ptr = nullptr;

    cout << "here are the values of x, y, and z: \n";
    cout << x << "  " << y << "  " << z << "  " << endl;

    ptr = &x;
    *ptr += 100;

    ptr = &x;
    *ptr += 100;

    ptr = &z;
    *ptr += 100;

    
    cout << "Once again, her are the values of x, y, and z: \n";
    cout << x << "  " << y << "  " << z << "  " << endl;
    

    return 0;
}