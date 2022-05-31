import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebarData';
import './navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        
        <nav className='nav-menu active'>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'>   
            </li>
            {SidebarData.map((item, index) => {
              return item.allowedRoles.includes(user.role) ?
               (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                   
                  </Link>
                  {item.title ==='Jobs' && user.role == 'admin' ? <div className='submenu'>
                    <Link to={`${item.path}/create-cron`}>
                    Create New Job
                    </Link>
                    </div> : null}
                </li>
              ) : null;
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;