#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;


class Die {
public:
    Die() {
        srand(time(0));
    }

    int roll() {
        return rand() % 6 + 1;
    }
};

int main() {
    Die dieObject;

    int totalPoints = 0;

    int choice;

    cout << "Do you want to continue to fishing? (1 = Yes, 0 = No): ";
    cin >> choice;

    while (choice == 1) {
        int result = dieObject.roll();

        if (result == 1)
            totalPoints += 10;
        else if (result == 2)
            totalPoints += 5;
        else
            totalPoints += 1;

        cout << "Caught fish: " << result << " (" << totalPoints << " total points)" << endl;

        cout << "Do you want to continue fishing? (1 = Yes, 0 = No): ";
        cin >> choice;
    }

    if (totalPoints >= 10)
        cout << "Congratulations! You are bset " << totalPoints << " points." << endl;
    else if (totalPoints >= 5)
        cout << "Good! " << totalPoints << " points." << endl;
    else
        cout << "You loss!" << totalPoints << " points." << endl;

    return 0;
}
