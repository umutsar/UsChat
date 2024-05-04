#include <iostream>
#include <iomanip>

using namespace std;

class RetailItem
{
private:
    string description;
    int unitsOnHand;
    double price;

public:
    RetailItem(string _description = "no desc", int _unitsOnHand = 0, double _price = 0)
    {
        description = _description;
        unitsOnHand = _unitsOnHand;
        price = _price;
    }

    void setDescription(string _description)
    {
        description = _description;
    }

    void setUnitsOnHand(int _unitsOnHand)
    {
        unitsOnHand = _unitsOnHand;
    }

    void setPrice(double _price)
    {
        price = _price;
    }

    void showItemInfo() {
        cout << "Description: " << left << setw(20) << description
             << "Units On Hand: " << setw(3) << unitsOnHand
             << "Price: " << setw(10) << price << endl;
    }
};

int main()
{
    RetailItem items[3];

    // set descriptions
    items[0].setDescription("Jacket");
    items[1].setDescription("Designer Jeans");
    items[2].setDescription("Shirt");

    // set units on hand
    items[0].setUnitsOnHand(12);
    items[1].setUnitsOnHand(40);
    items[2].setUnitsOnHand(20);

    // set price
    items[0].setPrice(59.95);
    items[1].setPrice(34.95);
    items[2].setPrice(24.95);
    
    // printing
    for (int i = 0; i < 3; i++)
    {
        items[i].showItemInfo();
    }

    return 0;
}