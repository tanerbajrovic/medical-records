import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      MedInsightHub
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
    </Typography>
  )
}