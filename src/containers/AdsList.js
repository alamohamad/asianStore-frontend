import React from 'react';
import Ads from '../components/Ads';

export default function AdsList() {
  const images = [
    "https://i.pinimg.com/originals/11/2d/7f/112d7f170d4dbdb5c82c7c4db96d02b9.jpg",
    
    'https://i.pinimg.com/originals/6b/2d/97/6b2d974551d8dbee1bc0bc6d1e25aada.jpg',
    // 'https://i.pinimg.com/originals/2f/9f/72/2f9f724ebf9386f15d0cb8cfb33b1cfb.jpg',
    'https://i.pinimg.com/originals/35/0b/69/350b694f6b45c6f1e42e756a7c8ee1e0.jpg',
  ];

  return (
    <div className='row mt-5' >
      <div className='col-12'>
      <Ads images={images} />

      </div>
    </div>
  );
}