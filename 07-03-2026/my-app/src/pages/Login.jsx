import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { email, password } = values;
    if (email === 'example@gmail.com' && password === 'pass123aA@') {
      localStorage.setItem('userToken', 'fake-token-123');
      message.success('Đăng nhập thành công!');
      navigate('/dashboard/products');
    } else {
      message.error('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Title level={3} style={{ textAlign: 'center' }}>ADMIN LOGIN</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập đúng email!' }]}>
            <Input placeholder="example@gmail.com" size="large" />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
            <Input.Password placeholder="pass123aA@" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">Đăng nhập</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;