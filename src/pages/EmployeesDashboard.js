import React, { useContext, useState } from 'react';
import ProductsDashboard from '../containers/ProductsDashboard';
import { useNavigate } from 'react-router-dom';
import CategoriesDashboard from '../containers/CategoriesDashboard';
import { userContext } from '../components/UserProvider';

export default function EmployeesDashboard() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState('categories'); 
  const {setCustomer} = useContext(userContext);

  const navigate = useNavigate();


  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_id');
    setCustomer('');
    navigate('/login');
  };



  return (
    <div className='container-fluid employeeDashboard' >

      <header className='row pb-3 pt-3 ' >
        <div className="col">
        Data Entry Dashboard
        </div>
        <div className="col-auto">
         
        <li className={`fa fa-sign-out white-font` } onClick={handleSignOut} />
           
          <li className='fa fa-reorder white-font ' onClick={toggleSidebar} style={{position: 'absolute', left: '15px'}} />
        </div>
      </header>




      <div className='row'>

        <div className={`col-md-2 ${isSidebarVisible ? '' : 'd-none d-block'}`}>
          <div className={`sidebar bg-black ${isSidebarVisible ? 'visible' : ''}`}>
           <img src='https://i.pinimg.com/564x/8e/e5/d8/8ee5d821350d03fffe88f97d55b92ed8.jpg' alt='notFound' className='logo rounded-circle'/>
            Hello, team

           <ul className='sideBarContent mt-5 mx-auto'>
          
           <li className=' fa fa-sitemap p-2' onClick={() => handleSectionClick('categories')}> Categories </li>
           <li className='fa fa-window-restore p-2'onClick={() => handleSectionClick('products')}> Products </li>
           </ul>
           
          </div>
        </div>

        <div className={`col-md-${isSidebarVisible ? '10' : '12'}`}>
          {selectedSection==='products' && <ProductsDashboard/>}
          {selectedSection==='categories' && <CategoriesDashboard/>}
        </div>

      </div>

     

    </div>
  );
}
