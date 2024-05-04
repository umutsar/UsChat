#include <iostream>
#include <iomanip>

using namespace std;

// Örnek bir Employee sınıfı
class Car
{
private:
    int yearModel;
    string make;
    int speed;

public:
    Car(int _yearModel = 0, string _make = "", int _speed = 0)
    {
        yearModel = _yearModel;
        make = _make;
        speed = _speed;
    }

    int getYearModel()
    {
        return yearModel;
    }

    string getMake()
    {
        return make;
    }

    int getSpeedInfo()
    {
        return speed;
    }

    void accelerate()
    {
        speed += 5;
    }

    void brake()
    {
        speed -= 5;
    }
};

int main()
{
    Car fiesta(2019, "Ford");
    Car megan(2018, "Renault");
    Car leon(2021, "Seat");

    fiesta.accelerate();
    fiesta.accelerate();

    megan.accelerate();
    megan.accelerate();
    megan.accelerate();

    leon.accelerate();
    leon.accelerate();
    leon.accelerate();
    leon.accelerate();

    fiesta.brake();
    leon.brake();
    leon.brake();

    cout << "Fiesta speed: " << fiesta.getSpeedInfo() << endl;
    cout << "Megan speed: " << megan.getSpeedInfo() << endl;
    cout << "Leon speed: " << leon.getSpeedInfo() << endl;

    return 0;
}