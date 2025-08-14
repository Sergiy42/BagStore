import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cartItems } = useCart();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Магазин сумок
                    </Link>
                </Typography>
                <Button
                    color="inherit"
                    component={Link}
                    to="/cart"
                    startIcon={
                        <Badge badgeContent={cartItems.length} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    }
                >
                    Корзина
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;