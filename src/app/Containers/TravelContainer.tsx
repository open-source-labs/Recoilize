import React from 'react';
import MainSlider from '../components/MainSlider';

const TravelContainer: React.FC = () => {
  return (
    <div className="travel-container">
      <button id="slider-start-button">Start</button>
      <MainSlider />
    </div>
  );
};

export default TravelContainer;
