#include <iostream>
#include <cstdlib>
#include <ctime>

using namespace std;

class Coin
{
private:
    string sideUp;

public:
    Coin()
    {
        toss();
    }

    void toss()
    {
        if (rand() % 2 == 0)
        {
            sideUp = "heads";
        }
        else
        {
            sideUp = "tails";
        }
    }

    string getSideUp() const
    {
        return sideUp;
    }
};

int main()
{
    srand(time(0));

    Coin quarter, dime, nickel;
    double balance = 0.0;

    cout << "************ WELCOME ****************" << endl;

    while (balance < 1.0)
    {
        quarter.toss();
        dime.toss();
        nickel.toss();

        cout << "Quarter: " << quarter.getSideUp() << endl;
        cout << "Dime: " << dime.getSideUp() << endl;
        cout << "Nickel: " << nickel.getSideUp() << endl;

        if (quarter.getSideUp() == "heads")
        {
            balance += 0.25;
        }
        if (dime.getSideUp() == "heads")
        {
            balance += 0.10;
        }
        if (nickel.getSideUp() == "heads")
        {
            balance += 0.05;
        }

        cout << "Current balance: $" << balance << endl
             << endl;
    }

    if (balance == 1.0)
    {
        cout << "Congratulations! You won the game!" << endl;
    }
    else
    {
        cout << "Sorry, you lost the game. Your balance exceeded $1." << endl;
    }

    return 0;
}
