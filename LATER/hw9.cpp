#include <iostream>
#include <iomanip>

using namespace std;

class Population
{
private:
    double population;
    double numBirths;
    double numDeaths;

public:
    Population(double _population, double _births, double _deaths)
    {
        population = _population;
        numBirths = _births;
        numDeaths = _deaths;
    }

    // Mutator functions
    void setPopulation(double _population)
    {
        if (_population >= 1)
            population = _population;
        else
        {
            cout << "Invalid population value. It must be at least 1." << endl;
        }
    }

    void setNumBirths(double _births)
    {
        if (_births >= 0)
            numBirths = _births;
        else
        {
            cout << "Invalid number of births. It cannot be negative." << endl;
        }
    }

    void setNumDeaths(double _deaths)
    {
        if (_deaths >= 0)
            numDeaths = _deaths;
        else
        {
            cout << "Invalid number of deaths. It cannot be negative." << endl;
        }
    }

    double getPopulation() const
    {
        return population;
    }

    double getNumBirths() const
    {
        return numBirths;
    }

    double getNumDeaths() const
    {
        return numDeaths;
    }

    double getBirthRate() const
    {
        return numBirths / population;
    }

    double getDeathRate() const
    {
        return numDeaths / population;
    }
};

int main()
{
    double pop, births, deaths;

    cout << "Please enter the population: ";
    cin >> pop;

    cout << "Please enter the number of births: ";
    cin >> births;

    cout << "Please enter the number of deaths: ";
    cin >> deaths;

    Population population(pop, births, deaths);

    cout << fixed << setprecision(2);
    cout << "Birth Rate: " << population.getBirthRate() << endl;
    cout << "Death Rate: " << population.getDeathRate() << endl;

    return 0;
}
