import React from 'react';
import { FormGroup, FormControlLabel, Checkbox, Box, Typography } from '@mui/material';

const FilterPanel = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: checked ? e.target.value : null
        }));
    };

    return (
        <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Фильтры</Typography>

            <Typography variant="subtitle1">Материал</Typography>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Натуральная кожа"
                    name="material"
                    value="natural"
                    checked={filters.material === 'natural'}
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Искусственная кожа"
                    name="material"
                    value="artificial"
                    checked={filters.material === 'artificial'}
                    onChange={handleChange}
                />
            </FormGroup>

            <Typography variant="subtitle1" sx={{ mt: 2 }}>Размер</Typography>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Большие сумки"
                    name="size"
                    value="large"
                    checked={filters.size === 'large'}
                    onChange={handleChange}
                />
                <FormControlLabel
                    control={<Checkbox />}
                    label="Маленькие сумки"
                    name="size"
                    value="small"
                    checked={filters.size === 'small'}
                    onChange={handleChange}
                />
            </FormGroup>
        </Box>
    );
};

export default FilterPanel;