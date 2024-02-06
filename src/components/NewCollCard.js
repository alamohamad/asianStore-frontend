import React from 'react'

export default function NewCollCard(props) {
  return (
    <div className='newCollCard container-fluid'  >
            <div className='row justify-content-center' >
            <img src={props.src} alt='not found' />
            <button className=' bg-white  '>{props.name}</button>
            </div>
            
        

      
    </div>
  )
}
