/* eslint-disable no-unused-vars */
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ModalShare from "./ModalShare";
import ModalSummary from "./ModalSummary";
import ModalBestPick from "./BestPickModal";
import { useNavigate } from 'react-router';
import Header from './Header';
import iconCamera from '../assets/icon-camera.png';
import { SKIN_CONDITION_MAP, SKIN_TYPE_MAP } from "../constants/constant";
import iconPori from '../assets/PORI.png';
import iconKomedo from '../assets/KOMEDO.png';
import iconJerawat from '../assets/JERAWAT.png';
import iconFlex from '../assets/FLEK.png';
import ReactConfetti from "react-confetti";

const API_KEY = import.meta.env.VITE_FACEPP_API_KEY;
const API_SECRET = import.meta.env.VITE_FACEPP_API_SECRET;

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
  const [skinConditions, setSkinConditions] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

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
      handleSkinConditions(response.data);

      setIsFinished(true);
    } catch (error) {
      setIsError(true);
      console.error('API Error:', error);
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
    setSkinType(result.result.skin_type.skin_type);
  };

  const handleSkinConditions = (result) => {
    const data = result.result;
    const tempSkinConditions = [];
    for (const [key, value] of Object.entries(data)) {
      if (['acne', 'blackhead', 'skin_spot'].includes(key)) {
        if (value.value == 1) {
          tempSkinConditions.push(value.name)
        }
      }
      if (['pores_left_cheek', 'pores_forehead', 'pores_jaw', 'pores_right_cheek'].includes(key)) {
        if (value.value == 1) {
          tempSkinConditions.push('pores')
        }
      }
    }
    const uniqueSkinConditions = [...new Set(tempSkinConditions)];
    setSkinConditions(uniqueSkinConditions.map(sc => SKIN_CONDITION_MAP[sc]));
  }

  const handleBack = () => {
    navigate('/wizard?step=2');
  };

  const hasNonZeroValue = (values) => {
    return values.some(value => value > 0);
  };

  const renderMaskingIcon = (skinCondition) => (
    <Box
      sx={{
        position: 'absolute',
        ...skinCondition.top && { top: skinCondition.top },
        ...skinCondition.bottom && { bottom: skinCondition.bottom },
        ...skinCondition.left && { left: skinCondition.left },
        ...skinCondition.right && { right: skinCondition.right },
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src={skinCondition.img}
        alt={skinCondition.name}
        style={{ width: 100, height: 120, cursor: 'pointer' }}
        onClick={()=> {
          setSelectedSkinCondition(skinCondition.name);
          setShowModalBestPick(true);
        }}
      />
    </Box>
  )

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
          {isFinished ? (
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              colors={['#EB395F', '#FF73A5', '#FEE9E7']}
            />
          ) : <></>}

          <img src={capturedImage} alt='Captured' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          {analysisResult ? (
        <>
          {hasNonZeroValue([
            analysisResult.result.pores_jaw.value, 
            analysisResult.result.pores_forehead.value, 
            analysisResult.result.pores_left_cheek.value, 
            analysisResult.result.pores_right_cheek.value
          ]) && renderMaskingIcon({top: '25%', left: '30%', img: iconKomedo, name: 'Komedo'})}
          
          {hasNonZeroValue([
            analysisResult.result.blackhead.value, 
            analysisResult.result.dark_circle.value
          ]) && renderMaskingIcon({top: '35%', right: '-10%', img: iconPori, name: 'Pori'})}
          
          {hasNonZeroValue([
            analysisResult.result.acne.value, 
            analysisResult.result.skin_spot.value
          ]) && renderMaskingIcon({top: '35%', left: '25%', img: iconJerawat, name: 'Jerawat'})}
          
          {hasNonZeroValue([
            analysisResult.result.glabella_wrinkle.value, 
            analysisResult.result.mole.value
          ]) && renderMaskingIcon({top: '25%', right: '0%', img: iconFlex, name: 'Flek'})}
        </>
      ) : <></>}

          {isError && (
            <Box
              position='absolute'
              top='10%'
              left='50%'
              sx={{ transform: 'translateX(-50%)', bgcolor: 'white', p: 2, borderRadius: 2, boxShadow: 3 }}
              width='90%'
              maxWidth={400}
            >
              <Typography variant='h6'>Error:</Typography>
              <Typography variant='body1'>Something went wrong, please try again later.</Typography>
            </Box>
          )}

          {/* Analysis Button */}
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
                  {SKIN_TYPE_MAP[skinType].label}
                </Typography>
              </Box>
            )}
            <Box display='flex' gap={2} width='100%' maxWidth={400} px={2}>
              <Button
                variant='outlined'
                color='black'
                size='large'
                disabled={isLoading}
                onClick={analysisResult ? showSummary : retakeImage}
                sx={{
                  flex: 1,
                  backgroundColor: analysisResult ? '#FEE9E7' : '#FFF',
                  textTransform: 'none',
                }}
              >
                {isLoading ? <CircularProgress size={24} color='inherit' /> : analysisResult ? 'Summary' : 'Retake Selfie'}
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
        <ModalSummary open={isShowModalSummary} onClose={()=> setShowModalSummary(false)} skinConditions={skinConditions} skinType={skinType} />
      )}

      {isShowModalBestPick &&(
        <ModalBestPick open={isShowModalBestPick} onClose={()=> setShowModalBestPick(false)} skinCondition={selectedSkinCondition} />
      )}
      
    </Box>
  );
};

export default FaceAnalysis;
