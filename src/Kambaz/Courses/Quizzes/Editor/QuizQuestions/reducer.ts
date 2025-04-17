import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { questions } from "../../../../Database";

const initialState = {
    questionSets: questions,
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {

        setQuestions: (state, action) => {
            state.questionSets = action.payload;
          },
        addQuestion: (state, { payload: { quiz, question } }) => {
            const newQuestion = {
                ...question,
                id: question.id || uuidv4(),
                quiz: quiz
            };

            state.questionSets.push(newQuestion);
            
        },

        updateQuestion: (state, { payload: { quiz, question } }) => {
            const index = state.questionSets.findIndex(
              (q) => q.quiz === quiz && q.id === question.id
            );
            if (index !== -1) {
              state.questionSets[index] = { ...state.questionSets[index], ...question };
            }
          },
      
          deleteQuestion: (state, { payload: { quiz, questionId } }) => {
            state.questionSets = state.questionSets.filter(
              (q) => !(q.quiz === quiz && q.id === questionId)
            );
          },

    },
});

export const {
    addQuestion,
    updateQuestion,
    deleteQuestion,
    setQuestions
} = questionsSlice.actions;

export default questionsSlice.reducer;