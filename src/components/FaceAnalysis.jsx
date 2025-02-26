import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import hackathonLogo from "../assets/hackathon-2025.png";
import ModalShare from "./ModalShare";
import ModalSummary from "./ModalSummary";
import ModalBestPick from "./BestPickModal";
import { useNavigate } from 'react-router';
import Header from './Header';
import iconCamera from '../assets/icon-camera.png';

const API_KEY = import.meta.env.VITE_FACEPP_API_KEY;
const API_SECRET = import.meta.env.VITE_FACEPP_API_SECRET;

const SKIN_TYPE_MAP = ['Kulit Berminyak', 'Kulit Kering', 'Kulit Normal', 'Kulit Kombinasi'];

const FaceAnalysis = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isShowModalShare, setShowModalShare] = useState(false);
  //show modal summary
  const [isShowModalSummary, setShowModalSummary] = useState(false);
  //show modal bestpick
  const [isShowModalBestPick, setShowModalBestPick] = useState(false);
  //select skin condition
  const [selectedSkinCondition, setSelectedSkinCondition] = useState('Komedo');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [skinType, setSkinType] = useState(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setAnalysisResult(null);
    setSkinType(null);
  };
  
  const analyzeImage = async () => {
    setIsLoading(true);
    const blob = await fetch(capturedImage).then((res) => res.blob());
    const formData = new FormData();
    formData.append('api_key', API_KEY);
    formData.append('api_secret', API_SECRET);
    formData.append('image_file', blob);

    try {
      const response = await axios.post('https://api-us.faceplusplus.com/facepp/v1/skinanalyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysisResult(response.data);

      handleSkinType(response.data);
    } catch (error) {
      console.error('Face++ API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showSummary = () => {
    //
    setShowModalSummary(true)
  };

  const shareImage = async () => {
    setShowModalShare(true)
    //
  };

  const handleSkinType = (result) => {
    const skinTypeArr = Object.values(result.result.skin_type.details);
    const max = skinTypeArr.reduce((prev, current) => (prev && prev.confidence > current.confidence ? prev : current));
    setSkinType(SKIN_TYPE_MAP[max.value]);
  };
  const handleBack = () => {
    navigate('/wizard?step=2');
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
            <img
              src={iconCamera}
              alt='Capture'
              onClick={captureImage}
              style={{ width: 60, height: 60, cursor: 'pointer' }}
            />
          </Box>
        </Box>
      ) : (
        // Captured Image View
        <Box position='relative' width='100vw' height='100vh'>
          <img src={capturedImage} alt='Captured' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Box
            position='absolute'
            bottom={30}
            width='100%'
            display='flex'
            alignItems='center'
            gap={5}
            flexDirection='column'
          >
            {skinType && (
              <Box display='flex' gap={1} flexDirection='column' alignItems='center'>
                <Typography
                  variant='h6'
                  sx={{
                    color: '#FF73A5',
                    textShadow: '1px 1px 0 #FFF, -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF',
                    letterSpacing: '0.1em',
                  }}
                >
                  Skin Type:
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    color: '#FF73A5',
                    textShadow: '1px 1px 0 #FFF, -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF',
                    fontWeight: 'bold',
                    letterSpacing: '0.01em',
                  }}
                >
                  {skinType}
                </Typography>
              </Box>
            )}
            <Box display='flex' gap={2} width='100%' maxWidth={400} px={2}>
              <Button
                variant='outlined'
                color='black'
                size='large'
                onClick={analysisResult ? showSummary : retakeImage}
                sx={{
                  flex: 1,
                  backgroundColor: analysisResult ? '#FEE9E7' : '#FFF',
                  textTransform: 'none',
                }}
              >
                {analysisResult ? 'Summary' : 'Retake Selfie'}
              </Button>
              <Button
                variant='contained'
                size='large'
                onClick={analysisResult ? shareImage : analyzeImage}
                disabled={isLoading}
                sx={{
                  flex: 1,
                  backgroundColor: '#EB395F',
                  textTransform: 'none',
                }}
              >
                {isLoading ? <CircularProgress size={24} color='inherit' /> : analysisResult ? 'Share' : 'Analyze'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* {analysisResult && (
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
      )} */}

    {isShowModalShare && (
        <ModalShare open={isShowModalShare} onClose={()=> setShowModalShare(false)} />
      )}

      {isShowModalSummary && (
        <ModalSummary open={isShowModalSummary} onClose={()=> setShowModalSummary(false)} />
      )}

      {isShowModalBestPick &&(
        <ModalBestPick open={isShowModalBestPick} onClose={()=> setShowModalBestPick(false)} skinCondition={selectedSkinCondition} />
      )}
      
    </Box>
  );
};

export default FaceAnalysis;
