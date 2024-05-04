#include <iostream>
#include <string>

using namespace std;

class Date
{
private:
    int year;
    int month;
    int day;

public:
    string months[12] = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
    int flag = 1;

    Date(int yearParameter = 0, int monthParameter = 0, int dayParameter = 0)
    {
        year = yearParameter;
        month = monthParameter;
        day = dayParameter;
    }

    void setYear(int _year)
    {
        year = _year;
    }

    void setMonth(int _month)
    {
        if (_month < 1 || _month > 12)
        {
            cout << "Logical issue, month cannot be less than 1 or greater than 12!" << endl;
            flag = 1;
        }
        else
        {
            month = _month;
            flag = 0;
        }
    }

    void setDay(int _day)
    {
        if (_day < 1 || _day > 31)
        {
            cout << "Logical issue, day cannot be less than 1 or greater than 31!" << endl;
            flag = 1;
        }
        else
        {
            day = _day;
            flag = 0;
        }
    }

    int getYear()
    {
        return year;
    }

    int getMonth()
    {
        return month;
    }

    int getDay()
    {
        return day;
    }
};

int main()
{
    Date newDate;
    int num = 0;

    // For setting year
    cout << "Enter year: ";
    cin >> num;
    newDate.setYear(num);

    // For setting month
    while (newDate.flag)
    {
        cout << "Enter month: ";
        cin >> num;
        newDate.setMonth(num);
    }
    newDate.flag = 1;

    // For setting day
    while (newDate.flag)
    {
        cout << "Enter day: ";
        cin >> num;
        newDate.setDay(num);
    }

    /* ********************* PRINTING ********************* */

    cout << "\nDate is: " << newDate.getMonth() << "\\" << newDate.getDay() << "\\" << newDate.getYear() << endl;
    cout << "Date is: " << newDate.months[newDate.getMonth() - 1] << "\\" << newDate.getDay() << "\\" << newDate.getYear() << endl;
    cout << "Date is: " << newDate.getDay() << "\\" << newDate.months[newDate.getMonth() - 1] << "\\" << newDate.getYear() << endl;

    return 0;
}
