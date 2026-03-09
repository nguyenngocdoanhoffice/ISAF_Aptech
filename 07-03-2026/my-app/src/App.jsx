import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import Login from './pages/Login';
import Products from './pages/Products';
import Users from './pages/Users';

const PrivateRoute = ({ children }) => {
  return localStorage.getItem('userToken') ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => (
  <>
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Panel</Typography>
        <Button color="inherit" component={Link} to="/dashboard/products">Sản phẩm</Button>
        <Button color="inherit" component={Link} to="/dashboard/users">Người dùng</Button>
        <Button color="inherit" onClick={() => { localStorage.clear(); window.location.href='/login'; }}>Đăng xuất</Button>
      </Toolbar>
    </AppBar>
    <Container sx={{ mt: 4 }}>{children}</Container>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/products" element={<PrivateRoute><Layout><Products /></Layout></PrivateRoute>} />
        <Route path="/dashboard/users" element={<PrivateRoute><Layout><Users /></Layout></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Typography } from '@mui/material'; 
export default App;