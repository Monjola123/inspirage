import React from 'react';
import './Navbar.css';

const Navbar = ({ selectedTab, onSelectTab }) => {
  return (
    <div className="navbar">
        <div className="web-name">Inspirage</div>
      <nav>
        <ul>
          <li>
            <a
              href="#"
              className={selectedTab === 'quotes' ? 'active' : ''}
              onClick={() => onSelectTab('quotes')}
            >
              Quotes
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedTab === 'liked' ? 'active' : ''}
              onClick={() => onSelectTab('liked')}
            >
              Liked
            </a>
          </li>
        </ul>
      </nav>
      </div>
  );
};

export default Navbar;
