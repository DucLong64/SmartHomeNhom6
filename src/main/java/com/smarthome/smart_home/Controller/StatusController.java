package com.smarthome.smart_home.Controller;

import com.smarthome.smart_home.Service.MqttSubscriberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class StatusController {
    @Autowired
    private MqttSubscriberService mqttSubscriberService;

    // Endpoint kiểm tra trạng thái vi xử lý
    @GetMapping("/api/v1/device/status")
    public String getDeviceStatus() {
        // Kiểm tra trạng thái vi xử lý qua service
        boolean isDeviceOnline = mqttSubscriberService.isDeviceOnline();

        if (isDeviceOnline) {
            return "Device is online";
        } else {
            return "Device is offline";
        }
    }
}
