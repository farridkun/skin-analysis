import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
          {["IG Story", "WhatsApp", "Facebook", "X", "Email", "Copy Link", "Download", "More"].map((label) => (
            <Grid item xs={3} key={label}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ccc',
                  borderRadius: 2,
                  cursor: 'pointer',
                  ':hover': { borderColor: 'black' }
                }}
              >
                <Typography variant="caption" align="center">{label} test</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Modal>
  );
};

export default ShareModal;
