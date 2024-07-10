import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    axios.get('/assets/data/quizData.json')
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching quiz data: ', error);
      });
  }, []);

  return (
    <div>
      <h2>Quiz Component</h2>
      {/* Render questions here */}
    </div>
  );
}

export default Quiz;
