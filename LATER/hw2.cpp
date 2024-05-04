#include <iostream>
#include <string>
#include <iomanip>

using namespace std;

class Employee
{
private:
    string name;
    int idNumber;
    string department;
    string position;

public:
    // Construtor
    Employee(string _name = "", int _idNumber = 0, string _department = "", string _position = "")
    {
        name = _name;
        idNumber = _idNumber;
        department = _department;
        position = _position;
    }

    // public functions
    string getName()
    {
        return name;
    }
    int getIdNumber()
    {
        return idNumber;
    }
    string getDepartment()
    {
        return department;
    }
    string getPosition()
    {
        return position;
    }
};

int main()
{
    // Create 3 employe
    Employee employee1("Susan Meyers", 47899, "Accounting", "Vice President");
    Employee employee2("Mark Jones", 39119, "IT", "Programmer");
    Employee employee3("Joy Rogers", 81774, "Manufacturing", "Engineer");

    cout << setw(25) << "Name";
    cout << setw(16) << "ID Number";
    cout << setw(16) << "Department";
    cout << setw(16) << "Position" << endl;
    cout << "************************************************************************" << endl;

    cout << "Employee 1:";
    cout << setw(16) << employee1.getName();
    cout << setw(16) << employee1.getIdNumber();
    cout << setw(16) << employee1.getDepartment();
    cout << setw(16) << employee1.getPosition() << endl;

    cout << "Employee 2:";
    cout << setw(16) << employee2.getName();
    cout << setw(16) << employee2.getIdNumber();
    cout << setw(16) << employee2.getDepartment();
    cout << setw(16) << employee2.getPosition() << endl;

    cout << "Employee 3:";
    cout << setw(16) << employee3.getName();
    cout << setw(16) << employee3.getIdNumber();
    cout << setw(16) << employee3.getDepartment();
    cout << setw(16) << employee3.getPosition() << endl;

    return 0;
}
