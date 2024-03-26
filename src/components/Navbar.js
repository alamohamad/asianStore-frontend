import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 
import '../styles/styles.css';
import { userContext } from './UserProvider';


export default function Navbar() {
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const {setCustomer,customer} = useContext(userContext);




  const location = useLocation();
  const navigate = useNavigate();



  
  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setIsNavHidden(true);
      } else {
        // Scrolling up
        setIsNavHidden(false);
      }

      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_id');
    setCustomer('');
    

    navigate('/login');
  };

  if (
    location.pathname !== '/signup' &&
    location.pathname !== '/employeesDashboard' &&
    location.pathname !== '/adminDashboard'&&
    !location.pathname.startsWith('/categories')) {
    return (
      
      <div>
        <nav className={`nav1 navbar ${isNavHidden ? 'hide-nav' : 'show-nav'}`}>
          <div className='white-font navSection1'>
            <label className='navLabel'>new user only </label> <span className='uppercase'>free shopping 20% of coupon</span>
          </div>

          <div className='navSection2'>
            <div className='part1'>
              <NavLink to='/'>
                <img src='/imgs/logo.png' id='icon' alt='Logo' />
              </NavLink>
            </div>

            <span className='part2 uppercase'>
              <ul>
                <li><NavLink to={'/'}>home</NavLink></li>
                <li><NavLink to={'/login'}>sign in</NavLink></li>
                <li><NavLink to={'/signup'}>sign up</NavLink></li>
                <li><NavLink to={'#'}>rewards</NavLink></li>
              </ul>
            </span>

            <div className='part3'>
              <ul>
                <label className='white-font cartBtn' onClick={handleCartClick}>
                  <li className='fa fa-cart-plus white-font'/> Cart
                </label>

                <span className='iconNav'>
                  <NavLink to='#'>
                    <li className='fa fa-user-o black-font mr-3' title='my account'> <span className='ml-2'>{customer}</span></li>
                   
                  </NavLink>

                  <li className='fa fa-sign-out mt-1 outButton' title='sign out' onClick={handleSignOut} />
                </span>
                
              </ul>
            </div>
          </div>
        </nav>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You must log in first to view your cart.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            <Button variant="dark" onClick={() => { setShowModal(false); navigate('/login'); }}>Login</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }  

  return null;
}
