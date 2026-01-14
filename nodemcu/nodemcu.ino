#include "I2Cdev.h"
#include "MPU6050.h"
#include "Wire.h"

MPU6050 mpu;

// Raw value threshold for vibration. 
// At 2G sensitivity, 16384 = 1G. 
// 1000-2000 is usually a good starting range for washing machine vibrations.
const int32_t VIBRATION_THRESHOLD = 1500; 
const int CHECK_INTERVAL = 1000;
const int FINISH_DELAY = 5000;

unsigned long lastVibrationTime = 0;
bool isWashing = false;

int16_t ax, ay, az;

void setup() {
    Serial.begin(115200);
    delay(2000);
    Wire.begin(21, 22);

    Serial.println("Initializing MPU6050...");
    mpu.initialize();

    if (!mpu.testConnection()) {
        Serial.println("MPU6050 connection failed!");
    }

    // Set range to 2G for high sensitivity to vibration
    mpu.setFullScaleAccelRange(MPU6050_ACCEL_FS_2);
}

void loop() {
    // Get raw accelerometer values
    mpu.getAcceleration(&ax, &ay, &az);

    // Calculate magnitude using raw values. 
    // We use long to avoid overflow during squaring.
    double totalAccel = sqrt((double)ax * ax + (double)ay * ay + (double)az * az);
    
    // In 2G mode, gravity (1G) is roughly 16384. 
    // We calculate the difference from "static" gravity.
    double vibration = abs(totalAccel - 16384);

    if (vibration > VIBRATION_THRESHOLD) {
        lastVibrationTime = millis();
        if (!isWashing) {
            isWashing = true;
            Serial.println("STATUS: Machine Started/Washing...");
        }
    } else {
        if (isWashing && (millis() - lastVibrationTime > FINISH_DELAY)) {
            isWashing = false;
            Serial.println("STATUS: Cycle Finished!");
        }
    }

    // Use Serial Plotter to tune VIBRATION_THRESHOLD
    Serial.print("Vibration:");
    Serial.println(vibration);

    delay(CHECK_INTERVAL);
}



// #include <Wire.h>
// #include <MPU6050.h>

// MPU6050 mpu;

// void setup() {
//   Serial.begin(115200);
//   Wire.begin(21, 22);

//   mpu.initialize();
//   if (mpu.testConnection()) {
//     Serial.println("MPU6050 connected!");
//   } else {
//     Serial.println("MPU6050 connection failed!");
//   }
// }

// void loop() {
//   int16_t ax, ay, az, gx, gy, gz;
//   mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

//   Serial.print("A:"); Serial.print(ax);
//   Serial.print(","); Serial.print(ay);
//   Serial.print(","); Serial.print(az);

//   Serial.print(" G:"); Serial.print(gx);
//   Serial.print(","); Serial.print(gy);
//   Serial.print(","); Serial.println(gz);

//   delay(200);
// }

// #include "I2Cdev.h"
// #include "MPU6050.h"
// #include "Wire.h"

// MPU6050 accelgyro; // Create instance

// int16_t ax, ay, az; // Raw accelerometer values
// int16_t gx, gy, gz; // Raw gyro values

// void setup() {
//     Serial.begin(115200);
//     delay(2000);

//     // Join I2C bus using ESP32 default pins (SDA: 21, SCL: 22)
//     Wire.begin(21, 22);

//     Serial.println("Initializing MPU6050...");
//     accelgyro.initialize();

//     // Verify connection
//     if (accelgyro.testConnection()) {
//         Serial.println("MPU6050 connection successful");
//     } else {
//         Serial.println("MPU6050 connection failed");
//     }
// }

// void loop() {
//     // Read raw accel/gyro measurements
//     accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

//     // Display tab-separated values
//     Serial.print("a/g:\t");
//     Serial.print(ax); Serial.print("\t");
//     Serial.print(ay); Serial.print("\t");
//     Serial.print(az); Serial.print("\t");
//     Serial.print(gx); Serial.print("\t");
//     Serial.print(gy); Serial.print("\t");
//     Serial.println(gz);

//     delay(100);
// }