#include "LoRa_E22.h"
#include <SoftwareSerial.h>
SoftwareSerial mySerial(12, 11); // Arduino RX <-- e22 TX, Arduino TX --> e22 RX
LoRa_E22 E22(&mySerial);
#define M0 8
#define M1 9

bool flag = 0;

struct veriler
{
    uint8_t dataUart[53];
} data;

float cells[20];
float sumVoltage;
float soc;
float powerWatt;
int temps[4];
float maxTemp;
float current;
int count;

void setup()
{
    pinMode(M0, OUTPUT);
    pinMode(M1, OUTPUT);
    digitalWrite(M0, LOW);
    digitalWrite(M1, LOW);
    Serial.begin(9600);
    Serial1.begin(9600);
    E22.begin();
    delay(500);
}

void loop()
{

    count = 0;
    ResponseStructContainer rsc = E22.receiveMessage(sizeof(veriler));
    struct veriler data = *(veriler *)rsc.data;
    // Serial.println(E22.available());
    if (1)
    {
        sumVoltage = (data.dataUart[0]) * 256 + (data.dataUart[1]);
        soc = (data.dataUart[2] * 256 + data.dataUart[3]) / 10;
        powerWatt = (data.dataUart[4] * 256 + data.dataUart[5]) / 1000;
        maxTemp = data.dataUart[50] - 40;
        current = (data.dataUart[51] * 256 + data.dataUart[52]) / 63;

        for (int i = 0; i < 20; i++)
        {
            cells[i] = (data.dataUart[count + 6] * 256 + data.dataUart[count + 7]);
            count += 2;
        }

        for (int i = 0; i < 4; i++)
        {
            temps[i] = data.dataUart[i + 46] - 40;
        }
        // Serial.println(data.dataUart[2]);

        for (int i = 0; i < 20; i++)
        {
            if (cells[i] < 2.5 || cells[i] > 4.2)
            {
                flag = 0;
            }
        }

        if (flag)
        {

            Serial.println("****************** BEGIN ********************");
            for (int i = 0; i < 4; i++)
            {
                char tempBuf[16];
                sprintf(tempBuf, "Sıcaklık: %d", temps[i]);
                Serial.println(tempBuf);
            }
            Serial.println("\n");

            char generalBuf[24];

            Serial.print("Soc bilgisi: ");
            Serial.println(soc);

            Serial.print("Sum Voltage: ");
            Serial.println(sumVoltage / 10);

            Serial.print("Max Temp: ");
            Serial.println(maxTemp);

            Serial.print("Power Watt: ");
            Serial.println(powerWatt);

            Serial.print("Current: ");
            Serial.println(current);

            Serial.println("\n");
            Serial.println("piller");

            for (int i = 0; i < 20; i++)
            {
                Serial.print(cells[i] / 1000);
                Serial.print("  ");
            }

            Serial.println("\n******************* END ********************\n\n");
        }
        delay(1000);
        rsc.close();
    }
}