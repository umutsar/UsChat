
#include <iostream>

using namespace std;
#include "H_FILE.h"

MyClass::MyClass() {
}

void MyClass::setPrivateMember(int value) {
    privateMember = value;
}

int MyClass::getPrivateMember() {
    return privateMember;
}



int main() {
    cout << "Hello world!" << endl;

    return 0;
}