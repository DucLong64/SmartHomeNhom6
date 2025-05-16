import React, { useState, useEffect } from 'react';
import { Table, Input, Select, DatePicker, Button, Typography } from 'antd';
import axios from 'axios';

const { Option } = Select;
const { Text } = Typography;

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
  },
  {
    title: 'Tên thiết bị',
    dataIndex: 'name',
  },
  {
    title: 'Hành động',
    dataIndex: 'action',
    render: (action) => (action ? 'Bật' : 'Tắt'),
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    sorter: true,
    render: (text) => {
      const date = new Date(text);
      const time = date.toLocaleTimeString('en-GB'); // Sử dụng 'en-GB' để hiển thị 24 giờ
      const dateFormatted = date.toLocaleDateString('en-GB'); // Hiển thị ngày theo định dạng DD/MM/YYYY
      return `${time} ${dateFormatted}`;
    },
  },
];

// Hàm để định dạng ngày và giờ theo định dạng "YYYY-MM-DD HH:mm:ss"
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const TableAction = () => {
  const [data, setData] = useState([]);
  const [searchField, setSearchField] = useState('time');
  const [searchDate, setSearchDate] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [order, setOrder] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  // Hàm gọi API với điều kiện tìm kiếm
  const fetchData = async () => {
    try {
      let term = '';
      if (searchField === 'time' && searchDate) {
        term = formatDate(searchDate.toDate());
      } else if (searchText) {
        term = searchText.trim();
      }

      const params = {
        field: searchField,
        term,
        order,
      };

      const queryString = `field=${params.field}&term=${term}${order ? `&order=${params.order}` : ''}`;
      const url = `http://localhost:8080/api/history?${queryString}`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi gọi dữ liệu:', error);
    }
  };

  // useEffect để gọi API mặc định liên tục khi không có điều kiện tìm kiếm hoặc sắp xếp
  useEffect(() => {
    if (!isSearching && !isSorted) {
      fetchData();
      const interval = setInterval(fetchData, 2000);
      return () => clearInterval(interval);
    }
  }, [isSearching, isSorted]);

  // useEffect để gọi API tìm kiếm liên tục khi có điều kiện tìm kiếm hoặc đang sắp xếp
  useEffect(() => {
    if (isSearching || isSorted) {
      fetchData();
      const interval = setInterval(fetchData, 2000);
      return () => clearInterval(interval);
    }
  }, [isSearching, searchField, searchDate, searchText, order, isSorted]);

  // useEffect để kiểm tra khi các trường tìm kiếm trống và gọi API mặc định
  useEffect(() => {
    if (
      (searchField !== 'time' && !searchText.trim()) ||
      (searchField === 'time' && !searchDate)
    ) {
      setIsSearching(false);
    }
  }, [searchField, searchText, searchDate]);

  const onSearch = () => {
    if (
      (searchField !== 'time' && !searchText.trim()) ||
      (searchField === 'time' && !searchDate)
    ) {
      setIsSearching(false); // Quay về chế độ gọi API mặc định
      fetchData();
    } else {
      setIsSearching(true); // Bắt đầu chế độ gọi API có điều kiện
      fetchData();
    }
  };

  const handleFieldChange = (value) => {
    setSearchField(value);
    setSearchText('');
    setSearchDate(null);
  };

  const handleDateChange = (date) => {
    setSearchDate(date);
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      setOrder(sorter.order === 'ascend' ? 'ASC' : 'DESC');
      setIsSorted(true);
    } else {
      setOrder(null);
      setIsSorted(false);
    }
    setPagination(pagination);
    fetchData(); // Gọi API sau khi cập nhật trạng thái sắp xếp
  };

  return (
    <div className='dataSensors'>
      <div className='search'>
        <Select
          defaultValue="time"
          style={{ width: 150, marginRight: 8 }}
          onChange={handleFieldChange}
        >
          <Option value="time">Thời gian</Option>
          <Option value="name">Tên thiết bị</Option>
        </Select>
        {searchField === 'time' ? (
          <DatePicker
            showTime
            placeholder="Tìm kiếm theo thời gian"
            onChange={handleDateChange}
            style={{ width: 200 }}
          />
        ) : (
          <Input
            placeholder={`Tìm kiếm theo ${searchField}`}
            onChange={handleTextChange}
            onPressEnter={onSearch}
            style={{ width: 200 }}
          />
        )}
        <Button type="primary" onClick={onSearch} style={{ marginLeft: '8px' }}>
          Tìm kiếm
        </Button>
      </div>
      <Text style={{ marginTop: 16, display: 'block' }}>
        Tổng số bản ghi: {data.length}
      </Text>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={data}
        pagination={{
          ...pagination,
          pageSizeOptions: ['5', '10', '15', '20'],
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default TableAction;
