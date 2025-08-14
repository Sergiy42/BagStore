import React, { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import ProductCard from './ProductCard';
import { getProducts } from '../services/api';

const ProductGrid = ({ filters }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getProducts(filters);

                if (response && response.data && Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    throw new Error('Некорректный формат данных');
                }
            } catch (err) {
                console.error('Ошибка при загрузке товаров:', err);
                setError('Не удалось загрузить товары. Попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    if (loading) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Box sx={{ p: 4, textAlign: 'center', color: 'error.main' }}>{error}</Box>;
    }

    if (!products || products.length === 0) {
        return <Box sx={{ p: 4, textAlign: 'center' }}>Товары не найдены</Box>;
    }

    return (
        <Grid container spacing={2}> 
            {products.map(product => (
                <Grid item key={product.Id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductGrid;