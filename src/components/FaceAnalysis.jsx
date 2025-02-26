import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import Header from './Header';

const API_KEY = import.meta.env.VITE_FACEPP_API_KEY;
const API_SECRET = import.meta.env.VITE_FACEPP_API_SECRET;

const FaceAnalysis = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
  };

  const analyzeImage = async () => {
    setIsLoading(true);
    const blob = await fetch(capturedImage).then((res) => res.blob());
    const formData = new FormData();
    formData.append('api_key', API_KEY);
    formData.append('api_secret', API_SECRET);
    formData.append('image_file', blob);
    formData.append('return_attributes', 'skinstatus,beauty');

    try {
      const response = await axios.post('https://api-us.faceplusplus.com/facepp/v3/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Face++ API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/wizard');
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      height='100vh'
      bgcolor='black'
    >
      <Header handleBack={handleBack} />

      {!capturedImage ? (
        // Webcam View
        <Box position='relative' width='100vw' height='100vh'>
          <Webcam
            ref={webcamRef}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            screenshotFormat='image/jpeg'
            videoConstraints={{ facingMode: 'user' }}
            mirrored={true}
          />

          {/* Capture Button */}
          <Box position='absolute' bottom={30} left='50%' sx={{ transform: 'translateX(-50%)' }}>
            <Button
              variant='contained'
              size='large'
              onClick={captureImage}
              sx={{ borderRadius: '50%', width: 60, height: 60, backgroundColor: '#FF73A5' }}
            >
              📸
            </Button>
          </Box>
        </Box>
      ) : (
        // Captured Image View
        <Box position='relative' width='100vw' height='100vh'>
          <img src={capturedImage} alt='Captured' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Box position='absolute' bottom={30} width='100%' display='flex' justifyContent='center' gap={2}>
            <Button
              variant='outlined'
              color='error'
              size='large'
              onClick={retakeImage}
              sx={{ backgroundColor: '#FFF' }}
            >
              Retake Selfie
            </Button>
            <Button
              variant='contained'
              size='large'
              onClick={analyzeImage}
              disabled={isLoading}
              sx={{ backgroundColor: '#FF73A5' }}
            >
              {isLoading ? <CircularProgress size={24} color='inherit' /> : 'Analyze'}
            </Button>
          </Box>
        </Box>
      )}

      {analysisResult && (
        <Box
          position='absolute'
          top='10%'
          left='50%'
          sx={{ transform: 'translateX(-50%)', bgcolor: 'white', p: 2, borderRadius: 2, boxShadow: 3 }}
          width='90%'
          maxWidth={400}
        >
          <Typography variant='h6'>Analysis Result:</Typography>
          <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
        </Box>
      )}
    </Box>
  );
};

export default FaceAnalysis;
