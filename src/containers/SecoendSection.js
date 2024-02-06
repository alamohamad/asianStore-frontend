import React from 'react'
import NewCollCard from '../components/NewCollCard'
export const newCollection=[
  // https://i.pinimg.com/564x/41/bf/64/41bf64811ec6136a7ac67f9459b47b5b.jpg
  // https://i.pinimg.com/564x/88/85/40/8885405b013148fd0c3f28a5b1f6f14d.jpg
   {src:'https://i.pinimg.com/564x/41/bf/64/41bf64811ec6136a7ac67f9459b47b5b.jpg',
    name:'Women'
} ,

{src:'https://i.pinimg.com/564x/ea/b9/69/eab969d95e74cad2d2d49b366670699f.jpg',
name:'Men'
} ,
// https://i.pinimg.com/564x/fc/a6/df/fca6df39f2b2654db67af680a3abbf81.jpg
// https://i.pinimg.com/564x/0c/61/af/0c61af7d47df7caf1e44aa159de85f1f.jpg
{src:'https://i.pinimg.com/564x/fc/a6/df/fca6df39f2b2654db67af680a3abbf81.jpg',
name:'Kids'
} ,


]





export default function SecoendSection() {
  return (
    <div className='container containers '>
        <h2>New Collection</h2>
        <h6> Where Style meets comfort for every member of the family.</h6>
      <div className='row mt-5'>
        {
         newCollection.map((item)=>
            <div className='col-4'>
                < NewCollCard { ... item}/>
            </div>
         )
         }
      </div>
    </div>
  )
}
