import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ExerciseDetail.css';

const ExerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      const options = {
        method: 'GET',
        url: `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setExercise(response.data);
        setLoading(false);
      } catch (error) {
        setError({
          message: 'Failed to fetch exercise details',
          details: error.message,
          status: error.response?.status
        });
        setLoading(false);
        console.error(error);
      }
    };

    fetchExerciseDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Error Fetching Exercise Details</h2>
        <p>{error.message}</p>
        {error.details && <p>Details: {error.details}</p>}
        {error.status && <p>Status Code: {error.status}</p>}
        <button 
          onClick={() => navigate('/exercises')}
          className="btn btn-primary"
        >
          Back to Exercises
        </button>
      </div>
    );
  }

  if (!exercise) {
    return <div>No exercise found</div>;
  }

  return (
    <div className="exercise-detail-container">
      <div className="exercise-grid">
        {/* Exercise Image */}
        <div className="exercise-image">
          <img src={exercise.gifUrl} alt={exercise.name} />
        </div>

        {/* Exercise Details */}
        <div className="exercise-info">
          <h1 className="exercise-title">{exercise.name}</h1>
          
          <div className="exercise-card">
            <div className="exercise-details">
              <div>
                <h2>Body Part</h2>
                <p>{exercise.bodyPart}</p>
              </div>
              <div>
                <h2>Target</h2>
                <p>{exercise.target}</p>
              </div>
              <div>
                <h2>Equipment</h2>
                <p>{exercise.equipment}</p>
              </div>
              <div>
                <h2>Secondary Muscles</h2>
                <p>{exercise.secondaryMuscles?.join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Additional Instructions/Tips */}
          <div className="exercise-tips">
            <h2>Exercise Tips</h2>
            <ul>
              <li>Focus on proper form and technique</li>
              <li>Start with lighter weights or bodyweight if you're a beginner</li>
              <li>Maintain a steady breathing rhythm</li>
              <li>Listen to your body and stop if you feel pain</li>
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="button-group">
            <button onClick={() => navigate('/exercises')} className="btn btn-secondary">
              Back to Exercises
            </button>
            <button className="btn btn-primary">
              Add to Workout Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
