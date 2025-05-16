package com.smarthome.smart_home.Service;


import com.smarthome.smart_home.Entity.SensorData;
import com.smarthome.smart_home.Repository.SensorDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class SensorDataService {

    @Autowired
    private SensorDataRepository sensorDataRepository;

    public SensorData saveSensorData(SensorData sensorData) {
        return sensorDataRepository.save(sensorData);
    }

    public List<SensorData> getAllSensorData() {
        return sensorDataRepository.findAll();
    }
    public SensorData getLatestSensorData() {
        return sensorDataRepository.findTopByOrderByIdDesc();
    }


}