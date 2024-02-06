import React from 'react'
import BestSellerCard from '../components/BestSellerCard'
import { useSelector } from 'react-redux';
const bestSeller=[
    {img:'https://i.pinimg.com/564x/08/6d/3c/086d3c6b50c8786af02ca9100208aa89.jpg',
     name:'Sweater',
     price:'200$'
        },
        {img:'https://i.pinimg.com/564x/00/9f/18/009f18b18a8763db037de9999ee90a1e.jpg',
        name:'Sweater',
        price:'250$'   
           },
         
]



export default function FourthSection() {
   

    
  return (
    <div className='contanier-fluid containers fourthSection  mb-5'>
        <div className='row fourthSection'>
            <div className=' col-4 sec4Left'>
                <p className='title1'>Best Seller Product</p>
                <p className='title4'>Order now for prompt delivery to your doorstep. Your journey to elegance begins here!</p>
                <button className='col-12 col-md-6 '>see more</button>           


            </div>

            <div className='row col-8'>
            {
                bestSeller.map((item)=>
                <div className='col-6'>
                    <BestSellerCard {...item}/>
                </div>
                )
            }

            </div>
            

        </div>


      
    </div>
  )
}
