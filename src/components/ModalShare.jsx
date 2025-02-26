import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import share_icons from "../assets/share_icons.png";

const ShareModal = ({ open, onClose }) => {
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
        borderRadius: 3,
        p: 3,
        boxShadow: 24,
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Share</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, mb: 2, fontSize: 14 }}>
          Bagikan pengalaman menggunakan produk kecantikan dan personal care ini ke teman-temanmu!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
        <img
              src={share_icons}
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
