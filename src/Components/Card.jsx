import React from 'react';
import { Card as MuiCard, CardContent, Typography, Button, Box } from '@mui/material';

const Card = ({ imgSrc, title, description, link, onAddToCompare }) => {
    return (
        <Box
            sx={{
                maxWidth: 345,
                margin: 'auto',
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                    opacity: 0.9,
                },
                textTransform: 'none', 
                display: 'block', 
                padding: 0,
                width: '100%', // Ensure box takes full width
            }}
        >
            <MuiCard
                sx={{
                    maxWidth: 300, // Set explicit width for the card
                    minWidth: 'auto',
                    minHeight: 350,
                    maxHeight: 350,
                    margin: 'auto',
                    textAlign: 'left',
                    boxSizing: 'border-box', // Include padding and border in the element's total width and height
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <br />
                    <Box className="flex-col" sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                        <Button href={link} variant="contained" color="primary" sx={{}}>
                            Take Quiz
                        </Button>
                        <br />
                        <Button onClick={onAddToCompare} variant="contained" color="secondary">
                            Description
                        </Button>
                    </Box>
                </CardContent>
            </MuiCard>
        </Box>
    );
};

export default Card;

