#include "I2Cdev.h"
#include "MPU6050.h"
#include "Wire.h"
#include "WiFi.h"
#include "HTTPClient.h"
#include "WebServer.h"
#include "ArduinoJson.h"

const int VIB_PER_BATCH = 5;
const int CHECK_INTERVAL = 500;
const int API_POST_INTERVAL = VIB_PER_BATCH * 1000;
int LAST_POSTED_MILLI = 0;

int16_t ax, ay, az;
MPU6050 mpu;
WebServer server(8010);

int vibList[1000 / CHECK_INTERVAL * VIB_PER_BATCH];
int vibListIdx = 0;

void connectToWifi() {
    // const char* ssid = "zayarlyn";
    // const char* password = "ffffffff";
    const char* ssid = "SIT-HACKATHON";
    const char* password = "sithackathon";
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("IP Address: ");
    Serial.println(WiFi.localIP());

}

void postVibDataToApi() {
  HTTPClient http;
  http.begin("http://10.4.160.15:8080/predict/1");
  http.addHeader("Content-Type", "application/json");

  JsonDocument doc;

  int sum = 0;
  for (int i = 0; i < VIB_PER_BATCH; i++) {
    sum += vibList[i];
  }
  doc["avg_vibration"] = sum / VIB_PER_BATCH;

  String json;
  serializeJson(doc, json);
  Serial.println(json);
  int code = http.POST(json); 
  http.end();
}

// ------------------ SETUP -------------------------
void setup() {
    Serial.begin(115200); 
    delay(2000);
    connectToWifi();

    Serial.println("Initializing MPU6050...");
    Wire.begin(21, 22);
    mpu.initialize();
    mpu.setFullScaleAccelRange(MPU6050_ACCEL_FS_2); // Set range to 2G for high sensitivity to vibration

    LAST_POSTED_MILLI = millis();
}


void loop() {
    mpu.getAcceleration(&ax, &ay, &az);
    double totalAccel = sqrt((double)ax * ax + (double)ay * ay + (double)az * az);
    
    // In 2G mode, gravity (1G) is roughly 16384. 
    // We calculate the difference from "static" gravity.
    double vibration = abs(totalAccel - 16384);

    if (millis() - LAST_POSTED_MILLI > API_POST_INTERVAL) {
      // make post request
      postVibDataToApi();
      LAST_POSTED_MILLI = millis();
      vibListIdx = 0;
    }
    vibList[vibListIdx++] = vibration;

    delay(CHECK_INTERVAL);
}
