import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Fitness App</h1>
      <p>Your journey to a healthier life starts here!</p>
    </div>
  );
};

const styles = {
  container: { textAlign: 'center', padding: '50px' }
};

export default Home;
