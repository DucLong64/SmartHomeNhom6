#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <Wire.h>
#include <BH1750.h>
#include <MQ135.h>

// Định nghĩa chân cảm biến và LED
#define DHTPIN 4      // Chân kết nối DHT11
#define DHTTYPE DHT11
#define LED_PIN 2     // Chân GPIO nối với đèn LED
#define LED_PIN2 15   // Chân GPIO nối với LED thứ hai
#define LED_PIN3 16   // Chân GPIO nối với LED thứ ba
#define BH1750_ADDRESS 0x23  // Địa chỉ I2C của BH1750
#define MQ135_PIN 34  // Chân analog cho MQ135

DHT dht(DHTPIN, DHTTYPE);
BH1750 lightMeter;

// Thông tin WiFi
const char* ssid = "AnhLong";
const char* password = "anhyeuem";

// Thông tin HiveMQ Cloud (thay bằng thông tin thực tế từ HiveMQ Cloud dashboard)
const char* mqttServer = "6bb7b8396ec94250b3c8fdfd10611676.s1.eu.hivemq.cloud";  // Thay bằng Cluster URL của bạn
const int mqttPort = 8883;                             // Cổng TLS của HiveMQ Cloud
const char* mqttUser = "smartHomeNhung006";                // Thay bằng username từ HiveMQ
const char* mqttPassword = "Long2003@";            // Thay bằng password từ HiveMQ

// Topic MQTT
const char* topic = "sensors/data";
const char* ledTopic = "sensors/led1";
const char* ledTopic2 = "sensors/led2";
const char* ledTopic3 = "sensors/led3";
const char* heartbeatTopic = "sensors/heartbeat";  // Topic gửi heartbeat

// Thời gian gửi dữ liệu và heartbeat
const unsigned long sensorInterval = 10000;  // Gửi dữ liệu mỗi 10 giây
unsigned long lastSensorPublish = 0;

const unsigned long heartbeatInterval = 30000; // Gửi heartbeat mỗi 30 giây
unsigned long lastHeartbeatMillis = 0;

// Khai báo WiFiClientSecure thay vì WiFiClient để hỗ trợ TLS
#include <WiFiClientSecure.h>
WiFiClientSecure espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* message, unsigned int length) {
  String msg;
  for (int i = 0; i < length; i++) {
    msg += (char)message[i];
  }

  if (String(topic) == ledTopic) {
    if (msg == "ON") {
      digitalWrite(LED_PIN, LOW);  // Bật LED
      Serial.println("Đèn LED đã bật ngay lập tức");
    } else if (msg == "OFF") {
      digitalWrite(LED_PIN, HIGH); // Tắt LED
      Serial.println("Đèn LED đã tắt ngay lập tức");
    }
  } else if (String(topic) == ledTopic2) {
    if (msg == "ON") {
      digitalWrite(LED_PIN2, LOW);  // Bật LED thứ hai
      Serial.println("Đèn LED 2 đã bật ngay lập tức");
    } else if (msg == "OFF") {
      digitalWrite(LED_PIN2, HIGH); // Tắt LED thứ hai
      Serial.println("Đèn LED 2 đã tắt ngay lập tức");
    }
  } else if (String(topic) == ledTopic3) {
    if (msg == "ON") {
      digitalWrite(LED_PIN3, LOW);  // Bật LED thứ ba
      Serial.println("Đèn LED 3 đã bật ngay lập tức");
    } else if (msg == "OFF") {
      digitalWrite(LED_PIN3, HIGH); // Tắt LED thứ ba
      Serial.println("Đèn LED 3 đã tắt ngay lập tức");
    }
  }
}

void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(LED_PIN, OUTPUT);
  pinMode(LED_PIN2, OUTPUT);
  pinMode(LED_PIN3, OUTPUT);
  pinMode(MQ135_PIN, INPUT);
  digitalWrite(LED_PIN, HIGH);  // Tắt LED khi khởi động
  digitalWrite(LED_PIN2, HIGH); // Tắt LED 2 khi khởi động
  digitalWrite(LED_PIN3, HIGH); // Tắt LED 3 khi khởi động

  // Khởi tạo cảm biến ánh sáng BH1750
  Wire.begin();
  lightMeter.begin(BH1750::CONTINUOUS_HIGH_RES_MODE);

  // Kết nối WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Đang kết nối WiFi...");
  }
  Serial.println("Đã kết nối WiFi");

  // Tắt xác thực chứng chỉ SSL
  espClient.setInsecure();

  // Cài đặt MQTT Broker
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  reconnectMQTT();
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.println("Đang kết nối MQTT...");
    String clientId = "ESP32Client-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqttUser, mqttPassword)) {
      Serial.println("Đã kết nối MQTT");
      client.subscribe(ledTopic);   // Đăng ký topic điều khiển đèn LED
      client.subscribe(ledTopic2);  // Đăng ký topic điều khiển LED thứ hai
      client.subscribe(ledTopic3);  // Đăng ký topic điều khiển LED thứ ba
    } else {
      Serial.print("Lỗi kết nối MQTT, mã lỗi: ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  unsigned long currentMillis = millis();

  // Gửi dữ liệu cảm biến mỗi 10 giây
  if (currentMillis - lastSensorPublish >= sensorInterval) {
    lastSensorPublish = currentMillis;

    // Đọc dữ liệu cảm biến
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    float light = lightMeter.readLightLevel();
    int airQuality = analogRead(MQ135_PIN);

    if (!isnan(temperature) && !isnan(humidity)) {
      String payload = "{\"temperature\":" + String(temperature) +
                       ", \"humidity\":" + String(humidity) +
                       ", \"light\":" + String(light) +
                       ", \"air_quality\":" + String(airQuality) + "}";
      client.publish(topic, payload.c_str());
      Serial.println("Đã gửi dữ liệu: " + payload);
    } else {
      Serial.println("Lỗi khi đọc cảm biến DHT");
    }
  }

  // Gửi heartbeat mỗi 30 giây
  if (currentMillis - lastHeartbeatMillis >= heartbeatInterval) {
    lastHeartbeatMillis = currentMillis;
    if (client.connected()) {
      client.publish(heartbeatTopic, "active");
      Serial.println("Đã gửi tín hiệu heartbeat");
    }
  }
}
