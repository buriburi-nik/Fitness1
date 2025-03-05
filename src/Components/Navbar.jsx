import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Fitness App</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/exercises" style={styles.link}>Exercises</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#333', color: '#fff' },
  logo: { margin: 0 },
  navLinks: { listStyle: 'none', display: 'flex', gap: '15px' },
  link: { color: '#fff', textDecoration: 'none' }
};

export default Navbar;
