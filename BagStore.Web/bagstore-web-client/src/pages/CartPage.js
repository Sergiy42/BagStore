import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Header from '../components/Header';
import Cart from '../components/Cart';
import CheckoutForm from '../components/CheckoutForm';

const CartPage = () => {
    return (
        <>
            <Header />
            <Container sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Ваша корзина
                </Typography>
                <Cart />
                <Box sx={{ mt: 4 }}>
                    <CheckoutForm />
                </Box>
            </Container>
        </>
    );
};

export default CartPage;