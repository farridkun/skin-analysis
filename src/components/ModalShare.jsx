import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import share_icons from "../assets/share_icons.png";
import { useNavigate } from 'react-router';

const ShareModal = ({ open, onClose }) => {
    const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/share');
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 3,
        borderTopLeftRadius:3,
        p: 3,
        boxShadow: 24,
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{right:8, position: 'relative'}}>Share</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2} justifyContent="center">
        <img
              src={share_icons}
              onClick={handleClick}
              alt="Hackathon Logo"
              style={{
                width: "95%",
                height: "auto",
                marginTop:30
              }}
            />
        </Grid>
      </Box>
    </Modal>
  );
};

export default ShareModal;
