#include <iostream>
#include <iomanip>

using namespace std;

// Örnek bir Employee sınıfı
class Person
{
private:
    string name;
    string address;
    int age;
    string phoneNumber;

// name, address, age, and phone number

public:
    Person(string _name, string _address, int _age, string _phoneNumber)
    {
        name = _name;
        address = _address;
        age = _age;
        phoneNumber = _phoneNumber;
    }

    void setName(string _newName) {
        name = _newName;
    }

    void setAddress(string _newAddress) {
        address = _newAddress;
    }

    void setAge(int _newAge) {
        age = _newAge;
    }

    void setPhoneNumber(string _newPhoneNumber) {
        phoneNumber = _newPhoneNumber;
    }

    void showPersonInfo() {
        cout << "  Name: " << name << "  address: " << address 
        << "  age: " << age << "  Phone Number: " << phoneNumber << endl;
    }
};

int main()
{
    Person umut("Umut", "Merkez/Adıyaman", 20, "5343434343");
    Person alperen("Alperen", "Seydişehir/Konya", 20, "59393929193");
    Person talha("Talha", "Eskişehir/Merkez", 25, "5302029495");

    umut.showPersonInfo();
    alperen.showPersonInfo();
    talha.showPersonInfo();

    // change a person information:
    umut.setAddress("Şahinbey/Gaziantep");
    umut.setPhoneNumber("12345678910");
    umut.showPersonInfo();

    return 0;
}