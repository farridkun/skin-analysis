import React from 'react';
import { Modal, Box, Typography, Button, Grid,  } from '@mui/material';
import product1 from "../assets/product_1_dummy.png";
import product2 from "../assets/product_2_dummy.png";
import product3 from "../assets/product_3_dummy.png";
import ratingStar from "../assets/Star.png";
import icon_checkbox from "../assets/icon_checkbox.png";
import { useNavigate } from 'react-router';

const productsDummy = [
  {
    category: "Toner",
    brand: "Anua",
    productName: "Rice 70 Glow Milky Toner",
    normalPrice: "Rp449,000",
    discountPrice: "Rp249,000",
    rating: 4.3,
    skinConcern: "Pori Besar"
  },
  {
    category: "Toner",
    brand: "Rose All Day",
    productName: "SKINFIX+ Acne & Barrier Treatment Toner",
    normalPrice: "Rp129,000",
    discountPrice: "Rp83,850",
    rating: 4.4,
    skinConcern: "Flek"
  },
  {
    category: "Toner",
    brand: "AYOM",
    productName: "Skin Refreshment Toner",
    normalPrice: "Rp180,000",
    discountPrice: null,
    rating: 5.0,
    skinConcern: "Jerawat"
  },
  {
    category: "Toner",
    brand: "Labore",
    productName: "Sensitive Skin Care AcnePro Biome Micro Exfoliating Gentle Toner",
    normalPrice: "Rp179,000",
    discountPrice: null,
    rating: 5.0,
    skinConcern: "Komedo"
  },
  {
    category: "Toner",
    brand: "Dr.G",
    productName: "R.E.D Blemish For Men Multi Soothing Toner",
    normalPrice: "Rp389,000",
    discountPrice: "Rp252,850",
    rating: 4.8,
    skinConcern: "Flek"
  },
  {
    category: "Face Serum",
    brand: "Skintific",
    productName: "Radiance Booster Serum Spray",
    normalPrice: "Rp143,200",
    discountPrice: null,
    rating: 4.7,
    skinConcern: "Pori Besar"
  },
  {
    category: "Face Serum",
    brand: "Innisfree",
    productName: "Retinol Green Tea PDRN Ampoule",
    normalPrice: "Rp545,000",
    discountPrice: null,
    rating: 4.9,
    skinConcern: "Pori Besar"
  },
  {
    category: "Face Serum",
    brand: "Trueve",
    productName: "Niacinamax Dark Spot Serum",
    normalPrice: "Rp155,000",
    discountPrice: "Rp120,900",
    rating: 5.0,
    skinConcern: "Flek"
  },
  {
    category: "Face Serum",
    brand: "Focalskin",
    productName: "Brightening Serum",
    normalPrice: "Rp299,000",
    discountPrice: "Rp104,650",
    rating: 4.3,
    skinConcern: "Komedo"
  },
  {
    category: "Face Serum",
    brand: "Numbuzin",
    productName: "No.1 Glossy Essence Serum",
    normalPrice: "Rp450,000",
    discountPrice: "Rp270,000",
    rating: 5.0,
    skinConcern: "Jerawat"
  },
  {
    category: "Face Cream",
    brand: "Innisfree",
    productName: "My Melody - Green Tea Seed Hyaluronic Cream",
    normalPrice: "Rp389,000",
    discountPrice: null,
    rating: 4.9,
    skinConcern: "Flek"
  },
  {
    category: "Face Cream",
    brand: "Skintific",
    productName: "Sensitive Moisture Gel",
    normalPrice: "Rp165,400",
    discountPrice: null,
    rating: 4.6,
    skinConcern: "Pori Besar"
  },
  {
    category: "Face Cream",
    brand: "Bio Beauty Lab",
    productName: "Acne Barrier Hydro Moisturizer",
    normalPrice: "Rp240,000",
    discountPrice: "Rp204,000",
    rating: 4.3,
    skinConcern: "Jerawat"
  },
  {
    category: "Face Cream",
    brand: "Axis-Y",
    productName: "Dark Spot Correcting Glow Cream",
    normalPrice: "Rp378,000",
    discountPrice: "Rp195,000",
    rating: 5.0,
    skinConcern: "Flek"
  },
  {
    category: "Face Cream",
    brand: "ABIB",
    productName: "Heartleaf Crème Calming Tube",
    normalPrice: "Rp490,000",
    discountPrice: "Rp294,000",
    rating: 4.9,
    skinConcern: "Komedo"
  },
  {
    category: "Sunscreen",
    brand: "Beauty of Joseon",
    productName: "Sunscreen Aqua-fresh: Rice + B5",
    normalPrice: "Rp280,000",
    discountPrice: null,
    rating: 4.7,
    skinConcern: "Pori Besar"
  },
  {
    category: "Sunscreen",
    brand: "Innisfree",
    productName: "Green Tea Hyaluronic Moist Sun Serum SPF50+ PA++++",
    normalPrice: "Rp187,000",
    discountPrice: "Rp140,250",
    rating: 5.0,
    skinConcern: "Jerawat"
  },
  {
    category: "Sunscreen",
    brand: "ABIB",
    productName: "Airy Sunstick Smoothing Bar",
    normalPrice: "Rp390,000",
    discountPrice: "Rp234,000",
    rating: 4.6,
    skinConcern: "Komedo"
  },
  {
    category: "Sunscreen",
    brand: "From This Island",
    productName: "White Tea Ultra Light Protective Sun Serum",
    normalPrice: "Rp179,000",
    discountPrice: null,
    rating: 4.1,
    skinConcern: "Flek"
  },
  {
    category: "Sunscreen",
    brand: "Numbuzin",
    productName: "No.1 Clear Filter Sun Essence 50ml SPF50+ PA++++",
    normalPrice: "Rp390,000",
    discountPrice: "Rp234,000",
    rating: 4.8,
    skinConcern: "Pori Besar"
  }
];

const productBestPickList=[{
    name: "Pink AHABHA Serum",
    brand: "NACIFIC",
    discountPrice: "Rp70.315",
    normalPrice: "Rp200.900",
    ratings: '4.6',
    total_review: 45,
    image: product1
},
{
    name: "Gentle Skin Cleanser",
    brand: "CETAPHIL",
    discountPrice: "Rp404.000",
    normalPrice: "Rp343.740",
    ratings: '4.4',
    total_review: '16.1k',
    image: product2
},
{
    name: "Volcano 3D Acid Pore",
    brand: "GLAD2GLOW",
    discountPrice: "Rp31.000",
    normalPrice: "Rp39.000",
    ratings: '4.8',
    total_review: '133',
    image: product3

}]
const BestPicksModal = ({ open, onClose, skinCondition }) => {
  const navigate = useNavigate();

  const handleSeeAll = () => {
    navigate('/products');
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
              <Typography variant="body2" color="textSecondary"  sx={{width:140}}>{item.name}</Typography>
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
              }}>{item.ratings}</Typography> 

                        <Typography variant="body2" sx={{  marginLeft:0.5 ,  color:'grey', fontSize:12, top:1,position: 'relative',
              }}>({item.total_review})</Typography> 
            </Box> 
                    
            </Box>
            <Box display='flex'  sx={{alignContent: 'flex-end', flexDirection:'row'}}>

            <img
                          src={icon_checkbox}
                          style={{
                            width: "20px",
                            height: "20px",
                            marginLeft:80,
                            bottom:25,
                            position: 'relative'
                          }}
                        />
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
