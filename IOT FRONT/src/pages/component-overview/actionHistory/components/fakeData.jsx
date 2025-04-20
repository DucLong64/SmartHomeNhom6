// fakeData.js

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  const devices = [
    { type: 'Đèn', count: 10 },
    { type: 'Quạt', count: 10 },
    { type: 'Điều Hòa', count: 10 }
  ];
  const actions = ['Bật', 'Tắt'];
  
  const generateRandomAction = () => actions[Math.floor(Math.random() * actions.length)];
  
  const generateRandomDate = (daysBack) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
    return date;
  };
  
  const generateFakeData = () => {
    const data = [];
    let idCounter = 1;
  
    devices.forEach(device => {
      for (let i = 0; i < device.count; i++) {
        const randomDate = generateRandomDate(10); // Random trong khoảng 10 ngày gần đây
        const formattedDate = formatDate(randomDate);
  
        data.push({
          key: idCounter,
          id: `${device.type}${idCounter}`,  // ID thiết bị
          deviceName: `${device.type} ${idCounter}`, // Tên thiết bị
          action: generateRandomAction(), // Hành động ngẫu nhiên
          time: formattedDate, // Thời gian ngẫu nhiên
        });
  
        idCounter++;
      }
    });
  
    return data;
  };
  
  const fakeData = 
  [
    {
        "id": 1569,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T09:45:04.560+0000",
        "timeConvert": "2024-10-02 16:45:04",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1568,
        "name": "FAN",
        "action": false,
        "time": "2024-10-02T08:35:09.227+0000",
        "timeConvert": "2024-10-02 15:35:09",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1567,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:35:03.087+0000",
        "timeConvert": "2024-10-02 15:35:03",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1566,
        "name": "FAN",
        "action": false,
        "time": "2024-10-02T08:33:21.610+0000",
        "timeConvert": "2024-10-02 15:33:21",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1565,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:33:15.636+0000",
        "timeConvert": "2024-10-02 15:33:15",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1564,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:33:13.619+0000",
        "timeConvert": "2024-10-02 15:33:13",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1563,
        "name": "AIR ",
        "action": false,
        "time": "2024-10-02T08:33:11.478+0000",
        "timeConvert": "2024-10-02 15:33:11",
        "device": {
            "id": 3,
            "name": "AIR ",
            "state": null
        }
    },
    {
        "id": 1562,
        "name": "LED",
        "action": false,
        "time": "2024-10-02T08:33:07.471+0000",
        "timeConvert": "2024-10-02 15:33:07",
        "device": {
            "id": 1,
            "name": "LED",
            "state": null
        }
    },
    {
        "id": 1561,
        "name": "FAN",
        "action": false,
        "time": "2024-10-02T08:33:05.430+0000",
        "timeConvert": "2024-10-02 15:33:05",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1560,
        "name": "FAN",
        "action": false,
        "time": "2024-10-02T08:33:03.473+0000",
        "timeConvert": "2024-10-02 15:33:03",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1559,
        "name": "FAN",
        "action": false,
        "time": "2024-10-02T08:33:01.331+0000",
        "timeConvert": "2024-10-02 15:33:01",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1558,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:32:55.291+0000",
        "timeConvert": "2024-10-02 15:32:55",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1557,
        "name": "AIR ",
        "action": true,
        "time": "2024-10-02T08:32:49.260+0000",
        "timeConvert": "2024-10-02 15:32:49",
        "device": {
            "id": 3,
            "name": "AIR ",
            "state": null
        }
    },
    {
        "id": 1556,
        "name": "FAN",
        "action": false,
        "time": "2024-10-02T08:32:45.109+0000",
        "timeConvert": "2024-10-02 15:32:45",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1555,
        "name": "LED",
        "action": true,
        "time": "2024-10-02T08:32:39.029+0000",
        "timeConvert": "2024-10-02 15:32:39",
        "device": {
            "id": 1,
            "name": "LED",
            "state": null
        }
    },
    {
        "id": 1554,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:32:37.063+0000",
        "timeConvert": "2024-10-02 15:32:37",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1553,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:32:35.022+0000",
        "timeConvert": "2024-10-02 15:32:35",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1552,
        "name": "FAN",
        "action": false,
        "time": "2024-10-02T08:32:02.658+0000",
        "timeConvert": "2024-10-02 15:32:02",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1551,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:31:58.466+0000",
        "timeConvert": "2024-10-02 15:31:58",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    },
    {
        "id": 1550,
        "name": "FAN",
        "action": true,
        "time": "2024-10-02T08:31:56.405+0000",
        "timeConvert": "2024-10-02 15:31:56",
        "device": {
            "id": 2,
            "name": "FAN",
            "state": null
        }
    }
]
  
  export default fakeData;
  