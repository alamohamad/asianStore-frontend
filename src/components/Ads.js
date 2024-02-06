import React, { useState, useEffect } from 'react';

const Ads = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    //auto change the slide every 3 seconds 
    const intervalId = setInterval(nextSlide, 3000);

    // to clear the interval when the component is unmounted (when states changes or leaving page)
    return () => clearInterval(intervalId);
  }, [currentIndex, images.length]);

  return (
    <div className="slider-container col-12 col-lg-8">
      <button className='slideButton leftButton' onClick={prevSlide}> <i className='fa fa-toggle-left slidesToggle '/></button>
      
      <img 
        src={images[currentIndex]}
        alt={`not found`}
        className="slider-image col-12 box-shadow"/>
      <button  className='slideButton rightButton' onClick={nextSlide}><i className='fa fa-toggle-right slidesToggle'/></button>
    </div>
  );
};

export default Ads;