import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import './Navbar.css';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navbarClass = isScrolled ? 'navbar scrolled' : 'navbar';

  return (
    <nav className={navbarClass}>
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <span className="logo-text">FitLife</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/exercises" className={`nav-link ${isActive('/exercises') ? 'active' : ''}`}>Exercises</Link>
            <Link to="/workouts" className={`nav-link ${isActive('/workouts') ? 'active' : ''}`}>Workouts</Link>
          </div>

          {/* Profile Menu */}
          <div className="profile-container">
            {user ? (
              <>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
                <div className="dropdown">
                  <button className="dropdown-toggle">
                    <span className="dropdown-text">Profile</span>
                  </button>
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">Settings</Link>
                    <Link to="/progress" className="dropdown-item">Progress</Link>
                    <button onClick={handleSignOut} className="dropdown-item sign-out-btn">
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/auth" className="sign-in-btn">Sign In</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn-container">
            <button onClick={toggleMenu} className="mobile-menu-btn">
              {isMenuOpen ? (
                <span>✖</span>
              ) : (
                <span>☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/exercises" className={`mobile-nav-link ${isActive('/exercises') ? 'active' : ''}`}>Exercises</Link>
          <Link to="/workouts" className={`mobile-nav-link ${isActive('/workouts') ? 'active' : ''}`}>Workouts</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
              <Link to="/profile" className={`mobile-nav-link ${isActive('/profile') ? 'active' : ''}`}>Profile</Link>
              <button onClick={handleSignOut} className="mobile-nav-link sign-out-mobile-btn">Sign Out</button>
            </>
          ) : (
            <Link to="/auth" className="mobile-sign-in-btn">Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
