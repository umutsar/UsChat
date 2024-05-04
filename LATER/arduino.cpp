

byte dataUart[64];
uint16_t cells[20];
uint16_t sumVoltage, soc, powerWatt, cellsVoltage[20], maxVPosition, minVPosition, differantiePressure,
    temps[4], maxTemp, minTemp, meanTemp, current, minVoltage, maxVoltage;
int count = 0;

void setup()
{
    Serial.begin(9600);
}

void loop()
{
  
    for(int i = 0; i < 64; i++) {
        dataUart[i] = 0;
    }

    count = 0;
    delay(1000);

    for (int i = 0; i < 64; i++)
    {
        dataUart[i] = Serial.read();
    }

    sumVoltage = (dataUart[0] * 256 + dataUart[1]) / 10;
    soc = (dataUart[2] * 256 + dataUart[3]) / 10;
    powerWatt = (dataUart[4] * 256 + dataUart[5]) / 1000;
    maxVPosition = dataUart[48];
    minVPosition = dataUart[49];
    differantiePressure = dataUart[50];
    maxTemp = dataUart[55];
    minTemp = dataUart[57];
    meanTemp = dataUart[59];
    current = (dataUart[4] * 256 + dataUart[5]) / 63;
    maxVoltage = (dataUart[46] * 256 + dataUart[47]) / 100;
    minVoltage = (dataUart[62] * 256 + dataUart[63]) / 100;

    for (int i = 0; i < 20; i++)
    {
        cells[i] = (dataUart[count + 7] * 256 + dataUart[count + 8]) / 100;
        count += 2;
    }

    for (int i = 0; i < 4; i++)
    {
        temps[i] = dataUart[i + 51];
    }

    Serial.print("Sum Voltage: ");
    Serial.println(sumVoltage);

    Serial.print("SOC: ");
    Serial.println(soc);

    Serial.print("Sum Voltage: ");
    Serial.println(sumVoltage);

    Serial.print("Power Watt: ");
    Serial.println(powerWatt);

    Serial.print("MaxV Position: ");
    Serial.println(maxVPosition);

    Serial.print("MinV Position: ");
    Serial.println(minVPosition);

    Serial.print("Differantie Pressure: ");
    Serial.println(differantiePressure);

    Serial.print("Max Temp: ");
    Serial.println(maxTemp);

    Serial.print("Min Temp: ");
    Serial.println(minTemp);

    Serial.print("Mean Temp: ");
    Serial.println(meanTemp);

    Serial.print("Current: ");
    Serial.println(current);

    Serial.print("Max Voltage: ");
    Serial.println(current);

    Serial.print("Min Voltage: ");
    Serial.println(minVoltage);

    Serial.print("Current: ");
    Serial.println(current);

    Serial.println("********** TEMPERATURE ***********");

    Serial.print("Temp 1: ");
    Serial.println(temps[0]);

    Serial.print("Temp 2: ");
    Serial.println(temps[1]);

    Serial.print("Temp 3: ");
    Serial.println(temps[2]);

    Serial.print("Temp 4: ");
    Serial.println(temps[3]);

    Serial.println("************* CELLS **************");

    for (int i = 0; i < 20; i++)
    {
        Serial.print(cells[i]);
        Serial.print(" ");
    }
    Serial.println(" ");
}
