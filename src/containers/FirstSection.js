import React from 'react';
import { NavLink } from 'react-router-dom';

export default function FirstSection() {
  return (
    <div className='container containers firstSection '>
      <div className='row'>
        <div className='sec1Left col-6'>
          <div className='description'>
            <p className='title1'>Find the Best Fashion Style for you</p>
            <p className='title2'>Explore our carefully curated collections that reflect the fashion trends.</p>
            <div className='container-fluid'>
            <div className='row '>
            
              <NavLink to={'/signup'} className={'bg-black  col-7 white-font navLink'}>
                Join Now
              </NavLink>
              
              <NavLink to={'/login'} className='bg-black white-font col-4 navLink'>
              Login
              </NavLink>
              
             
            </div>
          </div>

            
            
          </div>
        </div>
        <div className='sec1Right col-6'>
          <img className='img-fluid' src='https://i.pinimg.com/564x/e3/92/1f/e3921fa8e8c474e6ef0b55a6431dc8cb.jpg' alt='not Found'/>
        </div>
      </div>
    </div>
  );
}
