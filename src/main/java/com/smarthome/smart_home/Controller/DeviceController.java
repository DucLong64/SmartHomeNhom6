package com.smarthome.smart_home.Controller;

import com.smarthome.smart_home.Entity.HistoryAction;
import com.smarthome.smart_home.Service.HistoryActionService;
import com.smarthome.smart_home.Service.MqttPublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/devices")
@CrossOrigin(origins = "*")
public class DeviceController {

    @Autowired
    private MqttPublisherService mqttPublisherService;

    @Autowired
    private HistoryActionService historyActionService;

    // Điều khiển thiết bị (bật/tắt)
    @PostMapping("/control")
    public ResponseEntity<String> controlDevice(
            @RequestParam("device") String device,
            @RequestParam("action") String action) {

        if (!device.matches("led1|led2|led3")) {
            return ResponseEntity.badRequest().body("Thiết bị không hợp lệ! ");
        }
        if (!action.matches("ON|OFF")) {
            return ResponseEntity.badRequest().body("Hành động không hợp lệ! Chỉ chấp nhận: ON, OFF.");
        }

        // Gửi lệnh qua MQTT
        switch (device.toLowerCase()) {
            case "led1":
                mqttPublisherService.sendLedCommand(action);
                break;
            case "led2":
                mqttPublisherService.sendFanCommand(action);
                break;
            case "led3":
                mqttPublisherService.sendPumpCommand(action);
                break;
        }

        // Lưu lịch sử
        HistoryAction historyAction = new HistoryAction();
        historyAction.setName(device);
        historyAction.setAction("ON".equalsIgnoreCase(action));
        historyAction.setTime(LocalDateTime.now());
        historyActionService.saveHistoryAction(historyAction);

        return ResponseEntity.ok("Đã gửi lệnh " + action + " cho thiết bị " + device);
    }
}