import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Fitness App. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: { textAlign: 'center', padding: '15px', background: '#333', color: '#fff', position: 'fixed', bottom: 0, width: '100%' }
};

export default Footer;
