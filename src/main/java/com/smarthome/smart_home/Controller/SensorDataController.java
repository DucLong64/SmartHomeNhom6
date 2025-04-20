package com.smarthome.smart_home.Controller;


import com.smarthome.smart_home.Entity.SensorData;
import com.smarthome.smart_home.Service.MqttPublisherService;
import com.smarthome.smart_home.Service.SensorDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/sensors")
@CrossOrigin(origins = "*")
public class SensorDataController {

    @Autowired
    private SensorDataService sensorDataService;

    @PostMapping("/data")
    public SensorData createSensorData(@RequestBody SensorData sensorData) {
        sensorData.setTimestamp(LocalDateTime.now()); // Cập nhật thời gian
        return sensorDataService.saveSensorData(sensorData);
    }
    //Api lấy toàn bộ dữ liệu
    @GetMapping("/data")
    public List<SensorData> getAllSensorData() {
        return sensorDataService.getAllSensorData();
    }

    //Api lấy dữ liệu gần nhất, realtime
    @GetMapping("/latest")
    public ResponseEntity<SensorData> getLatestSensorData() {
        SensorData latestData = sensorDataService.getLatestSensorData();
        if (latestData != null) {
            return ResponseEntity.ok(latestData);
        } else {
            return ResponseEntity.noContent().build();  // Trả về 204 nếu không có dữ liệu
        }
    }

    @Autowired
    private MqttPublisherService mqttPublisherService;

    @PostMapping("/led1")
    public ResponseEntity<String> controlLed(@RequestParam("command") String command) {
        if (!command.equalsIgnoreCase("ON") && !command.equalsIgnoreCase("OFF")) {
            return ResponseEntity.badRequest().body("Chỉ chấp nhận lệnh 'ON' hoặc 'OFF'.");
        }

        mqttPublisherService.sendLedCommand(command.toUpperCase());
        return ResponseEntity.ok("Đã gửi lệnh LED: " + command);
    }
}

