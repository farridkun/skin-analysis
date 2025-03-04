import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Typography, Box, Button, Stack, CircularProgress, Backdrop } from '@mui/material';
import logo from '../assets/logo.jpeg';
import NoticeConsent from './NoticeConsent';
import Header from './Header';

const SELFIE_INSTRUCTIONS = [
  'Remove makeup and take off glasses/mask.',
  'Make sure your hair does not cover your face.',
  'Look straight at the camera with a relaxed expression.',
  'Ensure the room is well-lit.',
];

const Wizard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [consent, setConsent] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('step')) {
      setWizardStep(searchParams.get('step'));
    }
  }, [searchParams]);

  const isButtonDisabled = useMemo(() => {
    if (isLoading) {
      return true;
    }

    if (wizardStep == 2) {
      return false;
    }

    if (!consent) {
      return true;
    }
  }, [isLoading, consent, wizardStep]);

  const handleNext = async () => {
    if (wizardStep == 1) {
      setIsLoading(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
        });

        stream.getTracks().forEach((track) => track.stop());
        setWizardStep(2);
        setSearchParams({
          step: 2,
        });
        setConsent(false);
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
      <Header handleBack={handleBack} />

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
            disabled={isButtonDisabled}
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
