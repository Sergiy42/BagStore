import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Header from '../components/Header';
import FilterPanel from '../components/FilterPanel';
import ProductGrid from '../components/ProductGrid';

const HomePage = () => {
    const [filters, setFilters] = useState({
        material: null,
        size: null
    });

    return (
        <>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}> 
                <Grid container spacing={2}> 
                    <Grid item xs={12} md={3}>
                        <FilterPanel filters={filters} setFilters={setFilters} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <ProductGrid filters={filters} />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default HomePage;