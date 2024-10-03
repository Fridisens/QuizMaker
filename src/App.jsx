import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateQuizPage from './components/CreateQuizPage'; 

function HomePage() {
  return (
    <div>
      <h1>Welcome to the quiz maker!</h1>
      <Link to="/create-quiz">
        <button>Add Quiz</button>
      </Link>

      <button>Remove Quiz</button>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-quiz" element={<CreateQuizPage />} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}