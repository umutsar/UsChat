
#include <iostream>

using namespace std;

int main() {


    int x = 25;
    int *ptr = nullptr;

    ptr = &x;

    cout << "here is the value in x, printed twice: \n";
    cout << x << endl;
    cout << *ptr << endl;




    *ptr = 100;

    cout << "Once again, here is the value in x: \n"; 
    cout << x << endl;
    cout << *ptr << endl;
    

    return 0;
}