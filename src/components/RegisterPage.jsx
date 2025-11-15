// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Alert, Grid, Link } from '@mui/material';
import { API_URLS } from '../apiConfig'; // Import API URL

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (!username || !email || !password) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }
    try {
      const response = await fetch(API_URLS.REGISTER, { // SỬA: Dùng API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
        setTimeout(() => navigate('/dang-nhap'), 2000);
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
        <Typography component="h1" variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold' }}>Đăng Ký</Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField margin="normal" required fullWidth id="username" label="Tên đăng nhập" name="username" autoComplete="username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField margin="normal" required fullWidth id="email" label="Địa chỉ Email" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField margin="normal" required fullWidth name="password" label="Mật khẩu" type="password" id="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#601d1b', '&:hover': { backgroundColor: '#722c29' } }}>
            Đăng Ký
          </Button>
           <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/dang-nhap" variant="body2">{"Đã có tài khoản? Đăng nhập"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
export default RegisterPage;