import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  Table, TableBody, TableCell, TableHead, TableRow, Paper, 
  CircularProgress, Pagination, Box, Typography, Button, Alert 
} from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      setError("Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xóa sản phẩm này?")) {
      try {
        await api.delete(`/products/${id}`);
        setProducts(products.filter(p => p.id !== id));
        alert("Xóa thành công!");
      } catch (err) { alert("Lỗi khi xóa!"); }
    }
  };

  const currentData = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Quản lý Sản phẩm</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Table component={Paper}>
        <TableHead sx={{ bgcolor: '#eee' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => handleDelete(item.id)}>Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={Math.ceil(products.length / itemsPerPage)} page={page} onChange={(e, v) => setPage(v)} />
      </Box>
    </Box>
  );
};

export default Products;