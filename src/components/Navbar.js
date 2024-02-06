import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';

export default function Navbar() {
  const [isNavHidden, setIsNavHidden] = useState(false);

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

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts


  return (
    <div>
      <nav className={`nav1 navbar ${isNavHidden ? 'hide-nav' : 'show-nav'}`}>
        <div className='white-font navSection1'>
          <label className='navLabel'>new user only </label> FREE SHOPPING 20% OF COUPON
        </div>

        <div className='navSection2'>
          <div className='part1'>
            <img src='/imgs/logo.png' alt='logo'/>
          </div>

          <span className='part2'>
            <ul>
              <li><NavLink to={'#'}>HOME</NavLink></li>
              <li><NavLink to={'#'}>SIGN IN</NavLink></li>
              <li><NavLink to={'#'}>REWARDS</NavLink></li>
              <li><NavLink to={'#'}>CATEGORIES</NavLink></li>
            </ul>
          </span>

          <div className='part3'>
            <ul>
              <NavLink to='#'>
                <label className='white-font'>
                  <li className='fa fa-cart-plus white-font'></li> Cart
                </label>
              </NavLink>

              <span className='iconNav'>
                <NavLink to='#'>
                  <li className='fa fa-user-o black-font' />
                </NavLink>

                <NavLink to='#'>
                  <li className='fa fa-search black-font' />
                </NavLink>
              </span>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
