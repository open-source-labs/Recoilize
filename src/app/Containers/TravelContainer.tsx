import React from 'react';
import MainSlider from '../components/MainSlider';
import ButtonsContainer from './ButtonsContainer';

const TravelContainer: React.FC = () => {
  return (
    <div className="travel-container">
      <MainSlider />
      <ButtonsContainer />
    </div>
  );
};

export default TravelContainer;
