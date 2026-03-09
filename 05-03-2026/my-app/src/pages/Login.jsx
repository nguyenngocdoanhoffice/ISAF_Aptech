import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.email === 'example@gmail.com' && form.password === 'pass123aA@') {
      localStorage.setItem('userToken', 'fake-jwt-token');
      navigate('/dashboard/products');
    } else {
      setError('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>LOGIN</Typography>
        <form onSubmit={handleLogin}>
          <TextField fullWidth label="Email" margin="normal" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 3, py: 1.5 }}>Đăng nhập</Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;