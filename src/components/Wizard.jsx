import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, Stack, CircularProgress, Backdrop } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../assets/logo.jpeg';
import NoticeConsent from './NoticeConsent';

const SELFIE_INSTRUCTIONS = [
  'Remove makeup and take off glasses/mask.',
  'Make sure your hair does not cover your face.',
  'Look straight at the camera with a relaxed expression.',
  'Ensure the room is well-lit.',
];

const Wizard = () => {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    if (wizardStep == 1) {
      setIsLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });

        stream.getTracks().forEach((track) => track.stop());
        setWizardStep(2);
      } catch (error) {
        console.error('Camera permission denied or error:', error);
        alert('Camera access is required to analyze your skin. Please allow camera access to continue.');
      } finally {
        setIsLoading(false);
      }
    } else {
      navigate('/analyze');
    }
  };

  const handleBack = () => {
    if (wizardStep == 1) {
      navigate('/');
    } else {
      setWizardStep(1);
    }
  };

  const SkinAnalyzerDesc = () => {
    return (
      <Typography variant='body2' textAlign='center'>
        Skin Analyzer evaluates your skin and offers personalized product recommendations using advanced artificial
        intelligence (AI) skin technology.
      </Typography>
    );
  };

  const SelfieInstructions = () => {
    return (
      <Stack>
        {SELFIE_INSTRUCTIONS.map((instruction, index) => (
          <Typography key={index} variant='body1' sx={{ fontSize: '0.8rem' }}>
            {`${index + 1}. ${instruction}`}
          </Typography>
        ))}
      </Stack>
    );
  };
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
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

      <Backdrop
        open={isLoading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
        <Typography variant='body1' sx={{ color: 'white' }}>
          Requesting camera permission...
        </Typography>
      </Backdrop>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Box
            component='img'
            src={logo}
            alt='Skin Analysis'
            sx={{
              width: '200px',
              height: 'auto',
            }}
          />
          <Typography
            variant='h6'
            textAlign='center'
            sx={{
              color: '#B32656',
              fontWeight: 700,
            }}
          >
            {wizardStep == 1 ? 'Skin Analyzer' : 'Start Selfie'}
          </Typography>
          {wizardStep == 1 ? <SkinAnalyzerDesc /> : <SelfieInstructions />}
        </Box>

        <Box
          sx={{
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {wizardStep == 1 && <NoticeConsent consent={consent} setConsent={setConsent} />}

          <Button
            variant='contained'
            fullWidth
            disabled={!consent || isLoading}
            onClick={handleNext}
            sx={{
              marginTop: 1,
              backgroundColor: '#B32656',
              '&:hover': {
                backgroundColor: '#8e1e44',
              },
              '&.Mui-disabled': {
                backgroundColor: 'rgba(179, 38, 86, 0.12)',
              },
              height: '48px',
            }}
          >
            {wizardStep == 1 ? 'Next' : 'Take Selfie'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Wizard;
