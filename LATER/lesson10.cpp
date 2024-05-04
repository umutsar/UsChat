#include <iostream>

using namespace std;

class PayRoll {
private:
    int hourlyPayRate;
    int hoursWorked;
    int totalPay;

public:
    PayRoll(int payRate = 0, int hours = 0) {
        hourlyPayRate = payRate;
        hoursWorked = hours;
        totalPay = 0;
    }

    void setHourlyPayRate(int payRate) {
        hourlyPayRate = payRate;
    }

    void setHoursWorked(int hours) {
        if (hours <= 60) {
            hoursWorked = hours;
        } else {
            cout << "Error: Hours cannot exceed 60!" << endl;
        }
    }

    int calculatePayment() {
        totalPay = hourlyPayRate * hoursWorked;
        return totalPay;
    }
};

int main() {
    PayRoll employees[7];
    int hours;
    int payRate;

    for (int i = 0; i < 7; ++i) {
        cout << "Enter pay rate for employee " << i + 1 << ": $";
        cin >> payRate;
        employees[i].setHourlyPayRate(payRate);

        cout << "Enter hours worked for employee " << i + 1 << ": ";
        cin >> hours;
        employees[i].setHoursWorked(hours);
    }

    cout << "\nGross pay for each employee:\n";
    for (int i = 0; i < 7; ++i) {
        int grossPay = employees[i].calculatePayment();
        cout << "Employee " << i + 1 << ": $" << grossPay << endl;
    }

    return 0;
}
