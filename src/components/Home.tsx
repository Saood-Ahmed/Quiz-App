import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Concept Revision App</h1>
      <nav>
        <ul>
          <li><Link to="/quiz">Take Quiz</Link></li>
          <li><Link to="/flashcards">Flashcards</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;