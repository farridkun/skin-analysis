import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

const TagButtons = ({ skinConditions, skinType }) => {
  const navigate = useNavigate();

  const onClickTag = () => {
    navigate('/products');
  }

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
          src={skinType.icon}
          style={{
            width: '10px',
            height: '10px',
            right: 10,
            position: 'relative',
          }}
        />
        <Typography sx={{ fontSize: 10 }}>{skinType.label}</Typography>
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
  const skinConditionName = skinConditions.map(condition => condition.label)
    .reduce((acc, curr, index, array) => {
      if (index === 0) return curr;
      if (index === array.length - 1) return `${acc} and ${curr}`;
      return `${acc}, ${curr}`;
    }, '');

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
          Based on the results of the facial analysis, your skin condition shows a tendency towards {skinType.label} also {skinConditionName}. Based treatment or basic care is focused on cleaning, moisturizing, protecting, and caring for the skin to keep it healthy and overcome problems that arise. Recommended treatments include regular cleansing, exfoliation as needed, moisturizing to maintain skin balance, and using sunscreen to protect the skin from UV damage. Choosing the right product with active ingredients that suit your skin condition will help improve and maintain optimal skin health.
        </Typography>
      </Box>
    </Modal>
  );
};

export default Summary;
