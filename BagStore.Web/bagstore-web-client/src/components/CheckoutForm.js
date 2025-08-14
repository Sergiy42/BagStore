import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid, Alert } from '@mui/material';
import { useCart } from '../context/CartContext';
import { createOrder, initiatePayment } from '../services/api';
import { useNavigate } from 'react-router-dom'; 
import api from '../services/api'; 

const CheckoutForm = () => {
    const { cartItems, totalAmount, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const orderItems = cartItems.map(item => ({
                ProductId: item.Id,
                Quantity: item.quantity,
                Price: item.Price
            }));

            const orderData = {
                Items: orderItems,
                CustomerName: formData.name,
                DeliveryAddress: formData.address,
                Phone: formData.phone,
                Email: formData.email,
                TotalAmount: totalAmount
            };

            const orderResponse = await createOrder(orderData);
            const orderId = orderResponse.data.id;

            const paymentResponse = await initiatePayment(orderId);
            const paymentResult = paymentResponse.data;

            
            if (paymentResult.IsSandbox) {
                
                const sandboxResponse = await api.post('/api/sandboxpayment/process', {
                    orderId,
                    amount: totalAmount
                });

                if (sandboxResponse.data.success) {
                    navigate('/payment/success', { state: { orderId } });
                    clearCart();
                } else {
                    throw new Error('Sandbox payment failed');
                }
            } else {
               
                window.location.href = paymentResult.PaymentUrl;
                clearCart();
            }
        } catch (err) {
            console.error('Ошибка при оформлении заказа:', err);
            setError('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
        } finally {
            setIsSubmitting(false);
        }
    };


        return (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <Typography variant="h6" gutterBottom>
                    Данные для доставки
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="ФИО"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Адрес доставки"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="Телефон"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Обработка...' : 'Перейти к оплате'}
                    </Button>
                </Box>
            </Box>
        );
    };
    
    export default CheckoutForm;
