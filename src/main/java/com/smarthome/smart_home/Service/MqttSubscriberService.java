package com.smarthome.smart_home.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.smarthome.smart_home.Entity.SensorData;
import jakarta.annotation.PostConstruct;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MqttSubscriberService {

    private MqttClient mqttClient;
    private long lastHeartbeatTime = System.currentTimeMillis();
    private static final long HEARTBEAT_TIMEOUT = 60000; // 60 giây (1 phút)

    @Value("${mqtt.broker.url}")
    private String mqttBrokerUrl;

    @Value("${mqtt.client.id}")
    private String clientId;

    @Value("${mqtt.username}")
    private String username;

    @Value("${mqtt.password}")
    private String password;

    @Value("${mqtt.topic.sensor}")
    private String sensorTopic;

    @Value("${mqtt.topic.heartbeat}")
    private String heartbeatTopic; // Topic cho tín hiệu heartbeat

    @Autowired
    private SensorDataService sensorDataService;

    @PostConstruct
    public void init() {
        try {
            if (clientId == null || clientId.isEmpty()) {
                throw new IllegalArgumentException("Client ID must not be null or empty");
            }

            // Khởi tạo MQTT client
            mqttClient = new MqttClient(mqttBrokerUrl, clientId);
            mqttClient.setCallback(new MqttCallback() {
                @Override
                public void connectionLost(Throwable cause) {
                    System.out.println("Mất kết nối với MQTT Broker!");
                    reconnect();
                }

                @Override
                public void messageArrived(String topic, MqttMessage message) throws Exception {
                    handleIncomingMessage(topic, message);
                }

                @Override
                public void deliveryComplete(IMqttDeliveryToken token) {
                    System.out.println("Gửi dữ liệu hoàn tất.");
                }
            });

            connect();

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    // Hàm kết nối tới MQTT Broker
    private void connect() {
        try {
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            options.setAutomaticReconnect(true);
            options.setConnectionTimeout(10);

            // Thêm username và password vào kết nối
            options.setUserName(username);  // Đảm bảo rằng biến username đã được khởi tạo
            options.setPassword(password.toCharArray());  // Đảm bảo rằng biến password đã được khởi tạo

            mqttClient.connect(options);
            mqttClient.subscribe(sensorTopic);
            mqttClient.subscribe(heartbeatTopic); // Đăng ký topic heartbeat

            System.out.println("Đã kết nối và đăng ký topic: " + sensorTopic + " và " + heartbeatTopic);
        } catch (MqttException e) {
            System.err.println("Lỗi khi kết nối tới MQTT Broker: " + e.getMessage());
        }
    }

    // Hàm tự động kết nối lại khi mất kết nối
    private void reconnect() {
        while (!mqttClient.isConnected()) {
            try {
                System.out.println("Đang thử kết nối lại với MQTT Broker...");
                connect();
            } catch (Exception e) {
                System.err.println("Lỗi khi kết nối lại: " + e.getMessage());
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException ignored) {}
            }
        }
    }

    // Hàm xử lý tin nhắn nhận được từ MQTT
    private void handleIncomingMessage(String topic, MqttMessage message) {
        String payload = new String(message.getPayload());
        System.out.println("Nhận dữ liệu từ MQTT: " + payload);

        if (topic.equals(heartbeatTopic)) {
            handleHeartbeat(payload);
        } else if (topic.equals(sensorTopic)) {
            handleSensorData(payload);
        }
    }

    // Hàm xử lý tín hiệu heartbeat
    private void handleHeartbeat(String payload) {
        // Kiểm tra tín hiệu heartbeat từ vi xử lý
        if ("active".equals(payload)) {
            lastHeartbeatTime = System.currentTimeMillis(); // Cập nhật thời gian nhận tín hiệu heartbeat
            System.out.println("Tín hiệu heartbeat nhận được: " + payload);
        }
    }

    // Hàm xử lý dữ liệu cảm biến
    private void handleSensorData(String payload) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            // Phân tích JSON payload
            SensorData sensorData = objectMapper.readValue(payload, SensorData.class);
            sensorData.setTimestamp(LocalDateTime.now());

            // Lưu dữ liệu vào cơ sở dữ liệu
            sensorDataService.saveSensorData(sensorData);
            System.out.println("Đã lưu dữ liệu cảm biến vào database: " + sensorData);

        } catch (Exception e) {
            System.err.println("Lỗi khi xử lý tin nhắn: " + e.getMessage());
        }
    }

    // Kiểm tra xem vi xử lý có đang hoạt động không (trạng thái "online" hay "offline")
    public boolean isDeviceOnline() {
        return (System.currentTimeMillis() - lastHeartbeatTime) <= HEARTBEAT_TIMEOUT;
    }
}
