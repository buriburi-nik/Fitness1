import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 12;

  useEffect(() => {
    const fetchExercises = async () => {
      const options = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setExercises(response.data);
        setFilteredExercises(response.data);
        setLoading(false);
      } catch (error) {
        setError({
          message: 'Failed to fetch exercises',
          details: error.message,
          status: error.response?.status
        });
        setLoading(false);
        console.error(error);
      }
    };

    fetchExercises();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const filtered = exercises.filter(exercise => 
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, exercises]);

  // Pagination calculations
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(
    indexOfFirstExercise, 
    indexOfLastExercise
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <h2>Error Fetching Exercises</h2>
        <p>{error.message}</p>
        {error.details && <p>Details: {error.details}</p>}
        {error.status && <p>Status Code: {error.status}</p>}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Search exercises by name or body part..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      {filteredExercises.length === 0 ? (
        <div className="text-center text-gray-500">
          No exercises found matching your search.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentExercises.map((exercise) => (
              <Link 
                to={`/exercise/${exercise.id}`} 
                key={exercise.id} 
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img 
                  src={exercise.gifUrl} 
                  alt={exercise.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{exercise.name}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Body Part: {exercise.bodyPart}</span>
                    <span>Equipment: {exercise.equipment}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex space-x-2">
                {Array.from({ 
                  length: Math.ceil(filteredExercises.length / exercisesPerPage) 
                }).map((_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded ${
                        currentPage === index + 1 
                          ? 'bg-primary text-white' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default Exercises;