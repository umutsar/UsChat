#include <iostream>
#include <iomanip>

using namespace std;

class Inventory
{
private:
    int itemNumber;
    int quantity;
    double cost;
    double totalCost;

public:
    // Default constructor
    Inventory()
    {
        itemNumber = 0;
        quantity = 0;
        cost = 0;
        totalCost = 0;
    }

    // second constructor
    Inventory(int _itemNumber, double _cost, int _quantity)
    {
        setItemNumber(_itemNumber);
        setCost(_cost);
        setQuantity(_quantity);
        setTotalCost();
    }

    // Set functions
    void setItemNumber(int _itemNumber)
    {
        if (_itemNumber >= 0)
            itemNumber = _itemNumber;
        else
            cout << "Error: It can't be negative!" << endl;
    }

    void setCost(double _cost)
    {
        if (_cost >= 0)
            cost = _cost;
        else
            cout << "Error: It can't be negative!" << endl;
    }

    void setQuantity(int _quantity)
    {
        if (_quantity >= 0)
            quantity = _quantity;
        else
            cout << "Error: It can't be negative!" << endl;
    }

    void setTotalCost()
    {
        totalCost = quantity * cost;
    }

    // Get funtcions
    int getItemNumber() const
    {
        return itemNumber;
    }

    int getQuantity() const
    {
        return quantity;
    }

    double getCost() const
    {
        return cost;
    }

    double getTotalCost() const
    {
        return totalCost;
    }
};

int main()
{
    // create objects
    Inventory item1(1, 49.56, 12);
    Inventory item2(2, 39.10, 40);
    Inventory item3(3, 19.87, 20);

    // show informations
    cout << "Item Number: " << item1.getItemNumber() << endl;
    cout << "Quantity: " << item1.getQuantity() << endl;
    cout << "Cost: $" << fixed << setprecision(2) << item1.getCost() << endl;
    cout << "Total Cost: $" << fixed << setprecision(2) << item1.getTotalCost() << endl;
    cout << endl;

    cout << "Item Number: " << item2.getItemNumber() << endl;
    cout << "Quantity: " << item2.getQuantity() << endl;
    cout << "Cost: $" << fixed << setprecision(2) << item2.getCost() << endl;
    cout << "Total Cost: $" << fixed << setprecision(2) << item2.getTotalCost() << endl;
    cout << endl;

    cout << "Item Numberı: " << item3.getItemNumber() << endl;
    cout << "Quantity: " << item3.getQuantity() << endl;
    cout << "Cost: $" << fixed << setprecision(2) << item3.getCost() << endl;
    cout << "Total Cost: $" << fixed << setprecision(2) << item3.getTotalCost() << endl;
    cout << endl;

    return 0;
}
