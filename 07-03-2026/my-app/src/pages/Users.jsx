import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, CircularProgress, Pagination, Box, Typography, Button } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const currentData = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Quản lý Người dùng</Typography>
      <Table component={Paper}>
        <TableHead sx={{ bgcolor: '#e3f2fd' }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Điện thoại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentData.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination count={Math.ceil(users.length / itemsPerPage)} page={page} onChange={(e, v) => setPage(v)} />
      </Box>
    </Box>
  );
};

export default Users;