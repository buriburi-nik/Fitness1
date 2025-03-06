import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './WorkoutComponent.css'; //

const WorkoutComponent = () => {
  const { category } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['strength', 'cardio', 'stretching', 'plyometrics', 'powerlifting'];

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
            'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
          }
        };
        
        const response = await fetch(
          `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?type=${category || 'strength'}`, 
          options
        );
        
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [category]);

  return (
    <div className="workout-container">
      <h2 className="workout-title">Workout Explorer</h2>
      
      <div className="category-section">
        <label className="category-label">Workout Category:</label>
        <div className="category-buttons">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/workouts/${cat}`}
              className={`category-button ${category === cat ? 'active' : ''}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Link>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-message">Loading workouts...</div>
      ) : error ? (
        <div className="error-message">Error: {error}</div>
      ) : (
        <div className="workout-list-container">
          <ul className="workout-list">
            {workouts.map((workout, index) => (
              <li key={index} className="workout-card">
                <h3 className="workout-name">{workout.name}</h3>
                <p className="workout-info"><strong>Muscle:</strong> {workout.muscle}</p>
                <p className="workout-info"><strong>Equipment:</strong> {workout.equipment || 'None'}</p>
                <p className="workout-info"><strong>Difficulty:</strong> {workout.difficulty}</p>
                <p className="workout-instructions">{workout.instructions}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="button-group">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
        <button className="btn btn-save" onClick={() => window.print()}>Save Workouts</button>
      </div>
    </div>
  );
};

export default WorkoutComponent;
