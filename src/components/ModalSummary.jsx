import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Summary = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'white',
        borderRadius: 3,
        p: 3,
        boxShadow: 24,
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Summary</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, mb: 2, fontSize: 14 }}>
            Berdasarkan hasil analisis wajah, kondisi kulit Anda menunjukkan kecenderungan lebih dominan terhadap masalah flek dan komedo. Persentase flek pada kulit Anda mencapai 60%, sementara komedo sebesar 40%. Hal ini menunjukkan bahwa perawatan utama sebaiknya difokuskan pada mengatasi flek dengan penggunaan produk pencerah, perlindungan dari sinar matahari, serta bahan aktif seperti vitamin C, niacinamide, atau alpha arbutin. Selain itu, perawatan untuk mengatasi komedo juga penting agar pori-pori tetap bersih dan tidak tersumbat, seperti rutin melakukan eksfoliasi ringan serta menggunakan produk berbahan aktif seperti salicylic acid atau clay mask untuk membersihkan pori-pori secara mendalam.
        </Typography>
       
      </Box>
    </Modal>
  );
};

export default Summary;
