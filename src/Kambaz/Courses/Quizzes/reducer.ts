import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { quizes } from "../../Database";


const initialState = {
    quizzes: quizes
};

const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        addQuiz: (state, { payload: quiz }) => {
            const newQuiz = {
                _id: uuidv4(),
                title: quiz.title || "",
                quizType: quiz.quizType || "Graded Quiz",
                assignmentGroup: quiz.assignmentGroup || "Quizzes",
                points: quiz.points || 0,
                numberOfQuestions: quiz.numberOfQuestions || 0,
                shuffleAnswers: quiz.shuffleAnswers || "Yes",
                timeLimit: quiz.timeLimit || "20 Minutes",
                multipleAttempts: quiz.multipleAttempts || "No",
                howManyAttempts:
                    quiz.multipleAttempts === "Yes" ? (quiz.howManyAttempts || 1) : 1,
                showCorrectAnswers: quiz.showCorrectAnswers || false,
                accessCode: quiz.accessCode || "",
                oneQuestionAtATime: quiz.oneQuestionAtATime || "Yes",
                webcamRequired: quiz.webcamRequired || "No",
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || "No",
                dueDate: quiz.dueDate || "",
                availableDate: quiz.availableDate || "",
                availableUntilDate: quiz.availableUntilDate || "",
                course: quiz.course,
                published: quiz.published || false,
                score: quiz.score || 0
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q) =>
                q._id === quiz._id ? quiz : q
            );
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q) =>
                q._id === quizId ? { ...q, editing: true } : q
            );
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
