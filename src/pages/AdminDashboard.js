import React, { useContext, useState } from 'react';
import AdminSec from '../containers/AdminSec';
import {useNavigate } from 'react-router-dom';
import CustomersDashboard from '../containers/CustomersDashboard';
import OrdersDashboard from '../containers/OrdersDashboard';
import EmployeesDashboard from '../containers/EmployeesDashboard';
import { userContext } from '../components/UserProvider';

export default function AdminDashboard() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState('dashboard'); 
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
         Admin Dashboard
        </div>
        <div className="col-auto">
         
       
        <li className={`fa fa-sign-out white-font` } onClick={handleSignOut} />
           
          <li className='fa fa-reorder white-font ' onClick={toggleSidebar} style={{position: 'absolute', left: '15px'}} />
        </div>
      </header>




      <div className='row'>

        <div className={`col-md-2 ${isSidebarVisible ? '' : 'd-none d-block'}`}>
          <div className={`sidebar bg-black ${isSidebarVisible ? 'visible' : ''}`}>
           <img src='https://i.pinimg.com/564x/56/c7/5d/56c75d13636b5830b34385f6df90ca43.jpg' alt='notFound' className='logo rounded-circle'/>
            Hello, Admin

           <ul className='sideBarContent mt-5 mx-auto'>
          
          <li className='fa fa-home p-2 '  onClick={() => handleSectionClick('dashboard')}> Dashboard</li>
          <li className='fa fa-users p-2' onClick={() => handleSectionClick('employees')} > Employees</li>
           <li className='fa fa-users p-2' onClick={() => handleSectionClick('customers')} > Customers</li>
           <li className='fa fa-window-restore p-2'onClick={() => handleSectionClick('orders')}> Orders </li>

           </ul>
           
           
          </div>
        </div>

        <div className={`col-md-${isSidebarVisible ? '10' : '12'}`}>
        {selectedSection === 'dashboard' && <AdminSec/>}
          {selectedSection === 'customers' && <CustomersDashboard/>}
          {selectedSection === 'employees' && <EmployeesDashboard/>}
          {selectedSection==='orders' && <OrdersDashboard/>}

        </div>

      </div>

     

    </div>
  );
}
