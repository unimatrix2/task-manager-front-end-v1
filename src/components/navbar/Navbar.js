import React from 'react';
import { Link } from 'react-router-dom';
 
const navbar = ({ isUserAuth }) => {
  return (
    <nav className="nav-style">
      <ul>
        {isUserAuth ? (
          <>
            <li><Link to="/projects" style={{ textDecoration: 'none' }}>Projects</Link></li>
            <li><Link to="/" style={{ textDecoration: 'none' }}>Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/" style={{ textDecoration: 'none' }}>Login</Link></li>
            <li><Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link></li>
          </>
        )}
        
      </ul>
    </nav>
  )
}
 
export default navbar;
