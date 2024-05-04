#include <iostream>
#include <string>

using namespace std;

class Question
{
private:
    string question;
    string option1;
    string option2;
    string option3;
    string option4;
    int correctAnswer;

public:
    Question(string _question, string _option1, string _option2, string _option3, string _option4, int correct)
    {
        question = _question;
        option1 = _option1;
        option2 = _option2;
        option3 = _option3;
        option4 = _option4;
        correctAnswer = correct;
    }

    string getQuestion()
    {
        return question;
    }

    string getOption1()
    {
        return option1;
    }

    string getOption2()
    {
        return option2;
    }

    string getOption3()
    {
        return option3;
    }

    string getOption4()
    {
        return option4;
    }

    int getCorrectAnswer()
    {
        return correctAnswer;
    }
};

int main()
{
    Question questions[10] = {
        Question("What is the capital of France?", "Paris", "Berlin", "London", "Rome", 1),
        Question("Which planet is known as the Red Planet?", "Venus", "Mars", "Jupiter", "Saturn", 2),
        Question("Who painted the Mona Lisa?", "Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo", 1),
        Question("What is the chemical symbol for water?", "H2O", "CO2", "NaCl", "O2", 1),
        Question("What is the tallest mountain in the world?", "Mount Everest", "K2", "Kangchenjunga", "Lhotse", 1),
        Question("Who wrote the play 'Romeo and Juliet'?", "William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain", 1),
        Question("What is the largest ocean on Earth?", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean", 4),
        Question("Which country is famous for kangaroos?", "Australia", "Brazil", "Canada", "Russia", 1),
        Question("What is the main ingredient in guacamole?", "Tomato", "Onion", "Avocado", "Lemon", 3),
        Question("Who invented the telephone?", "Thomas Edison", "Alexander Graham Bell", "Albert Einstein", "Isaac Newton", 2)};

    int player1Points = 0;
    int player2Points = 0;

    for (int i = 0; i < 5; ++i)
    {
        cout << "Player 1: " << endl;
        for (int j = 0; j < 10; ++j)
        {
            cout << questions[j].getQuestion() << endl;
            cout << "1. " << questions[j].getOption1() << endl;
            cout << "2. " << questions[j].getOption2() << endl;
            cout << "3. " << questions[j].getOption3() << endl;
            cout << "4. " << questions[j].getOption4() << endl;

            int answer;
            cout << "Enter your answer (1-4): ";
            cin >> answer;

            if (answer == questions[j].getCorrectAnswer())
            {
                cout << "Correct answer! 1 point earn" << endl;
                player1Points++;
            }
            else
            {
                cout << "Incorrect answer!" << endl;
            }
        }

        cout << "Player 2: " << endl;
        for (int j = 0; j < 10; ++j)
        {
            cout << questions[j].getQuestion() << endl;
            cout << "1. " << questions[j].getOption1() << endl;
            cout << "2. " << questions[j].getOption2() << endl;
            cout << "3. " << questions[j].getOption3() << endl;
            cout << "4. " << questions[j].getOption4() << endl;

            int answer;
            cout << "Enter your answer (1-4): ";
            cin >> answer;

            if (answer == questions[j].getCorrectAnswer())
            {
                cout << "Correct answer! You earned 1 point." << endl;
                player2Points++;
            }
            else
            {
                cout << "Incorrect answer! No points earned." << endl;
            }
        }
    }

    cout << "Player 1 earned " << player1Points << " points." << endl;
    cout << "Player 2 earned " << player2Points << " points." << endl;

    if (player1Points > player2Points) {
        cout << "Player 1 is the winner!" << endl;
    } else if (player2Points > player1Points) {
        cout << "Player 2 is the winner!" << endl;
    } else {
        cout << "It's a tie!" << endl;
    }

    return 0;
}