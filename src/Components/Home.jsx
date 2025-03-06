import React from 'react';
import { Link } from 'react-router-dom';
// import heroImage from './hero.jpg'; // You'll need to add this image
import './Home.css'; 

const Home = () => {
  // Featured workouts data
  const featuredWorkouts = [
    { id: 1, name: 'Full Body Blast', duration: '45 min', difficulty: 'Intermediate', image: '/api/placeholder/300/200' },
    { id: 2, name: 'Core Crusher', duration: '30 min', difficulty: 'Beginner', image: '/api/placeholder/300/200' },
    { id: 3, name: 'HIIT Cardio', duration: '25 min', difficulty: 'Advanced', image: '/api/placeholder/300/200' }
  ];

  // Testimonials data
  const testimonials = [
    { id: 1, name: 'Sarah J.', quote: 'This app transformed my fitness journey! The exercise library is amazing.', image: '/api/placeholder/60/60' },
    { id: 2, name: 'Mark T.', quote: 'I love tracking my progress and seeing how far I\'ve come.', image: '/api/placeholder/60/60' },
    { id: 3, name: 'Lisa R.', quote: 'The workout plans are exactly what I needed to stay motivated.', image: '/api/placeholder/60/60' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Transform Your Body, Transform Your Life</h1>
          <p className="hero-description">Get access to hundreds of exercises, personalized workout plans, and advanced progress tracking.</p>
          <div className="hero-buttons">
            <Link to="/exercises" className="btn-primary">
              Browse Exercises
            </Link>
            <Link to="/auth" className="btn-secondary">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Our Fitness App?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="feature-title">Extensive Exercise Library</h3>
              <p className="feature-description">Access over 1000 exercises with detailed instructions, animations, and tips to ensure proper form.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="feature-title">Personalized Tracking</h3>
              <p className="feature-description">Track your progress with customizable metrics including weight, body fat, muscle mass, and more.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Workout Plans</h3>
              <p className="feature-description">Follow expert-designed workout plans tailored to your fitness level and goals.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Workouts */}
      <div className="workouts-section">
        <div className="container">
          <h2 className="section-title">Featured Workouts</h2>
          <div className="workouts-grid">
            {featuredWorkouts.map(workout => (
              <div key={workout.id} className="workout-card">
                <img src={workout.image} alt={workout.name} className="workout-image" />
                <div className="workout-content">
                  <h3 className="workout-title">{workout.name}</h3>
                  <div className="workout-details">
                    <span>{workout.duration}</span>
                    <span className="workout-difficulty">{workout.difficulty}</span>
                  </div>
                  <button className="btn-workout">
                    View Workout
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/workouts" className="btn-outline">
              View All Workouts
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                  <div>
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <div className="testimonial-stars">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Start Your Fitness Journey?</h2>
          <p className="cta-description">Join thousands of users who have transformed their bodies and lives with our app.</p>
          <Link to="/auth" className="btn-cta">
            Sign Up Now - It's Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;