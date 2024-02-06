import React from 'react'
import FlashSaleCard from '../components/FlashSaleCard'
export const flash=[{
    src:'https://www.urbanchic.com.pk/cdn/shop/files/IMG-5427_208c9e76-52b1-4b07-bf57-f991984e3334.jpg?v=1698249170',
    newPrice:'150$',
    prevPrice:'200$',
    flashamount:'-40%'
},

    {
        src:'https://img.ltwebstatic.com/images3_pi/2023/03/10/16784301305fe07cdba45a174ccb6be32cc5c3143b_thumbnail_720x.webp',
        newPrice:'30$',
        prevPrice:'50$',
        flashamount:'-40%'
    },
    {
        src:'https://bagallery.com/cdn/shop/products/1669798998417ea8bd1a7c9b8267200eec6606d711.webp?v=1671433109',
        newPrice:'150$',
        prevPrice:'200$',
        flashamount:'-40%'
    },
    
        {
            src:'https://img.ltwebstatic.com/images3_spmp/2023/05/18/16843956843bf1bfcdb1e5ac3395fe49b347618a6f_thumbnail_720x.jpg',
            newPrice:'30$',
            prevPrice:'50$',
            flashamount:'-40%'
        },
       
        {
            src:' https://i.pinimg.com/736x/c1/9d/87/c19d87e21c3f8e3c796ae4bd9f4cc2cc.jpg',
            newPrice:'30$',
            prevPrice:'50$',
            flashamount:'-40%'
        },
   
]




export default function FlashList() {
  return (
    <div>
        
       
         
         <div className='container-fluid mt-5 flashList '>
           
           <a className=' moreFlash'>Grab them now</a>
          
          
            
       
       <div className='row '>
          
               {
                   flash.map((item)=>
                   <div className='col-6 col-md-2 mt-5'>
                       <FlashSaleCard {...item}/>
                       </div>

                   )
               }


       </div>

     
   </div>
    </div>
   
  )
}
