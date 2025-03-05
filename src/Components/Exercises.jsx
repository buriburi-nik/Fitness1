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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error Fetching Exercises</h2>
        <p>{error.message}</p>
        {error.details && <p>Details: {error.details}</p>}
        {error.status && <p>Status Code: {error.status}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        {/* Search Input */}
        <div className="mb-8">
          <input 
            type="text" 
            placeholder="Search exercises by name or body part..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* No Results Message */}
        {filteredExercises.length === 0 ? (
          <div className="text-center text-gray-500">
            No exercises found matching your search.
          </div>
        ) : (
          <>
            {/* Exercises Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentExercises.map((exercise) => (
                <Link 
                  to={`/exercises/${exercise.id}`}
                  key={exercise.id} 
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <img 
                    src={exercise.gifUrl} 
                    alt={exercise.name} 
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{exercise.name}</h3>
                    <div className="text-sm text-gray-600">
                      <p><span className="font-medium">Body Part:</span> {exercise.bodyPart}</p>
                      <p><span className="font-medium">Equipment:</span> {exercise.equipment}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10">
              <nav>
                <ul className="flex space-x-3">
                  {Array.from({ 
                    length: Math.ceil(filteredExercises.length / exercisesPerPage) 
                  }).map((_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded transition-colors duration-200 ${
                          currentPage === index + 1 
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
    </div>
  );
};

export default Exercises;
