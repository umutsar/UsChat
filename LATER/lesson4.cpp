#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

void generateRandomNumbers(int* arr, int size) {
    for (int i = 0; i < size; ++i) {
        *(arr + i) = rand() % 100 + 1;
    }
}

void printArray(int* arr, int size) {
    cout << "Random numbers: \n";
    for (int i = 0; i < size; ++i) {
        cout << *(arr + i) << endl;
    }
    cout << endl;
}

int main() {
    srand(time(nullptr));

    const int SIZE = 5;

    
    int* arr = new int[SIZE];

    generateRandomNumbers(arr, SIZE);

    printArray(arr, SIZE);

    
    delete[] arr;
    arr = nullptr;

    return 0;
}