import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

export default function Navbar() {
  const [isNavHidden, setIsNavHidden] = useState(false);
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
    const isLoggedIn = localStorage.getItem('accessToken') && localStorage.getItem('user_id');

    if (!isLoggedIn) {
      alert('You must login first!');
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user_id');
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
            <label className='navLabel'>new user only </label> FREE SHOPPING 20% OF COUPON
          </div>

          <div className='navSection2'>
            <div className='part1'>
              <NavLink to='/'>
                <img src='/imgs/logo.png' id='icon' alt='Logo' />
              </NavLink>
            </div>

            <span className='part2'>
              <ul>
                <li><NavLink to={'/'}>HOME</NavLink></li>
                <li><NavLink to={'/login'}>SIGN IN</NavLink></li>
                <li><NavLink to={'/signup'}>SIGN UP</NavLink></li>
                <li><NavLink to={'#'}>REWARDS</NavLink></li>
              </ul>
            </span>

            <div className='part3'>
              <ul>
                <label className='white-font cartBtn' onClick={handleCartClick}>
                  <li className='fa fa-cart-plus white-font'/> Cart
                </label>

                <span className='iconNav'>
                  <NavLink to='#'>
                    <li className='fa fa-user-o black-font' title='my account'/>
                  </NavLink>

                 
                 
                 <li className='fa fa-sign-out mt-1 outButton' title='sign out' onClick={handleSignOut} />

                </span>
                
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }  
  return null;
}
