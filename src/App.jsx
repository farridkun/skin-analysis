import FaceAnalysis from './components/FaceAnalysis';
import { Box, CssBaseline, Typography } from '@mui/material';
import Homepage from './components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router';
import Wizard from './components/Wizard';
import BestPickupProductList from './components/BestPickupProductList';
import SharePage from './components/SharePage';

import { useEffect, useState } from 'react';
import hackathonImage from './assets/hackathon-2025.png';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return (
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
        textAlign='center'
        p={3}
        sx={{
          backgroundColor: '#0D296A',
        }}>
        <img
          src={hackathonImage}
          alt='Hackathon 2025'
          style={{ maxWidth: 500, width: 200, height: 'auto', marginBottom: 16 }}
        />
        <Typography variant='h6' color='white'>
          For Better & Optimal Experience, Please Use Mobile Device View
        </Typography>
        <Typography variant='h6' color='white'>
          🕹️ Made with 💖 & BIG Motivation by this quote
        </Typography>
        <Typography variant='h6' color='white' sx={{ fontStyle: 'italic' }}>
          `Uvuvwevwevwe Onyetenyevwe Ugwemubwem Ossas` Group - 10
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/wizard' element={<Wizard />} />
          <Route path='/products' element={<BestPickupProductList />} />
          <Route path='/share' element={<SharePage />} />
          <Route path='/analyze' element={<FaceAnalysis />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
