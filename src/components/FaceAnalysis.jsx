import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import hackathonLogo from "../assets/hackathon-2025.png";
import ModalShare from "./ModalShare";
import ModalSummary from "./ModalSummary";
import ModalBestPick from "./BestPickModal";

const API_KEY = import.meta.env.VITE_FACEPP_API_KEY;
const API_SECRET = import.meta.env.VITE_FACEPP_API_SECRET;

const FaceAnalysis = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isShowModalShare, setShowModalShare] = useState(false);
  //show modal summary
  const [isShowModalSummary, setShowModalSummary] = useState(false);
  //show modal bestpick
  const [isShowModalBestPick, setShowModalBestPick] = useState(true);
  //select skin condition
  const [selectedSkinCondition, setSelectedSkinCondition] = useState('Komedo');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    formData.append("api_key", API_KEY);
    formData.append("api_secret", API_SECRET);
    formData.append("image_file", blob);
    formData.append("return_attributes", "skinstatus,beauty");

    try {
      const response = await axios.post(
        "https://api-us.faceplusplus.com/facepp/v3/detect",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setAnalysisResult(response.data);
    } catch (error) {
      console.error("Face++ API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMobile) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
        p={3}
      >
        <Typography variant="h6" color="error">
          This application is only accessible on mobile devices. Please use a mobile device to continue.
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="black">
      {!capturedImage ? (
        // Webcam View
        <Box position="relative" width="100vw" height="100vh">
          <Box
            position="absolute"
            top={20}
            left="50%"
            sx={{
              transform: "translateX(-50%)",
              zIndex: 1,
              width: "150px", 
            }}
          >
            <img
              src={hackathonLogo}
              alt="Hackathon Logo"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>
          <Webcam
            ref={webcamRef}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
          />
          <Box position="absolute" bottom={30} left="50%" sx={{ transform: "translateX(-50%)" }}>
            <Button
              variant="contained"
              size="large"
              onClick={captureImage}
              sx={{ borderRadius: "50%", width: 60, height: 60, backgroundColor: "#FF73A5" }}
            >
              📸
            </Button>
          </Box>
        </Box>
      ) : (
        // Captured Image View
        <Box position="relative" width="100vw" height="100vh">
          <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <Box position="absolute" bottom={30} width="100%" display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" color="error" size="large" onClick={retakeImage} sx={{ backgroundColor: '#FFF' }}>
              Retake
            </Button>
            <Button variant="contained" size="large" onClick={analyzeImage} disabled={isLoading} sx={{ backgroundColor: '#FF73A5'}}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Analyze"}
            </Button>
          </Box>
        </Box>
      )}

      {analysisResult && (
        <Box
          position="absolute"
          top="10%"
          left="50%"
          sx={{ transform: "translateX(-50%)", bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 3 }}
          width="90%"
          maxWidth={400}
        >
          <Typography variant="h6">Analyfffsis Result:</Typography>
          <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(analysisResult, null, 2)}
          </pre>
        </Box>
      )}

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
