import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SKIN_TYPE_MAP } from '../constants/constant';
import { useNavigate } from 'react-router';

const TagButtons = ({ skinConditions, skinType }) => {
  const navigate = useNavigate();

  const onClickTag = () => {
    navigate('/products');
  }

  const skinTypeResult = SKIN_TYPE_MAP[skinType]

  return (
    <Box display='flex' gap={2}>
      <Box
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
          paddingTop: 0.5,
          paddingBottom: 0.5,
          marginBottom: 2,
          marginTop: 2,
        }}
        onClick={onClickTag}
      >
        <img
          src={skinTypeResult.icon}
          style={{
            width: '10px',
            height: '10px',
            right: 10,
            position: 'relative',
          }}
        />
        <Typography sx={{ fontSize: 10 }}>{skinTypeResult.label}</Typography>
      </Box>
      {skinConditions.map((tag, index) => (
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
            paddingTop: 0.5,
            paddingBottom: 0.5,
            marginBottom: 2,
            marginTop: 2,
          }}
          onClick={onClickTag}
        >
          <img
            src={tag.icon}
            style={{
              width: '10px',
              height: '10px',
              right: 10,
              position: 'relative',
            }}
          />
          <Typography sx={{ fontSize: 10 }}>{tag.label}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const Summary = ({ open, onClose, skinConditions, skinType }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'white',
          borderTopLeftRadius: 3,
          borderTopLeftRadius: 3,
          p: 3,
          boxShadow: 24,
        }}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>Summary</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TagButtons skinConditions={skinConditions} skinType={skinType} />
        <Typography variant='body2' sx={{ mt: 1, mb: 2, fontSize: 14 }}>
          Berdasarkan hasil analisis wajah, kondisi kulit Anda menunjukkan kecenderungan lebih dominan terhadap masalah
          flek dan komedo. Persentase flek pada kulit Anda mencapai 60%, sementara komedo sebesar 40%. Hal ini
          menunjukkan bahwa perawatan utama sebaiknya difokuskan pada mengatasi flek dengan penggunaan produk pencerah,
          perlindungan dari sinar matahari, serta bahan aktif seperti vitamin C, niacinamide, atau alpha arbutin. Selain
          itu, perawatan untuk mengatasi komedo juga penting agar pori-pori tetap bersih dan tidak tersumbat, seperti
          rutin melakukan eksfoliasi ringan serta menggunakan produk berbahan aktif seperti salicylic acid atau clay
          mask untuk membersihkan pori-pori secara mendalam.
        </Typography>
      </Box>
    </Modal>
  );
};

export default Summary;
