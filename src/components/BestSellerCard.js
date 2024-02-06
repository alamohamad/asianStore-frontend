import React from 'react'

export default function BestSellerCard(props) {
  
  return (
    
    <div className='contanier-fluid bg-white bestSellerCard' >
        <div className='row'>
        <img src={props.img} alt='not found'/>
        <div className='bestSellDesCard'>
        <p className='mb-3'>{props.name} <span>- {props.price}</span>  </p>
      
        <br/>
        <button ><i className='fa fa-cart-plus'/><span className='s2'> Add to cart</span></button>


        </div>
        

        </div>
      

      
    </div>
  )
}
