// src/components/AdminRevenuePage.jsx
import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Select, MenuItem, TextField, Button, 
  FormControl, InputLabel, CircularProgress, Alert, Grid
} from '@mui/material';
import { API_URLS } from '../apiConfig';

// --- 1. IMPORT CHART.JS ---
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// --- 2. ĐĂNG KÝ CÁC MODULE CỦA CHART.JS ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Hàm định dạng tiền tệ
const formatCurrency = (number) => {
  if (number === null || number === undefined) {
    number = 0;
  }
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
};

// Lấy ngày hôm nay theo định dạng YYYY-MM-DD
const getToday = () => new Date().toISOString().split('T')[0];
// Lấy tháng này theo định dạng YYYY-MM
const getThisMonth = () => new Date().toISOString().slice(0, 7);
// Lấy năm nay
const getThisYear = () => new Date().getFullYear();

function AdminRevenuePage() {
  const [type, setType] = useState('day');
  
  // State cho từng loại input
  const [date, setDate] = useState(getToday());
  const [month, setMonth] = useState(getThisMonth());
  const [quarter, setQuarter] = useState(1);
  const [year, setYear] = useState(getThisYear());
  
  // State cho kết quả
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Xử lý khi nhấn nút "Xem báo cáo"
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setReportData(null);

    const params = new URLSearchParams();
    params.append('type', type);

    if (type === 'day') {
      params.append('date', date);
    } else if (type === 'month') {
      params.append('month', month);
    } else if (type === 'quarter') {
      params.append('quarter', quarter);
      params.append('year', year);
    } else if (type === 'year') {
      params.append('year', year);
    }

    try {
      const response = await fetch(`${API_URLS.ADMIN_REVENUE_REPORT}?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setReportData(data);
      } else {
        setError(data.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  // --- 3. CHUẨN BỊ DỮ LIỆU CHO BIỂU ĐỒ ---
  const chartData = {
    labels: [reportData ? reportData.label : ''], // Nhãn X
    datasets: [
      {
        label: 'Doanh thu (VNĐ)',
        data: [reportData ? reportData.totalRevenue : 0], // Dữ liệu Y
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình cho biểu đồ
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += formatCurrency(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatCurrency(value); // Định dạng trục Y
          }
        }
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ color: '#601d1b', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
        Báo Cáo Doanh Thu
      </Typography>

      {/* Form chọn loại báo cáo */}
      <Paper 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          p: 3, 
          mb: 4, 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFF5D7' 
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="type-select-label">Loại báo cáo</InputLabel>
              <Select
                labelId="type-select-label"
                id="type"
                value={type}
                label="Loại báo cáo"
                onChange={(e) => setType(e.target.value)}
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value="day">Theo ngày</MenuItem>
                <MenuItem value="month">Theo tháng</MenuItem>
                <MenuItem value="quarter">Theo quý</MenuItem>
                <MenuItem value="year">Theo năm</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* --- SỬA: THÊM LẠI CÁC KHỐI BỊ THIẾU --- */}

          {/* Input theo ngày */}
          {type === 'day' && (
            <Grid item xs={12}>
              <TextField
                type="date"
                id="date"
                label="Chọn ngày"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          )}

          {/* Input theo tháng */}
          {type === 'month' && (
            <Grid item xs={12}>
              <TextField
                type="month"
                id="month"
                label="Chọn tháng"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          )}

          {/* Input theo quý */}
          {type === 'quarter' && (
            <>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="quarter-select-label">Chọn quý</InputLabel>
                  <Select
                    labelId="quarter-select-label"
                    id="quarter"
                    value={quarter}
                    label="Chọn quý"
                    onChange={(e) => setQuarter(e.target.value)}
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value={1}>Quý 1</MenuItem>
                    <MenuItem value={2}>Quý 2</MenuItem>
                    <MenuItem value={3}>Quý 3</MenuItem>
                    <MenuItem value={4}>Quý 4</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="number"
                  id="quarter_year"
                  label="Nhập năm"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
              </Grid>
            </>
          )}

          {/* Input theo năm */}
          {type === 'year' && (
            <Grid item xs={12}>
              <TextField
                type="number"
                id="year"
                label="Nhập năm"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                fullWidth
                sx={{ backgroundColor: 'white' }}
              />
            </Grid>
          )}
          
          {/* --- KẾT THÚC SỬA LỖI --- */}
          
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Xem báo cáo'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Kết quả báo cáo */}
      {error && <Alert severity="error">{error}</Alert>}
      
      {reportData && (
        <Paper sx={{ p: 4, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          
          <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 3 }}>
            {reportData.label}: {formatCurrency(reportData.totalRevenue)}
          </Typography>
          
          {/* Nếu không có dữ liệu thì báo */}
          {reportData.totalRevenue === 0 ? (
             <Alert severity="warning" sx={{ mt: 2 }}>Không có dữ liệu cho lựa chọn này.</Alert>
          ) : (
             // Vẽ biểu đồ
             <Box sx={{ position: 'relative', height: '400px' }}>
               <Bar options={chartOptions} data={chartData} />
             </Box>
          )}
        </Paper>
      )}
    </Container>
  );
}

export default AdminRevenuePage;