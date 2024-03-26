import FirstSection from '../containers/FirstSection'
import SecoendSection from '../containers/SecoendSection'
import ThirdSection from '../containers/ThirdSection'
import FourthSection from '../containers/FourthSection'

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
            </div>
            
        </div>
     
     </div>
      
       


 
    
  )
}