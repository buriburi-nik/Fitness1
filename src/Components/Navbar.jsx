import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Fitness App</h2>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/exercises" style={styles.link}>
            Exercises
          </Link>
        </li>
        <li>
          <Link to="/dashboard" style={styles.link}>
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    background: '#333',
    color: '#fff'
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem'
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem'
  }
};

export default Navbar;
