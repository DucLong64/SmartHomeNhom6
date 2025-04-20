import React, { useState } from 'react';
import { Card, Switch, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './ControlPanel.scss';

const ControlPanel = () => {
  const [devices, setDevices] = useState({
    led1: false,
    led2: false,
    led3: false,
  });

  const [loading, setLoading] = useState({
    led1: false,
    led2: false,
    led3: false,
  });

  const sendControlCommand = async (deviceName, action) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/devices/control`, null, {
        params: { device: deviceName, action: action ? 'ON' : 'OFF' },
      });
      return response;
    } catch (error) {
      console.error(`Lỗi khi điều khiển ${deviceName}:`, error.message);
      throw error;
    }
  };

  const handleDeviceChange = async (deviceName, checked) => {
    setLoading(prev => ({ ...prev, [deviceName]: true }));

    try {
      const response = await sendControlCommand(deviceName, checked);
      if (response && response.status === 200) {
        setDevices(prev => ({ ...prev, [deviceName]: checked }));
        message.success(`${deviceName.toUpperCase()} đã được ${checked ? 'bật' : 'tắt'}`);
      }
    } catch (error) {
      message.error(`Không thể ${checked ? 'bật' : 'tắt'} ${deviceName.toUpperCase()}.`);
    } finally {
      setLoading(prev => ({ ...prev, [deviceName]: false }));
    }
  };

   // Gọi API cảnh báo và hiển thị thông báo giữa màn hình
   const handleAutoAlert = async () => {
    try {
      const res = await axios.post('http://localhost:8080/predict');
      if (res.data && res.data.advice) {
        message.info({
          content: res.data.advice,
          duration: 4,
          className: 'centered-message',
        });
      }
    } catch (error) {
      message.error('Không thể lấy dữ liệu cảnh báo.');
    }
  };


  return (
    <div className="listCard-button">
      <div className="auto-alert-button-container">
        <button className="auto-alert-button" onClick={handleAutoAlert}>Trợ lý AI nè</button>
      </div>

      <Card bordered={false} className="card-button">
        <div>
          <FontAwesomeIcon icon={faLightbulb} className={`icon ${devices.led1 ? 'light-lit' : ''}`} />
          Đèn LED 1
        </div>
        <Switch
          checked={devices.led1}
          onChange={(checked) => handleDeviceChange('led1', checked)}
          loading={loading.led1}
        />
      </Card>

      <Card bordered={false} className="card-button">
        <div>
          <FontAwesomeIcon icon={faLightbulb} className={`icon ${devices.led2 ? 'light-lit' : ''}`} />
          Đèn LED 2
        </div>
        <Switch
          checked={devices.led2}
          onChange={(checked) => handleDeviceChange('led2', checked)}
          loading={loading.led2}
        />
      </Card>

      <Card bordered={false} className="card-button">
        <div>
          <FontAwesomeIcon icon={faLightbulb} className={`icon ${devices.led3 ? 'light-lit' : ''}`} />
          Đèn LED 3
        </div>
        <Switch
          checked={devices.led3}
          onChange={(checked) => handleDeviceChange('led3', checked)}
          loading={loading.led3}
        />
      </Card>
    </div>
  );
};

export default ControlPanel;
