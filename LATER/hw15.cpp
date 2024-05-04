#include <iostream>
#include <cmath>

using namespace std;

class MortgagePayment
{
private:
    double loanAmount;
    double annualInterestRate;
    int loanYears;

public:
    MortgagePayment(double _amount = 0, double _rate = 0, int _years = 0)
    {
        loanAmount = _amount;
        annualInterestRate = _rate;
        loanYears = _years;
    }

    void setLoanAmount(double _amount)
    {
        if (_amount >= 0)
            loanAmount = _amount;
        else
        {
            cout << "Loan amount canot be negative!" << endl;
        }
    }

    void setAnnualInterestRate(double _rate)
    {
        if (_rate >= 0)
            annualInterestRate = _rate;
        else
        {
            cout << "Annual interest rate cannot be negative!" << endl;
        }
    }

    void setLoanYears(int _years)
    {
        if (_years >= 0)
            loanYears = _years;
        else
        {
            cout << "Loan years cannot be negative!" << endl;
        }
    }

    double calculateMonthlyPayment()
    {
        double monthlyInterestRate = annualInterestRate / 1200;
        int totalPayments = loanYears * 12;
        double monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - pow(1 + monthlyInterestRate, -totalPayments));
        return monthlyPayment;
    }

    double calculateTotalPayment()
    {
        double totalPayment = calculateMonthlyPayment() * loanYears * 12;
        return totalPayment;
    }
};

int main()
{
    double amount;
    double rate;
    int years;

    cout << "Enter loan amount: $";
    cin >> amount;
    cout << "Enter annual interest rate: ";
    cin >> rate;
    cout << "Enter loan years: ";
    cin >> years;

    MortgagePayment mortgage(amount, rate, years);

    cout << "Monthly payment amount: $" << mortgage.calculateMonthlyPayment() << endl;
    cout << "Total payment amount: $" << mortgage.calculateTotalPayment() << endl;

    return 0;
}