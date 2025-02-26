import React, { useState } from "react";

import { Modal, Box, Typography, Button, Grid,  } from '@mui/material';


import ratingStar from "../assets/Star.png";
import icon_checkbox from "../assets/icon_checkbox.png";
import icon_checkbox_unselected from "../assets/unselected.png";

import { useNavigate } from 'react-router';
const SKIN_TYPE_MAP = ['Kulit Berminyak', 'Kulit Kering', 'Kulit Normal', 'Kulit Kombinasi'];

const productsDummy = [
  {
    category: "Toner",
    brand: "Anua",
    productName: "Rice 70 Glow Milky Toner",
    normalPrice: "Rp449,000",
    discountPrice: "Rp249,000",
    rating: '4.3',
    skinConcern: "Pori Besar",
    skinType: 'Kulit Berminyak',
    image: 'https://images.soco.id/81e89bb3-2999-44de-bb1b-980f25e5fa3d-image-0-1733816188297'
    
  },
  {
    category: "Toner",
    brand: "Rose All Day",
    productName: "SKINFIX+ Acne & Barrier Treatment Toner",
    normalPrice: "Rp129,000",
    discountPrice: "Rp83,850",
    rating: '4.4',
    skinConcern: "Flek",
    skinType: 'Kulit Berminyak',
    image: 'https://images.soco.id/81360b91-b5ae-4fdc-a73a-2df598b74659-image-0-1733393412183'


  },
  {
    category: "Toner",
    brand: "AYOM",
    productName: "Skin Refreshment Toner",
    normalPrice: "Rp180,000",
    discountPrice: null,
    rating: '5.0',
    skinConcern: "Jerawat",
    total_review: '10',
    skinType: 'Kulit Berminyak',
image: 'https://images.soco.id/723bda2e-f6ff-4d33-9dac-f6f90b90dbbb-image-0-1721639191148'

  },
  {
    category: "Toner",
    brand: "Labore",
    productName: "Sensitive Skin Care AcnePro Biome Micro Exfoliating Gentle Toner",
    normalPrice: "Rp179,000",
    discountPrice: null,
    rating: '5.0',
    skinConcern: "Komedo",
    skinType: 'Kulit Kering',
    total_review: '1',

    image: 'https://images.soco.id/e3d86af3-f0c2-49b3-9de2-4a816b95c95a-image-0-1720494043085'
    
  },
  {
    category: "Toner",
    brand: "Dr.G",
    productName: "R.E.D Blemish For Men Multi Soothing Toner",
    normalPrice: "Rp389,000",
    discountPrice: "Rp252,850",
    rating:"4.8",
    skinConcern: "Flek",
    skinType: 'Kulit Kering',
    total_review: '41',

    image: 'https://images.soco.id/d72221a4-328c-48a6-a079-f6472c16dc52-image-0-1722253336528'


  },
  {
    category: "Face Serum",
    brand: "Skintific",
    productName: "Radiance Booster Serum Spray",
    normalPrice: "Rp143,200",
    discountPrice: null,
    rating: '4.7',
    skinConcern: "Pori Besar",
    skinType: 'Kulit Kering',
    total_review: '5',

    image: 'https://images.soco.id/0c0a9958-68ab-4444-b844-d79d35fea9f0-image-0-1737347341351'


  },
  {
    category: "Face Serum",
    brand: "Innisfree",
    productName: "Retinol Green Tea PDRN Ampoule",
    normalPrice: "Rp545,000",
    discountPrice: null,
    rating: '4.9',
    skinConcern: "Pori Besar",
    skinType: 'Kulit Normal',
    total_review: '8',
    image: 'https://images.soco.id/3c54d432-1220-47d0-a16e-30969a459c32-image-0-1734074110464'


  },
  {
    category: "Face Serum",
    brand: "Trueve",
    productName: "Niacinamax Dark Spot Serum",
    normalPrice: "Rp155,000",
    discountPrice: "Rp120,900",
    rating: '5.0',
    skinConcern: "Flek",
    skinType: 'Kulit Normal',
    total_review: '88',

    image: 'https://images.soco.id/7d478d5e-453f-457e-bd19-b71dd6d14604-image-0-1731987863998'

  },
  {
    category: "Face Serum",
    brand: "Focalskin",
    productName: "Brightening Serum",
    normalPrice: "Rp299,000",
    discountPrice: "Rp104,650",
    rating: '4.3',
    skinConcern: "Komedo",
    skinType: 'Kulit Normal',
    total_review: '3',
    
    image: 'https://images.soco.id/ea25e8bb-f562-44fc-bd0f-fdb1cafc100e-image-0-1727842989542'


  },
 
  
  {
    category: "Face Cream",
    brand: "Skintific",
    productName: "Sensitive Moisture Gel",
    normalPrice: "Rp165,400",
    discountPrice: null,
    rating: '4.6',
    skinConcern: "Pori Besar",
    skinType: 'Kulit Kombinasi',
    total_review: '7',
    image: 'https://images.soco.id/86495363-cfa7-4229-93fd-93a4ee2ef9b7-image-0-1737347310768'

  },
  {
    category: "Face Cream",
    brand: "Bio Beauty Lab",
    productName: "Acne Barrier Hydro Moisturizer",
    normalPrice: "Rp240,000",
    discountPrice: "Rp204,000",
    rating: '4.3',
    skinConcern: "Jerawat",
    skinType: 'Kulit Kombinasi',
    total_review: '2',
    image: 'https://images.soco.id/745e2553-bfb7-415b-a905-9e479436a009-image-0-1734407308431',

  },
];


const BestPicksModal = ({ open, onClose, skinCondition }) => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate('/products');
  };

  const filterBySkinType = (skinType) => {
    return productsDummy.filter(product => product.skinConcern === skinCondition);
  };

  const [selectedItems, setSelectedItems] = useState('');

  const handleCheckboxChange = (productName) => {
    setSelectedItems((prev) =>
      prev.includes(productName) ? prev.filter((item) => item !== productName) : [...prev, productName]
    );
  };
  

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
        {filterBySkinType(skinCondition).map((item, index) => (
          <>
          
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }} onClick={()=>handleCheckboxChange(item.productName)}>
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
              <Typography variant="body2" color="textSecondary"  sx={{width:140}}>{item.productName}</Typography>
              <Box display="flex" flexDirection="row" >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#D32F2F' }}>{item.discountPrice}</Typography>
                <Typography variant="body2" sx={{  marginLeft:1 ,  color:'grey', fontSize:12, top:1,position: 'relative',  textDecorationLine: 'line-through',
                  }}>{item.normalPrice}
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
              }}>{item.rating}</Typography> 

{item?.total_review &&
(
<Typography variant="body2" sx={{  marginLeft:0.5 ,  color:'grey', fontSize:12, top:1,position: 'relative',
              }}>({item.total_review})</Typography> 
)
}
                        
            </Box> 
                    
            </Box>
            <Box display='flex'  sx={{alignContent: 'flex-end', flexDirection:'row'}}>
              {selectedItems.includes(item.productName) ? (
                <img
                                        src={icon_checkbox}
                                        style={{
                                          width: "24px",
                                          height: "24px",
                                          marginLeft:80,
                                          bottom:25,
                                          position: 'relative'
                                        }}
                                      />
              ): 
              <img
                                        src={icon_checkbox_unselected}
                                        style={{
                                          width: "24px",
                                          height: "24px",
                                          marginLeft:80,
                                          bottom:25,
                                          position: 'relative'
                                        }}
                                      />
              }
          
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
              handleSeeAll()
            }}
            fullWidth variant="contained" color="secondary" sx={{ bgcolor: '#D32F2F',              backgroundColor: '#EB395F',
            }}
          >
              SEE ALL
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default BestPicksModal;
