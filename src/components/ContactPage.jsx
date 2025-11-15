// src/components/ContactPage.jsx
import React, { useState } from 'react';
import { 
  Container, Box, Typography, Grid, Paper, TextField, 
  Button, Select, MenuItem, FormControl, InputLabel, CircularProgress 
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material'; 
import { API_URLS } from '../apiConfig';
import { useNotification } from '../context/NotificationContext';

// Component thẻ thông tin (Email, Hotline)
function InfoCard({ icon, title, text }) {
  return (
    <Paper sx={{ p: 1, backgroundColor: '#eacba5', borderRadius: '15px', mb: 3 }}>
      <Box sx={{ p: 2, backgroundColor: '#bd784d', borderRadius: '15px', color: 'white', textAlign: 'center' }}>
        <Box sx={{ fontSize: '70px', mt: 2 }}>{icon}</Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2.5 }}>{title}</Typography>
        <Typography variant="body1" sx={{ fontSize: '18px', mt: 1, mb: 2 }}>{text}</Typography>
      </Box>
    </Paper>
  );
}

function ContactPage() {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    hoten: '',
    sdt: '',
    email: '',
    nhahang: 'CS1',
    loinhan: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    if (!formData.hoten || !formData.sdt) {
      showNotification('Vui lòng nhập Họ tên và Số điện thoại.', 'warning');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URLS.SUBMIT_CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        showNotification('Gửi liên hệ thành công!', 'success');
        // Xóa form sau khi gửi
        setFormData({ hoten: '', sdt: '', email: '', nhahang: 'CS1', loinhan: '' });
      } else {
        showNotification(data.message, 'error');
      }
    } catch (err) {
      showNotification('Lỗi kết nối máy chủ.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Banner */}
      <Box component="img" src="Media/TK-ANH-WEB-08-1400x474.jpg" alt="Liên hệ" sx={{ width: '100%', height: 'auto' }} />
      <Typography variant="h3" sx={{ textAlign: 'center', color: '#601d1b', fontWeight: 'bold', my: 4 }}>
        Đăng ký tư vấn
      </Typography>

      {/* Form và Thông tin liên hệ */}
      <Container maxWidth="lg" sx={{ mb: 5 }}>
        <Grid container spacing={4}>
          {/* Cột trái (Email, Hotline) */}
          <Grid item xs={12} md={4}>
            <InfoCard icon={<Email sx={{ fontSize: 'inherit' }} />} title="Email:" text="info.btthpc@gmail.com" />
            <InfoCard icon={<Phone sx={{ fontSize: 'inherit' }} />} title="Hotline:" text="1900.63.65.69" />
          </Grid>

          {/* Cột phải (Form) */}
          <Grid item xs={12} md={8}>
            <Paper 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ 
                p: 4, 
                backgroundColor: '#eacba5', 
                borderRadius: '30px', 
                // height: '100%' // <-- XÓA DÒNG NÀY ĐỂ FORM NGẮN LẠI
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Họ tên (*)" name="hoten" value={formData.hoten} onChange={handleChange} fullWidth required sx={{ backgroundColor: 'white', borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Điện thoại di động (*)" name="sdt" value={formData.sdt} onChange={handleChange} fullWidth required sx={{ backgroundColor: 'white', borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth sx={{ backgroundColor: 'white', borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ backgroundColor: 'white', borderRadius: '50px', '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}>
                    <InputLabel id="nhahang-label">Vui lòng chọn nhà hàng (*)</InputLabel>
                    <Select labelId="nhahang-label" name="nhahang" value={formData.nhahang} label="Vui lòng chọn nhà hàng (*)" onChange={handleChange}>
                      <MenuItem value="CS1">CS1: 42 Nguyên Hồng, Đống Đa</MenuItem>
                      <MenuItem value="CS2">CS2: 104 Yết Kiêu, Hai Bà Trưng</MenuItem>
                      <MenuItem value="CS3">CS3: 102 Trần Phú, Hà Đông</MenuItem>
                      <MenuItem value="CS4">CS4: 100 Vũ Phạm Hàm, Cầu Giấy</MenuItem>
                      <MenuItem value="CS5">CS5: 340 Bà Triệu, Hai Bà Trưng</MenuItem>
                      <MenuItem value="CS6">CS6: 76 Nguyễn Chí Thanh, Đống Đa</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Lời nhắn yêu cầu đặt bàn"
                    name="loinhan"
                    value={formData.loinhan}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ backgroundColor: 'white', borderRadius: '20px', '& .MuiOutlinedInput-root': { borderRadius: '20px' } }}
                  />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={loading}
                    sx={{ 
                      color: 'white', 
                      fontWeight: 'bolder', 
                      backgroundColor: '#33522d', 
                      width: '150px', 
                      height: '50px', 
                      borderRadius: '15px',
                      '&:hover': { backgroundColor: '#284123' }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Gửi Liên Hệ'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* --- THÊM LẠI PHẦN BẢN ĐỒ (MAP) --- */}
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <InfoCard icon={<LocationOn sx={{ fontSize: 'inherit' }} />} title="Địa chỉ:" text="" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper sx={{ height: '500px', overflow: 'hidden', borderRadius: '8px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.316827878931!2d105.80993517590816!3d21.01999708785311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab618239086f%3A0x6244f7751a441e8c!2zNDIgTmcuIDQyIE5ndXnDqm4gSOG7k25nLCBMw6FuZyBI4bqhLCDEkOG7kW5nIMSQYSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1731665488168!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{ border:0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactPage;