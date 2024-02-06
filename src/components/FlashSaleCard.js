import React from 'react';

export default function FlashSaleCard(props) {
  return (
    <div className='flashCard'>
      <div className='flashAmount'>
        <li className='fa fa-flash' />
        <br />
        {props.flashamount}
      </div>

      <div className='row'>
        <img src={props.src} alt='not Found' />
        <div className=' d-flex '>
          <span  style={{ marginRight: '10px' ,fontSize:'large' ,fontWeight:'bold'}}>{props.newPrice}</span>
          <del >{props.prevPrice}</del>
        </div>
      </div>
    </div>
  );
}
