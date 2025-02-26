import React from 'react';
import { Modal, Box, Typography, Button, Grid,  } from '@mui/material';
import product1 from "../assets/product_1_dummy.png";
import product2 from "../assets/product_2_dummy.png";
import product3 from "../assets/product_3_dummy.png";
import ratingStar from "../assets/Star.png";

const productBestPickList=[{
    name: "Pink AHABHA Serum",
    brand: "NACIFIC",
    price_after_discount: "Rp70.315",
    price: "Rp200.900",
    ratings: '4.6',
    total_review: 45,
    image: product1
},
{
    name: "Gentle Skin Cleanser",
    brand: "CETAPHIL",
    price_after_discount: "Rp404.000",
    price: "Rp343.740",
    ratings: '4.4',
    total_review: '16.1k',
    image: product2
},
{
    name: "Volcano 3D Acid Pore Mask",
    brand: "GLAD2GLOW",
    price_after_discount: "Rp31.000",
    price: "Rp39.000",
    ratings: '4.8',
    total_review: '133',
    image: product3

}]
const BestPicksModal = ({ open, onClose, skinCondition }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 400,
          bgcolor: 'transparent',
          borderRadius: 3,
          boxShadow: 24,
        }}
      >
       

    <Box sx={{
          bgcolor: 'white',
          p:3,
          borderRadius: 3,
    }}>
         <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#8B2D56' }}>
          Best Picks for {skinCondition}
        </Typography>
        {productBestPickList.map((item, index) => (
          <>
          
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img
                          src={item.image}
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight:15
                          }}
                        />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{item.brand}</Typography>
              <Typography variant="body2" color="textSecondary">{item.name}</Typography>
              <Box display="flex" flexDirection="row" >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#D32F2F' }}>{item.price_after_discount}</Typography>
                <Typography variant="body2" sx={{  marginLeft:1 ,  color:'grey', fontSize:12, top:1,position: 'relative',  textDecorationLine: 'line-through',
                  }}>{item.price}
                </Typography>
            </Box>  

             <Box display="flex" flexDirection="row" >
                      <img
                          src={ratingStar}
                          style={{
                            width: "10px",
                            height: "10px",
                            position: 'relative',
                            top:3
                          }}
                        />   

            <Typography variant="body2" sx={{  marginLeft:1 ,  fontSize:13,position: 'relative', fontWeight: 'bold'
              }}>{item.ratings}</Typography> 

                        <Typography variant="body2" sx={{  marginLeft:0.5 ,  color:'grey', fontSize:12, top:1,position: 'relative',
              }}>({item.total_review})</Typography> 
            </Box> 
                    
            </Box>
          </Box>
          
          </>
          
        ))}
    </Box>


        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
          <Button 
          onClick={() => {
            onClose()
          }}
            fullWidth 
            variant="outlined" 
            sx={{ fontSize: 10, textTransform: 'none',paddingTop:1.5, paddingBottom:1.5, backgroundColor:'white',borderColor:'black' }}
            >
                <Typography variant="body2" color="textSecondary" sx={{ fontSize:"11px" ,color: 'black' }}>SAVE TO COLLECTION</Typography>

        </Button>       
           </Grid>
          <Grid item xs={6}>
            <Button
            onClick={() => {
              onClose()
            }}
            fullWidth variant="contained" color="secondary" sx={{ bgcolor: '#D32F2F' }}>
              SEE ALL
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BestPicksModal;
