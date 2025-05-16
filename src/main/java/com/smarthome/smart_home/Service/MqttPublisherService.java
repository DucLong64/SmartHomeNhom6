package com.smarthome.smart_home.Service;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.springframework.stereotype.Service;

@Service
public class MqttPublisherService {

    private static final String MQTT_BROKER = "ssl://6bb7b8396ec94250b3c8fdfd10611676.s1.eu.hivemq.cloud:8883";
    private static final String CLIENT_ID = "SpringBootPublisher";
    private static final String LED_TOPIC = "sensors/led1";
    private static final String FAN_TOPIC = "sensors/led2";
    private static final String PUMP_TOPIC = "sensors/led3";
    private static final String username = "smartHomeNhung006";
    private static final String password = "Long2003@";

    private MqttClient client;

    public MqttPublisherService() {
        try {
            client = new MqttClient(MQTT_BROKER, CLIENT_ID);
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            options.setAutomaticReconnect(true);
            options.setConnectionTimeout(10);
            // Thêm username và password vào kết nối
            options.setUserName(username);  // Đảm bảo rằng biến username đã được khởi tạo
            options.setPassword(password.toCharArray());  // Đảm bảo rằng biến password đã được khởi tạo
            client.connect(options);
            System.out.println("Đã kết nối tới Mosquitto broker");
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    // Gửi lệnh tới LED
    public void sendLedCommand(String command) {
        sendCommand(LED_TOPIC, command);
    }

    // Gửi lệnh tới Fan
    public void sendFanCommand(String command) {
        sendCommand(FAN_TOPIC, command);
    }

    // Gửi lệnh tới Pump
    public void sendPumpCommand(String command) {
        sendCommand(PUMP_TOPIC, command);
    }

    // Phương thức chung để gửi lệnh tới bất kỳ thiết bị nào
    public void sendCommand(String topic, String command) {
        try {
            if (client.isConnected()) {
                MqttMessage message = new MqttMessage(command.getBytes());
                message.setQos(1); // QoS level 1
                client.publish(topic, message);
                System.out.println("Đã gửi lệnh tới topic " + topic + ": " + command);
            } else {
                System.out.println("MQTT client chưa kết nối.");
            }
        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}