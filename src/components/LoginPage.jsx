// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, Grid, Link } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { API_URLS } from '../apiConfig'; // Import API URL

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await fetch(API_URLS.LOGIN, { // SỬA: Dùng API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        login(data.user);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Không thể kết nối đến máy chủ.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh' }}>
        <Typography component="h1" variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold' }}>Đăng Nhập</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField margin="normal" required fullWidth id="username" label="Tên đăng nhập" name="username" autoComplete="username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField margin="normal" required fullWidth name="password" label="Mật khẩu" type="password" id="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#601d1b', '&:hover': { backgroundColor: '#722c29' } }}>
            Đăng Nhập
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/dang-ky" variant="body2">{"Chưa có tài khoản? Đăng ký"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default LoginPage;