import FaceAnalysis from './components/FaceAnalysis';
import { Box, CssBaseline, Typography } from '@mui/material';
import Homepage from './components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router';
import Wizard from './components/Wizard';
import BestPickupProductList from './components/BestPickupProductList';
import SharePage from './components/SharePage';

import { useEffect, useState } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return (
      <Box display='flex' alignItems='center' justifyContent='center' height='100vh' textAlign='center' p={3}>
        <Typography variant='h6' color='error'>
          This application is only accessible on mobile devices. Please use a mobile device to continue.
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
