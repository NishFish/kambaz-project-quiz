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
                shuffleAnswers: quiz.shuffleAnswers,
                timeLimit: quiz.timeLimit || "20 Minutes",
                multipleAttempts: quiz.multipleAttempts,
                howManyAttempts: quiz.multipleAttempts ? (quiz.howManyAttempts || 1) : 1,
                showCorrectAnswers: quiz.showCorrectAnswers,
                accessCode: quiz.accessCode || "",
                oneQuestionAtATime: quiz.oneQuestionAtATime,
                webcamRequired: quiz.webcamRequired,
                lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
                dueDate: quiz.dueDate || "",
                availableDate: quiz.availableDate || "",
                availableUntilDate: quiz.availableUntilDate || "",
                course: quiz.course,
                published: quiz.published,
                score: quiz.score || []
            };
            state.quizzes = [...state.quizzes, newQuiz];
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
        togglePublish: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q) =>
                q._id === quizId
                    ? {
                        ...q,
                        published: q.published === "true" ? "false" : "true",
                    }
                    : q
            );
        },
        updateScore: (state, { payload: { quizId, newScore, username } }) => {
            state.quizzes = state.quizzes.map((quiz: any) => {
                if (quiz._id === quizId) {
                    const updatedScores = {
                        ...quiz.score,
                        [username]: quiz.score[username] ? [...quiz.score[username], newScore] : [newScore]
                    };

                    return {
                        ...quiz,
                        score: updatedScores,
                        howManyAttempts: (quiz.howManyAttempts || 0) + 1,
                    };
                }
                return quiz;
            });
        },

    },
});

export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, togglePublish, updateScore } = quizzesSlice.actions;
export default quizzesSlice.reducer;
