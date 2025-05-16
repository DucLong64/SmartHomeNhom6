const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const generateRandomDate = (daysBack) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date;
};

const generateFakeData = (id) => {
  const randomDate = generateRandomDate(30); // Ngày ngẫu nhiên trong 30 ngày gần đây
  return {
    id: id,
    temperature: (Math.random() * 10 + 20).toFixed(2), // Nhiệt độ từ 20°C đến 30°C
    light: (Math.random() * 100).toFixed(2),           // Ánh sáng từ 0 đến 100 lux
    humidity: (Math.random() * 30 + 50).toFixed(2),    // Độ ẩm từ 50% đến 80%
    time: formatDate(randomDate),                      // Thời gian ngẫu nhiên với định dạng ngày-tháng-năm
  };
};

// Tạo mảng dữ liệu giả gồm 30 bản ghi
// const fakeData = Array.from({ length: 30 }, (_, index) => generateFakeData(index + 1));

const fakeData = [
  {
    id: 6301,
    temperature: 22.5,
    humidity: 55,
    light: 35,
    other: null,
    time: "2024-10-01T08:15:28.937+0000"
  },
  {
    id: 6300,
    temperature: 24.8,
    humidity: 60,
    light: 80,
    other: null,
    time: "2024-10-01T09:30:15.937+0000"
  },
  {
    id: 6299,
    temperature: 23.0,
    humidity: 58,
    light: 110,
    other: null,
    time: "2024-10-01T11:45:12.500+0000"
  },
  {
    id: 6298,
    temperature: 26.3,
    humidity: 53,
    light: 45,
    other: null,
    time: "2024-10-02T07:20:05.700+0000"
  },
  {
    id: 6297,
    temperature: 29.5,
    humidity: 65,
    light: 130,
    other: null,
    time: "2024-10-02T13:15:45.300+0000"
  },
  {
    id: 6296,
    temperature: 28.2,
    humidity: 62,
    light: 100,
    other: null,
    time: "2024-10-02T14:30:35.200+0000"
  },
  {
    id: 6295,
    temperature: 25.4,
    humidity: 57,
    light: 75,
    other: null,
    time: "2024-10-03T10:05:22.750+0000"
  },
  {
    id: 6294,
    temperature: 30.1,
    humidity: 68,
    light: 160,
    other: null,
    time: "2024-10-03T12:45:18.150+0000"
  },
  {
    id: 6293,
    temperature: 27.7,
    humidity: 64,
    light: 115,
    other: null,
    time: "2024-10-03T15:30:22.750+0000"
  },
  {
    id: 6292,
    temperature: 21.6,
    humidity: 50,
    light: 50,
    other: null,
    time: "2024-10-04T06:15:18.637+0000"
  },
  {
    id: 6291,
    temperature: 24.9,
    humidity: 55,
    light: 35,
    other: null,
    time: "2024-10-04T09:45:10.451+0000"
  },
  {
    id: 6290,
    temperature: 29.2,
    humidity: 70,
    light: 190,
    other: null,
    time: "2024-10-05T10:10:05.901+0000"
  },
  {
    id: 6289,
    temperature: 28.7,
    humidity: 72,
    light: 120,
    other: null,
    time: "2024-10-05T12:00:55.500+0000"
  },
  {
    id: 6288,
    temperature: 22.2,
    humidity: 54,
    light: 95,
    other: null,
    time: "2024-10-06T08:25:14.801+0000"
  },
  {
    id: 6287,
    temperature: 26.8,
    humidity: 59,
    light: 200,
    other: null,
    time: "2024-10-06T14:15:28.200+0000"
  },
  {
    id: 6286,
    temperature: 25.5,
    humidity: 60,
    light: 140,
    other: null,
    time: "2024-10-06T16:30:25.100+0000"
  },
  {
    id: 6285,
    temperature: 27.0,
    humidity: 61,
    light: 130,
    other: null,
    time: "2024-10-07T10:45:22.650+0000"
  },
  {
    id: 6284,
    temperature: 30.5,
    humidity: 74,
    light: 170,
    other: null,
    time: "2024-10-07T13:10:22.850+0000"
  },
  {
    id: 6283,
    temperature: 29.3,
    humidity: 73,
    light: 90,
    other: null,
    time: "2024-10-08T15:30:32.640+0000"
  },
  {
    id: 6282,
    temperature: 24.1,
    humidity: 58,
    light: 180,
    other: null,
    time: "2024-10-08T08:20:27.430+0000"
  },
  {
    id: 6281,
    temperature: 23.6,
    humidity: 56,
    light: 45,
    other: null,
    time: "2024-10-09T09:50:45.231+0000"
  },
  {
    id: 6280,
    temperature: 26.4,
    humidity: 65,
    light: 200,
    other: null,
    time: "2024-10-09T11:20:55.537+0000"
  }
];


export default fakeData;
