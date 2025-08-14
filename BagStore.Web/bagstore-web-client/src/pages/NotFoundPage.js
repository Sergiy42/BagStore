import React from 'react';
import { Container,  Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const NotFoundPage = () => {
    return (
        <>
            <Header />
            <Container sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h2" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Страница не найдена
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    Извините, запрашиваемая страница не существует.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                >
                    Вернуться на главную
                </Button>
            </Container>
        </>
    );
};

export default NotFoundPage;