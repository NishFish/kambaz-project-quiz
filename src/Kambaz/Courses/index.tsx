import CourseNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import QuizEditor from "./Quizzes/Editor";
import QuizList from "./Quizzes";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/Editor/Preview";
import QuizPreviewAttempt from "./Quizzes/Editor/Preview/previewAttempt";



export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />{course && course.name} &gt; {pathname.split("/")[4]}</h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<QuizList />} />
            <Route path="Quizzes/:qid/editor" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid/previewAttempt" element={<QuizPreviewAttempt />} />

            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div></div>

    </div>
  );
}
