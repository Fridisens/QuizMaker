import { createSlice } from '@reduxjs/toolkit';

export const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    name: '',
    questions: [],
  },
  reducers: {
    setQuizName: (state, action) => {
      state.name = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter((q, index) => index !== action.payload); // Ta bort en fråga
    },
    resetQuiz: (state) => {
      state.name = '';
      state.questions = [];
    },
  },
});

export const { setQuizName, addQuestion, removeQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;