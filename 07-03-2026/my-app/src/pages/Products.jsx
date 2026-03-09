import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Popconfirm, message } from 'antd';
import api from '../services/api';

const { Title } = Typography;

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setData(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setData(data.filter(item => item.id !== id));
      message.success('Xóa sản phẩm thành công!');
    } catch (err) {
      message.error('Xóa thất bại!');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Tên sản phẩm', dataIndex: 'title', key: 'title' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (text) => `$${text}` },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Popconfirm title="Bạn có chắc muốn xóa?" onConfirm={() => deleteProduct(record.id)}>
          <Button type="link" danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Quản lý Sản phẩm</Title>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default Products;