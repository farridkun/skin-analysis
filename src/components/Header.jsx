import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = ({ handleBack }) => {
  return (
    <>
      <AppBar
        position='fixed'
        color='default'
        elevation={0}
        sx={{
          backgroundColor: 'white',
          borderBottom: 'none',
          '& .MuiToolbar-root': {
            borderBottom: 'none',
          },
        }}
      >
        <Toolbar>
          <IconButton edge='start' onClick={handleBack} aria-label='back'>
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='h1'
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              marginRight: '48px',
            }}
          >
            Skin Analyzer
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
