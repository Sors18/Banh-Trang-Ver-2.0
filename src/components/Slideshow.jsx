// src/components/Slideshow.jsx

import React, { useState, useEffect, useRef, useCallback } from 'react'; // Thêm useCallback
import { Box, IconButton } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const bannerData = [
    { 
        image: '/Media/banner1.png', 
        title: 'THÔNG BÁO', 
    },
    { 
        image: '/Media/banner2.jpg', 
        title: 'MÓN MỚI HẤP DẪN',
    },
    { 
        image: '/Media/banner3.jpg', 
        title: 'ƯU ĐÃI SINH NHẬT',
    },
];

function Slideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef(null);

    // Dùng useCallback để hàm không bị tạo lại mỗi lần render
    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, []); // Dependency rỗng vì nó không phụ thuộc vào gì bên ngoài

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + bannerData.length) % bannerData.length);
    }, []); // Dependency rỗng

    // Dùng useCallback và khai báo handleNext là dependency
    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            handleNext(); 
        }, 3000);
    }, [handleNext]); // Phụ thuộc vào handleNext

    // Thêm resetTimer vào dependency array
    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [currentIndex, resetTimer]); // Thêm resetTimer vào đây

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            overflow: 'hidden', 
            aspectRatio: { xs: '3/2', sm: '16/6', md: '16/5' },
            backgroundColor: '#fce4ec'
        }}>

            {/* Các slide */}
            {bannerData.map((slide, index) => (
                <Box 
                    key={index}
                    sx={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%',
                        opacity: index === currentIndex ? 1 : 0,
                        transition: 'opacity 0.7s ease-in-out',
                        zIndex: 1
                    }}
                >
                    <Box 
                        component="img" 
                        src={slide.image} 
                        alt={slide.title} 
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover'
                        }}
                    />
                </Box>
            ))}

            {/* Mũi tên trái */}
            <IconButton 
                onClick={handlePrev} 
                sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '16px', 
                    transform: 'translateY(-50%)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                    zIndex: 2,
                    '&:hover': { backgroundColor: 'white' }
                }}
            >
                <ArrowBackIosNew />
            </IconButton>

            {/* Mũi tên phải */}
            <IconButton 
                onClick={handleNext} 
                sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    right: '16px', 
                    transform: 'translateY(-50%)', 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                    zIndex: 2,
                    '&:hover': { backgroundColor: 'white' }
                }}
            >
                <ArrowForwardIos />
            </IconButton>

            {/* Dấu chấm Pagination */}
            <Box 
                sx={{ 
                    position: 'absolute', 
                    bottom: '16px', 
                    left: '50%', 
                    transform: 'translateX(-50%)', 
                    display: 'flex', 
                    gap: 1,
                    zIndex: 2
                }}
            >
                {bannerData.map((_, index) => (
                    <Box 
                        key={index}
                        onClick={() => goToSlide(index)}
                        sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            backgroundColor: index === currentIndex ? '#e5007f' : 'rgba(255, 255, 255, 0.8)',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}

export default Slideshow;