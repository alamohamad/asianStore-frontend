import React from 'react'

export default function CategoriesCard(props) {
  return (
    <div>
        <div className='categoriesCard ' >
        {/* style={{border:'1px solid black'}} */}
            <img src={props.src} placeholder='notFound' className='categorisImgCard img-fluid ' />
            <br/>
            <span >{props.name}</span>


        </div>
      
    </div>
  )
}
