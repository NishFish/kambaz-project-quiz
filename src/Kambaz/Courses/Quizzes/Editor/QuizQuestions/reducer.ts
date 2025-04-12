import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { questions } from "../../../../Database";


const initialState = {
    questionSets: questions
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {

        addQuestionSet: (state, { payload: { quiz } }) => {
            const exists = state.questionSets.find((qs) => qs.quiz === quiz);
            if (!exists) {
                state.questionSets.push({ _id: uuidv4(), quiz, questions: [] });
            }
        },

        addQuestion: (state, { payload: { quiz, question } }) => {
            const questionSet = state.questionSets.find((qs) => qs.quiz === quiz);
            const newQuestion = { ...question, id: question.id || uuidv4() };
            if (questionSet) {
                questionSet.questions.push(newQuestion);
            } else {
                state.questionSets.push({ _id: uuidv4(), quiz, questions: [newQuestion] });
            }
        },

        updateQuestion: (state, { payload: { quiz, question } }) => {
            const questionSet = state.questionSets.find((qs) => qs.quiz === quiz);
            if (questionSet) {
                questionSet.questions = questionSet.questions.map((q) =>
                    q.id === question.id ? question : q
                );
            }
        },

        deleteQuestion: (state, { payload: { quiz, questionId } }) => {
            const questionSet = state.questionSets.find((qs) => qs.quiz === quiz);
            if (questionSet) {
                questionSet.questions = questionSet.questions.filter(
                    (q) => q.id !== questionId
                );
            }
        },
        updateQuestionSet: (state, { payload: { quiz, questions } }) => {
            const questionSet = state.questionSets.find((qs) => qs.quiz === quiz);
            if (questionSet) {
                questionSet.questions = questions;
            } else {
                state.questionSets.push({ _id: uuidv4(), quiz, questions });
            }
        },
        recordAnswer: (state, { payload: { quiz, questionId, userId, answer } }) => {
            const questionSet = state.questionSets.find((qs) => qs.quiz === quiz);
            if (!questionSet) return;
            const question = questionSet.questions.find((q) => q.id === questionId);
            if (!question) return;
            if (!question.latestAnswers) {
                question.latestAnswers = {};
            }
            // @ts-ignore
            question.latestAnswers[userId] = answer;
        },
    },
}
);

export const { addQuestionSet, addQuestion, updateQuestion, deleteQuestion, updateQuestionSet, recordAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;
