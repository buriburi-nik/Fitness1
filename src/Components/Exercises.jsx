import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Exercises.css';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 3;

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
  const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);
  
  // If current page is greater than total pages, reset to page 1
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);
  
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-title">Error Fetching Exercises</h2>
        <p>{error.message}</p>
        {error.details && <p className="error-details">Details: {error.details}</p>}
        {error.status && <p className="error-status">Status Code: {error.status}</p>}
      </div>
    );
  }

  return (
    <div className="exercises-page">
      <div className="container">
        {/* Search Input */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search exercises by name or body part..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        {/* No Results Message */}
        {filteredExercises.length === 0 ? (
          <div className="no-results">
            No exercises found matching your search.
          </div>
        ) : (
          <>
            {/* Exercises Grid */}
            <div className="exercises-grid">
              {currentExercises.map((exercise) => (
                <Link 
                  to={`/exercises/${exercise.id}`}
                  key={exercise.id} 
                  className="exercise-card"
                >
                  <img 
                    src={exercise.gifUrl} 
                    alt={exercise.name} 
                    className="exercise-image"
                  />
                  <div className="exercise-details">
                    <h3 className="exercise-title">{exercise.name}</h3>
                    <div className="exercise-meta">
                      <p><span className="meta-label">Body Part:</span> {exercise.bodyPart}</p>
                      <p><span className="meta-label">Equipment:</span> {exercise.equipment}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <nav>
                  <ul className="pagination-list">
                    {/* Previous Button */}
                    <li>
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        className="pagination-button"
                        disabled={currentPage === 1}
                      >
                        &laquo;
                      </button>
                    </li>
                    
                    {/* Limited Page Numbers */}
                    {(() => {
                      const pageButtons = [];
                      const maxButtons = 5;
                      let startPage = 1;
                      let endPage = totalPages;
                      
                      // Calculate range of page buttons to show
                      if (totalPages > maxButtons) {
                        // Show 5 buttons at most
                        const middlePoint = Math.floor(maxButtons / 2);
                        
                        if (currentPage <= middlePoint + 1) {
                          // Near start
                          endPage = maxButtons;
                        } else if (currentPage >= totalPages - middlePoint) {
                          // Near end
                          startPage = totalPages - maxButtons + 1;
                        } else {
                          // Middle area
                          startPage = currentPage - middlePoint;
                          endPage = currentPage + middlePoint;
                        }
                      }
                      
                      // Generate the visible page buttons
                      for (let i = startPage; i <= endPage; i++) {
                        pageButtons.push(
                          <li key={i}>
                            <button
                              onClick={() => paginate(i)}
                              className={`pagination-button ${
                                currentPage === i ? 'active' : ''
                              }`}
                            >
                              {i}
                            </button>
                          </li>
                        );
                      }
                      
                      return pageButtons;
                    })()}
                    
                    {/* Next Button */}
                    <li>
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        className="pagination-button"
                        disabled={currentPage === totalPages}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
            
            {/* Page Info */}
            {totalPages > 0 && (
              <div className="pagination-info">
                Showing page {currentPage} of {totalPages}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Exercises;