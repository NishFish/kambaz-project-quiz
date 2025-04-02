import Kambaz from "./Kambaz";
import QuizQuestions from "./Kambaz/Courses/Quizzes/Editor/QuizQuestions";
import store from "./Kambaz/store";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kambaz" />} />
            <Route path="/Kambaz/*" element={<Kambaz />} />
            <Route path="*/editor" element={<QuizQuestions />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}
