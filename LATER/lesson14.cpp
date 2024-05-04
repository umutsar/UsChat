
#include <iostream>
using namespace std;

class Square
{

private:
    float width;

public:
    Square(float _width = 9)
    {
        width = _width;
    }

    void setWidth(float _width)
    {
        width = _width;
    }

    float getArea() const
    {
        return width * width;
    }

    float getPerimeter() const
    {
        return width * 4;
    }
};

int main()
{
    Square box1;
    Square box;

    float size;

    cout << "Please input the size of the side of the squeare:" << endl;
    cin >> size;
    box.setWidth(size);

    cout << "The area of the square is " << box.getArea() << endl;
    cout << "The perimeter of the square is " << box.getPerimeter() << endl;

    cout << "The ares of box1 is " << box1.getArea() << endl;
    cout << "The perimeter of box1 is " << box1.getPerimeter() << endl;

    return 0;
}
