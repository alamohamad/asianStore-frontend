
import { NavLink } from 'react-router-dom'
import AdsList from './AdsList'
import CategoriesList from './CategoriesList'
import FlashList from './FlashList'
import FirstSection from './FirstSection'
import SecoendSection from './SecoendSection'
import ThirdSection from './ThirdSection'
import FourthSection from './FourthSection'
import Footer from './Footer'


export default function Home() {

  return (
    
         

       <div className='container-fluid containers ' >
      

        
          

        <div className='row ' style={{backgroundColor:'#e9ecef'}}>
            <div className='col-12 '>
              <FirstSection/>
          

            </div>
        </div>


        <div className='row' >
            <div className='col-12'>
              <SecoendSection/>
            </div>

        </div>
      

        <div className='row'>
            <div className='col-12'>
           <ThirdSection/>
            </div>
            
        </div>
        

        <div className='row'  style={{backgroundColor:'#e9ecef'}}>
            <div className='col-12'>
           <FourthSection/>
            </div>
            
        </div>


        
        <div className='row'  style={{backgroundColor:'#e9ecef'}}>
            <div className='col-12'>
            {/* <Footer/> */}
            </div>
            
        </div>
     

{/* 
        <div className='row'>
            <div className='col-12'>
            <FlashList/>
            </div>
            
        </div>

        <div className='row'>
            <div className='col-12'>
              <CategoriesList/>
            </div>
            
        </div> */}

     </div>
      
       


 
    
  )
}