package com.smarthome.smart_home.Controller;

import com.smarthome.smart_home.Entity.SensorData;
import com.smarthome.smart_home.Service.SensorDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/predict")
@CrossOrigin(origins = "*")
public class PredictionController {
    @Autowired
    private SensorDataService sensorDataService;
    @PostMapping
    public ResponseEntity<?> predict() {
        SensorData sensorData = sensorDataService.getLatestSensorData();
        //Convert sang Map
        Map<String, Object> inputData= new HashMap<>();
        inputData.put("temperature", sensorData.getTemperature());
        inputData.put("humidity", sensorData.getHumidity());
        inputData.put("light", sensorData.getLight());
        inputData.put("air_quality", sensorData.getAir_quality());
        inputData.put("timestamp", sensorData.getTimestamp().toString());
        // Định nghĩa URL của API Flask
        String flaskApiUrl = "http://localhost:5000/predict";

        // Tạo đối tượng RestTemplate để gửi yêu cầu
        RestTemplate restTemplate = new RestTemplate();

        // Gửi yêu cầu HTTP POST đến API Flask và nhận phản hồi
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(inputData, headers);

        ResponseEntity<Map> response = restTemplate.exchange(flaskApiUrl, HttpMethod.POST, requestEntity, Map.class);

        // Trả về kết quả dự đoán từ Flask cho client
        return ResponseEntity.ok(response.getBody());
    }
}
