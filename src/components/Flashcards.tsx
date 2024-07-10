import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Flashcard {
  question: string;
  correct_answer: string;
}

interface TriviaResponse {
  results: Flashcard[];
}

const Flashcards: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  useEffect(() => {
    // Fetch flashcards data from Open Trivia Database API
    axios.get<TriviaResponse>('https://opentdb.com/api.php?amount=5')
      .then(response => {
        const formattedFlashcards = response.data.results.map(result => ({
          question: result.question,
          correct_answer: result.correct_answer
        }));
        setFlashcards(formattedFlashcards);
      })
      .catch(error => {
        console.error('Error fetching flashcards data: ', error);
      });
  }, []);

  const handleNextCard = () => {
    // Move to the next flashcard
    const nextIndex = currentIndex + 1;
    if (nextIndex < flashcards.length) {
      setCurrentIndex(nextIndex);
      setShowAnswer(false); // Reset showAnswer state
    } else {
      // Handle end of flashcards
      setCurrentIndex(0); // Reset to start
      setShowAnswer(false); // Reset showAnswer state
    }
  };

  const toggleShowAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="flashcards-container">
      <h2>Flashcards Component</h2>
      {flashcards.length > 0 ? (
        <div className="flashcard">
          <div className="flashcard-content">
            <h3>Question:</h3>
            <p dangerouslySetInnerHTML={{ __html: flashcards[currentIndex].question }} />
            <button onClick={toggleShowAnswer}>
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && (
              <>
                <h3>Answer:</h3>
                <p>{flashcards[currentIndex].correct_answer}</p>
              </>
            )}
          </div>
          <div className="flashcard-footer">
            <button onClick={handleNextCard}>Next Card</button>
          </div>
        </div>
      ) : (
        <p>Loading flashcards...</p>
      )}
    </div>
  );
};

export default Flashcards;
