import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    questionSets: []
};

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, { payload: questions }) => {
            state.questionSets = questions;
        },
        addQuestionSet: (state: any, { payload: { quiz } }) => {
            const exists = state.questionSets.find((qs: any) => qs.quiz === quiz);
            if (!exists) {
                state.questionSets.push({ _id: uuidv4(), quiz, questions: [] });
            }
        },

        addQuestion: (state: any, { payload: { quiz, question } }) => {
            const questionSet = state.questionSets.find((qs: any) => qs.quiz === quiz);
            const newQuestion = { ...question, id: question.id || uuidv4() };
            if (questionSet) {
                questionSet.questions.push(newQuestion);
            } else {
                state.questionSets.push({ _id: uuidv4(), quiz, questions: [newQuestion] });
            }
        },

        updateQuestion: (state: any, { payload: { quiz, question } }) => {
            const questionSet = state.questionSets.find((qs: any) => qs.quiz === quiz);
            if (questionSet) {
                questionSet.questions = questionSet.questions.map((q: any) =>
                    q.id === question.id ? question : q
                );
            }
        },

        deleteQuestion: (state: any, { payload: { quiz, questionId } }) => {
            const questionSet = state.questionSets.find((qs: any) => qs.quiz === quiz);
            if (questionSet) {
                questionSet.questions = questionSet.questions.filter(
                    (q: any) => q.id !== questionId
                );
            }
        },
        updateQuestionSet: (state: any, { payload: { quiz, questions } }) => {
            const questionSet = state.questionSets.find((qs: any) => qs.quiz === quiz);
            if (questionSet) {
                questionSet.questions = questions;
            } else {
                state.questionSets.push({ _id: uuidv4(), quiz, questions });
            }
        },
        recordAnswer: (state: any, { payload: { quiz, questionId, userId, answer } }) => {
            const questionSet = state.questionSets.find((qs: any) => qs.quiz === quiz);
            if (!questionSet) return;
            const question = questionSet.questions.find((q: any) => q.id === questionId);
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

export const { addQuestionSet, addQuestion, updateQuestion, deleteQuestion, updateQuestionSet, recordAnswer, setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
