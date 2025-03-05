import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <div className="flex justify-center items-center min-h-screen">
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
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Exercise Image */}
        <div className="flex justify-center items-center">
          <img 
            src={exercise.gifUrl} 
            alt={exercise.name} 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Exercise Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h2 className="font-semibold">Body Part</h2>
                <p className="text-gray-600">{exercise.bodyPart}</p>
              </div>
              <div>
                <h2 className="font-semibold">Target</h2>
                <p className="text-gray-600">{exercise.target}</p>
              </div>
              <div>
                <h2 className="font-semibold">Equipment</h2>
                <p className="text-gray-600">{exercise.equipment}</p>
              </div>
              <div>
                <h2 className="font-semibold">Secondary Muscles</h2>
                <p className="text-gray-600">
                  {exercise.secondaryMuscles?.join(', ') || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Instructions/Tips */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Exercise Tips</h2>
            <ul className="list-disc list-inside space-y-2 bg-gray-50 p-4 rounded-lg">
              <li>Focus on proper form and technique</li>
              <li>Start with lighter weights or bodyweight if you're a beginner</li>
              <li>Maintain a steady breathing rhythm</li>
              <li>Listen to your body and stop if you feel pain</li>
            </ul>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 flex space-x-4">
            <button 
              onClick={() => navigate('/exercises')}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Back to Exercises
            </button>
            <button 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Workout Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;