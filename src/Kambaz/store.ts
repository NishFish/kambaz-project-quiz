import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer"
import quizzesReducer from "./Courses/Quizzes/reducer";
import questionReducer from "./Courses/Quizzes/Editor/QuizQuestions/reducer";

const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentsReducer,
        quizzesReducer,
        questionReducer
    },
});
export default store;