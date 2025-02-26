import React from 'react';
import { Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import jerawat from "../assets/jerawat.png";
import flek from "../assets/flek.png";
import komedo from "../assets/komedo.png";
import pori from "../assets/pori.png";


const tags = [
  { label: 'Komedo', icon: komedo },
  { label: 'jerawat', icon: jerawat },
  { label: 'Flek', icon: flek },
  { label: 'Pori Besar', icon: pori }

];

const TagButtons = () => {
  return (
    <Box display="flex" gap={2}>
      {tags.map((tag, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#F384A7',
            color: 'white',
            px: 2,
            py: 1,
            borderRadius: '20px',
            fontSize: 1,
            paddingTop:0.5,
            paddingBottom:0.5,
            marginBottom:2,
            marginTop:2
          }}
        >
          <Typography>{tag.emoji}</Typography>
           <img
                                    src={tag.icon}
                                    style={{
                                      width: "10px",
                                      height: "10px",
                                      right:10,
                                      position:'relative'
                                    }}
                                  />  
          <Typography sx={{fontSize:10}}>{tag.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};


const Summary = ({ open, onClose, skinConditions}) => {
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
        borderTopLeftRadius: 3,
        borderTopLeftRadius:3,
        p: 3,
        boxShadow: 24,
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Summary</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TagButtons/>
        <Typography variant="body2" sx={{ mt: 1, mb: 2, fontSize: 14 }}>
            Berdasarkan hasil analisis wajah, kondisi kulit Anda menunjukkan kecenderungan lebih dominan terhadap masalah flek dan komedo. Persentase flek pada kulit Anda mencapai 60%, sementara komedo sebesar 40%. Hal ini menunjukkan bahwa perawatan utama sebaiknya difokuskan pada mengatasi flek dengan penggunaan produk pencerah, perlindungan dari sinar matahari, serta bahan aktif seperti vitamin C, niacinamide, atau alpha arbutin. Selain itu, perawatan untuk mengatasi komedo juga penting agar pori-pori tetap bersih dan tidak tersumbat, seperti rutin melakukan eksfoliasi ringan serta menggunakan produk berbahan aktif seperti salicylic acid atau clay mask untuk membersihkan pori-pori secara mendalam.
        </Typography>
       
      </Box>
    </Modal>
  );
};

export default Summary;
