#include <iostream>
#include <iomanip>
#include <cstdlib>
#include <cmath>

using namespace std;

const double PI = 3.14159;

struct circle 
{
    double radius;
    double diameter;
    double area;
};

int main()
{
    circle c;

    cout << "Enter the diameter of a circle: ";
    cin >> c.diameter;

    c.radius = c.diameter / 2;

    
    c.area = PI * pow(c.radius, 2.0);

    cout << fixed << showpoint << setprecision(2);
    cout << "The radius and area of the circle are:\n";
    cout << "Radius: " << c.radius << endl;
    cout << "Area: " << c.area << endl;

    return 0;
}