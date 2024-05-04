#include <iostream>


using namespace std;


class Payroll {
private:
    double hourlyPayRate;
    double hoursWorked;
    double totalPay;

public:
    Payroll(double payRate = 0, double hours = 0) {

    hourlyPayRate = payRate;
    hoursWorked = hours;
    totalPay = 0;
}


    void saatlikOdemeFonksiyonu(double payRate) {
        hourlyPayRate = payRate;
    }

    void kacSaatCalisti(double hours) {
        if (hours <= 60) {
            hoursWorked = hours;
        } else {
            cout << "Error: It couldn't be 60.\n";
        }
    }

    double odemeyiHesapla() {
        if (hoursWorked <= 40) {
            totalPay = hourlyPayRate * hoursWorked;
        } else {
            totalPay = (hourlyPayRate * 40) + (hourlyPayRate * 1.5 * (hoursWorked - 40));
        }
        return totalPay;
    }
};

int main() {
    Payroll isciDizisi[7];
    double hours;

    for (int i = 0; i < 7; ++i) {
        cout << "Enter pay rate for employee " << i + 1 << ": $";
        double payRate;
        cin >> payRate;
        isciDizisi[i].saatlikOdemeFonksiyonu(payRate);

        cout << "Enter hours worked for employee " << i + 1 << ": ";
        cin >> hours;
        isciDizisi[i].kacSaatCalisti(hours);
    }

    cout << "\nGross pay for each employee:\n";
    for (int i = 0; i < 7; ++i) {
        double grossPay = isciDizisi[i].odemeyiHesapla();
        cout << "Employee " << i + 1 << " : " << grossPay << "$" << endl;
    }

    return 0;
}
