#include <iostream>

using namespace std;

class TestScores {
private:
    double score1;
    double score2;
    double score3;

public:
    TestScores() {
        score1 = 0;
        score2 = 0;
        score3 = 0;
    }

    // Accessor ve mutator fonksiyonları
    double getScore1() const {
        return score1;
    }

    void setScore1(double score) {
        score1 = score;
    }

    double getScore2() const {
        return score2;
    }

    void setScore2(double score) {
        score2 = score;
    }

    double getScore3() const {
        return score3;
    }

    void setScore3(double score) {
        score3 = score;
    }

    // Ortalama hesaplama fonksiyonu
    double calculateAverage() const {
        return (score1 + score2 + score3) / 3.0;
    }
};

int main() {
    TestScores testScores;

    // Kullanıcıdan sınav notlarını girmesini iste
    double score1, score2, score3;
    cout << "Lutfen uc sinav notunu girin: ";
    cin >> score1 >> score2 >> score3;

    // Sınav notlarını TestScores nesnesine ata
    testScores.setScore1(score1);
    testScores.setScore2(score2);
    testScores.setScore3(score3);

    // Ortalamayı hesapla ve ekrana yazdır
    cout << "Notlarin ortalamasi: " << testScores.calculateAverage() << endl;

    return 0;
}
