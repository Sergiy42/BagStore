
import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const orderId = location.state?.orderId || 'unknown';

    return (
        <>
            <Header />
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom color="success.main">
                    ������ ������ �������!
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    ������� �� ��� �����!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    ����� ������ ������: <strong>{orderId}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    �� �������� �����������, ����� ����� ����� ����� � ��������.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/"
                    size="large"
                >
                    ��������� � �������
                </Button>
            </Container>
        </>
    );
};

export default PaymentSuccessPage;