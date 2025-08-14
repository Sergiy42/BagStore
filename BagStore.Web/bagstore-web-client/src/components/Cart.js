import React from 'react';
import { Box, Typography, IconButton, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();

    if (cartItems.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h5">Ваша корзина пуста</Typography>
            </Box>
        );
    }

    const formatPrice = (price) => {
        return price?.toLocaleString('ru-RU') || '0';
    };

    return (
        <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Товар</TableCell>
                            <TableCell align="center">Количество</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Сумма</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.map((item) => (
                            <TableRow key={item.Id}>
                                <TableCell>
                                    <Typography fontWeight="bold">{item.Name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.Material === 'natural' ? 'Натуральная кожа' : 'Искусственная кожа'}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <IconButton onClick={() => updateQuantity(item.Id, item.quantity - 1)}>
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography mx={1}>{item.quantity}</Typography>
                                        <IconButton onClick={() => updateQuantity(item.Id, item.quantity + 1)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">{formatPrice(item.Price)} руб.</TableCell>
                                <TableCell align="right">{formatPrice(item.Price * item.quantity)} руб.</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => removeFromCart(item.Id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography variant="h6" sx={{ mr: 2 }}>
                    Итого:
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                    {formatPrice(totalAmount)} руб.
                </Typography>
            </Box>
        </Box>
    );
};

export default Cart;