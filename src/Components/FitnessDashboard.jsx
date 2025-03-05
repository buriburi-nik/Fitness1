import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase-config';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const FitnessDashboard = () => {
  const [user] = useAuthState(auth);
  const [progressData, setProgressData] = useState({
    weight: '',
    bodyFat: '',
    muscleMass: '',
    workoutFrequency: ''
  });
  const [historicalProgress, setHistoricalProgress] = useState([]);
  const [fitnessGoals, setFitnessGoals] = useState({
    weightLoss: '',
    muscleGain: '',
    enduranceImprovement: ''
  });

  useEffect(() => {
    const fetchUserProgress = async () => {
      if (user) {
        const userDoc = await getDoc(doc(firestore, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setHistoricalProgress(data.progressTracking || []);
          setFitnessGoals(data.fitnessGoals || {});
        }
      }
    };

    fetchUserProgress();
  }, [user]);

  const handleProgressUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    const newProgressEntry = {
      ...progressData,
      date: new Date().toISOString()
    };

    const updatedProgress = [...historicalProgress, newProgressEntry];

    await updateDoc(doc(firestore, 'users', user.uid), {
      progressTracking: updatedProgress
    });

    setHistoricalProgress(updatedProgress);
    // Reset form
    setProgressData({
      weight: '',
      bodyFat: '',
      muscleMass: '',
      workoutFrequency: ''
    });
  };

  const handleGoalsUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;

    await updateDoc(doc(firestore, 'users', user.uid), {
      fitnessGoals: fitnessGoals
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Fitness Progress Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Progress Tracking Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Log Your Progress</h2>
          <form onSubmit={handleProgressUpdate} className="space-y-4">
            <input
              type="number"
              placeholder="Weight (kg)"
              value={progressData.weight}
              onChange={(e) => setProgressData({...progressData, weight: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Body Fat (%)"
              value={progressData.bodyFat}
              onChange={(e) => setProgressData({...progressData, bodyFat: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Muscle Mass (%)"
              value={progressData.muscleMass}
              onChange={(e) => setProgressData({...progressData, muscleMass: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Workout Frequency (times/week)"
              value={progressData.workoutFrequency}
              onChange={(e) => setProgressData({...progressData, workoutFrequency: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button 
              type="submit" 
              className="w-full bg-primary text-white py-2 rounded-lg"
            >
              Log Progress
            </button>
          </form>
        </div>

        {/* Fitness Goals Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Set Fitness Goals</h2>
          <form onSubmit={handleGoalsUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Weight Loss Goal"
              value={fitnessGoals.weightLoss}
              onChange={(e) => setFitnessGoals({...fitnessGoals, weightLoss: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Muscle Gain Goal"
              value={fitnessGoals.muscleGain}
              onChange={(e) => setFitnessGoals({...fitnessGoals, muscleGain: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Endurance Improvement Goal"
              value={fitnessGoals.enduranceImprovement}
              onChange={(e) => setFitnessGoals({...fitnessGoals, enduranceImprovement: e.target.value})}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button 
              type="submit" 
              className="w-full bg-secondary text-white py-2 rounded-lg"
            >
              Update Goals
            </button>
          </form>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
        <LineChart 
          width={800} 
          height={400} 
          data={historicalProgress}
          className="mx-auto"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" />
          <Line type="monotone" dataKey="muscleMass" stroke="#ffc658" />
        </LineChart>
      </div>
    </div>
  );
};

export default FitnessDashboard;