import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components here
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Exercises from './Components/Exercises';
import ExerciseDetail from './Components/ExerciesDetail'; // Make sure the file is renamed accordingly
import FitnessDashboard from './Components/FitnessDashboard';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
          
          {/* Exercises Page */}
          <Route path="/exercises" element={<Exercises />} />
          
          {/* Exercise Detail Page (dynamic route) */}
          <Route path="/exercises/:id" element={<ExerciseDetail />} />
          
          {/* Fitness Dashboard Page */}
          <Route path="/dashboard" element={<FitnessDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
