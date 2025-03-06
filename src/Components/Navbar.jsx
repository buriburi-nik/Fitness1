import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase-config';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle user logout
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
              <svg xmlns="http://www.w3.org/2000/svg" className="logo-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="logo-text">FitLife</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/exercises" className={`nav-link ${isActive('/exercises') ? 'active' : ''}`}>
              Exercises
            </Link>
            <Link to="/workouts" className={`nav-link ${isActive('/workouts') ? 'active' : ''}`}>
              Workouts
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                  Dashboard
                </Link>
                <div className="dropdown">
                  <button className="dropdown-toggle">
                    <span className="dropdown-text">Profile</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="dropdown-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      <Link to="/profile" className="dropdown-item">Settings</Link>
                      <Link to="/progress" className="dropdown-item">Progress</Link>
                      <button onClick={handleSignOut} className="dropdown-item sign-out-btn">
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/auth" className="sign-in-btn">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu-btn-container">
            <button onClick={toggleMenu} type="button" className="mobile-menu-btn" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu-content">
            <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/exercises" className={`mobile-nav-link ${isActive('/exercises') ? 'active' : ''}`}>
              Exercises
            </Link>
            <Link to="/workouts" className={`mobile-nav-link ${isActive('/workouts') ? 'active' : ''}`}>
              Workouts
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/profile" className={`mobile-nav-link ${isActive('/profile') ? 'active' : ''}`}>
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut} 
                  className="mobile-nav-link sign-out-mobile-btn"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="mobile-sign-in-btn">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;