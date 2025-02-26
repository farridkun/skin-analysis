import React from 'react';
import { useNavigate } from 'react-router';
import homepageScreen from '../assets/homepage.png';

const Homepage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/wizard');
  };
  return (
    <div>
      <img src={homepageScreen} alt='' width={'100%'} onClick={handleClick} />
    </div>
  );
};

export default Homepage;
