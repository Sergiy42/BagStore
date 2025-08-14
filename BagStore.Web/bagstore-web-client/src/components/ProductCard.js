
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [expanded, setExpanded] = useState(false);
    const [needsExpand, setNeedsExpand] = useState(false);
    const descriptionRef = useRef(null);
    useEffect(() => {
        if (descriptionRef.current) {
            
            const needsExpand = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
            setNeedsExpand(needsExpand);
        }
    }, [product]);

    if (!product) return null;

    const name = product.Name || 'Без названия';
    const material = product.Material || '';
    const size = product.Size || '';
    const description = product.Description || 'Описание отсутствует';
    const imageUrl = product.ImageUrl || '';
    const price = product.Price || 0;

    const formattedPrice = price.toLocaleString('ru-RU') + ' руб.';

  

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 280,
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
            }
        }}>
            <CardMedia
                component="img"
                sx={{
                    height: 180,
                    objectFit: 'cover'
                }}
                image={`http://localhost:5025${imageUrl}`}
                alt={name}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
            />
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography gutterBottom variant="h6" component="div" sx={{
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    lineHeight: 1.2,
                    height: '2.4em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                }}>
                    {name}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    {material === 'natural' ? 'Натуральная кожа' : 'Искусственная кожа'} |
                    {size === 'large' ? ' Большая' : ' Маленькая'}
                </Typography>

                <Box sx={{ position: 'relative' }}>
                    <Typography
                        ref={descriptionRef}
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: '0.8rem',
                            height: expanded ? 'auto' : '4.5em',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: expanded ? 'unset' : 3,
                            WebkitBoxOrient: 'vertical',
                            transition: 'height 0.3s ease'
                        }}
                    >
                        {description}
                    </Typography>

                    
                    {!expanded && needsExpand && (
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '2em',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,1) 100%)'
                        }} />
                    )}
                </Box>

                {needsExpand && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 0.5 }}>
                        <IconButton
                            size="small"
                            onClick={() => setExpanded(!expanded)}
                            sx={{
                                color: 'text.secondary',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    color: 'primary.main'
                                }
                            }}
                        >
                            {expanded ? <ExpandLess /> : <ExpandMore />}
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                                {expanded ? 'Свернуть' : 'Развернуть'}
                            </Typography>
                        </IconButton>
                    </Box>
                )}

                <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {formattedPrice}
                </Typography>
            </CardContent>
            <Box sx={{ p: 1 }}>
                <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    onClick={() => addToCart(product)}
                    sx={{ py: 1 }}
                >
                    В корзину
                </Button>
            </Box>
        </Card>
    );
};

export default ProductCard;