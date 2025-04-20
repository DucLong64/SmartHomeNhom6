// assets
import {
  AppstoreAddOutlined,
  DashboardOutlined,
  HistoryOutlined,
  LineChartOutlined,
  SlidersOutlined,
  TeamOutlined, // Import biểu tượng TeamOutlined
} from '@ant-design/icons';

// icons
const icons = {
  AppstoreAddOutlined,
  DashboardOutlined,
  HistoryOutlined,
  LineChartOutlined,
  SlidersOutlined,
  TeamOutlined, // Thêm TeamOutlined vào danh sách icons
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  type: 'group',
  children: [
    {
      id: 'util-dashboardnew',
      title: 'Bảng điều khiển',
      type: 'item',
      url: '/dashboardnew',
      icon: icons.LineChartOutlined,  // Icon biểu đồ cho dashboard
    },
    {
      id: 'util-datasensors',
      title: 'Dữ liệu cảm biến',
      type: 'item',
      url: '/dataSensors',
      icon: icons.SlidersOutlined,  // Icon thanh trượt cho cảm biến dữ liệu
    },
    {
      id: 'util-actionHistory',
      title: 'Lịch sử hành động',
      type: 'item',
      url: '/actionHistory',
      icon: icons.HistoryOutlined,  // Icon lịch sử cho lịch sử hành động
    },
    {
      id: 'util-profiles',
      title: 'Thông tin cá nhân',
      type: 'item',
      url: '/profiles',
      icon: icons.TeamOutlined,  // Thay biểu tượng bằng TeamOutlined
    },
  ]
};

export default utilities;
