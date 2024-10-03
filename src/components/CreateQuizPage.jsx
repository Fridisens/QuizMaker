import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizName, addQuestion, removeQuestion, resetQuiz } from '../features/quizSlice';

const CreateQuizPage = () => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [options, setOptions] = useState(['', '', '', '']); 
  const [correctAnswer, setCorrectAnswer] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const quizName = useSelector((state) => state.quiz.name); 
  const questions = useSelector((state) => state.quiz.questions); 
  const dispatch = useDispatch();

  const handleAddQuestion = () => {
    if (!questionText.trim()) {
      setErrorMessage('Please enter a question.'); 
      return;
    }

    
    setErrorMessage('');

    const newQuestion = {
      text: questionText,
      type: questionType,
      options: questionType === 'multiple-choice' ? options : null, 
      correctAnswer: questionType === 'true-false' ? correctAnswer : null, 
    };
    dispatch(addQuestion(newQuestion));
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(null);
  };

  return (
    <div>
      <h2>Create a Quiz</h2>
      <p></p>
      <div>
        <input
          type="text"
          value={quizName}
          onChange={(e) => dispatch(setQuizName(e.target.value))}
          placeholder="Enter quiz name"
        />
       <p></p>
     
    
      </div>
      

      <div>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question"
        />
        <p></p>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <div>
        <label>Question Type: </label>
        <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="true-false">True/False</option>
        </select>
      </div>

      {questionType === 'multiple-choice' && (
        <div>
          <h3>Options:</h3>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              
            </div>
          ))}
        </div>
      )}

      <p></p>

      {questionType === 'true-false' && (
        <div>
          <h3>Select Correct Answer:</h3>
          <label>
            <input
              type="radio"
              name="true-false"
              value="true"
              checked={correctAnswer === 'true'}
              onChange={() => setCorrectAnswer('true')}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="true-false"
              value="false"
              checked={correctAnswer === 'false'}
              onChange={() => setCorrectAnswer('false')}
            />
            False
          </label>
        </div>
      )}
      <p></p>

      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={() => dispatch(resetQuiz())}>Reset Quiz</button>
      <h3>Quiz: {quizName}</h3>
      <h3>Questions:</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            {question.text} ({question.type})
            {question.type === 'multiple-choice' && (
              <ul>
                {question.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
            )}
            {question.type === 'true-false' && (
              <p>Correct Answer: {question.correctAnswer}</p>
            )}
            <button onClick={() => dispatch(removeQuestion(index))}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateQuizPage;