import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import ContextMenu from "./QuizContextMenu";
import { v4 as uuidv4 } from 'uuid';
import "./styles.css"
import { deleteQuiz, setQuizzes, togglePublish } from "./reducer";
import { CiSearch } from "react-icons/ci";
import {findAllQuizzesFromCourse, togglePublishQuiz, deleteQuizz} from "./client.ts";
//increase/decreate number of questions when added/removed

export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    const newQuizId = uuidv4();
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${newQuizId}/editor`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    await deleteQuizz(quizId);
    dispatch(deleteQuiz(quizId))
  };

  const handlePublishQuiz = async (quizId: string) => {
    await togglePublishQuiz(quizId);
    dispatch(togglePublish(quizId));
  };

  const handleCopyQuiz = (quizId: string) => {
    console.log(`Copying quiz: ${quizId}`);
  };

  const toggleMenu = (quizId: string) => {
    setActiveMenu((prevState) => (prevState === quizId ? null : quizId));
  };

  const fetchQuizzesForCourse = async () => {
    const quizzes = await findAllQuizzesFromCourse(cid!);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzesForCourse();
  }, [cid]);

  const getAvailability = (quiz: any) => {
    const currentDate = new Date();

    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);
    if (String(quiz.published) === "false") {
      return "Closed";
    }
    if (currentDate > availableUntilDate) {
      return "Closed";
    } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
      return "Available";
    } else {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    }
  };

  return (
    <div id="wd-quizzes" className="quizzes-container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="search-container d-flex align-items-center">
          <CiSearch className="search-icon me-2" />
          <input
            type="text"
            id="wd-search-quiz"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {currentUser.role === "FACULTY" && (
          <button
            id="wd-add-quiz-btn"
            className="btn btn-lg btn-danger"
            onClick={handleClick}
          >
            <FaPlus className="position-relative me-2" />
            Quiz
          </button>
        )}
      </div>
      <hr></hr>
      <div className="quiz-header">
        <GoTriangleUp className="dropdown-icon" />
        <span>Quizzes</span>
      </div>

      <ul id="wd-quiz-list" className="list-group rounded-0">
        {quizzes
          
          .filter((quiz: any) =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((quiz: any) => (
            <li key={quiz._id} className="list-group-item py-3 px-3 quiz-list-item">
              <div className="d-flex align-items-center justify-content-between">
                <div className="flex-grow-1">
                  <a
                    href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                    className="wd-quiz-link fw-bold text-dark text-decoration-none"
                  >
                    <div className="wd-quiz-name">{quiz.title}</div>
                  </a>

                  <div className="wd-quiz-info">
                    <p className="mb-1 text-muted">
                      <b>Availability</b>: {getAvailability(quiz)} &nbsp; | &nbsp;
                      <b>Due</b>: {quiz.dueDate} &nbsp; | &nbsp; {quiz.points} points &nbsp; | &nbsp;
                      <b>Number of questions</b>: {quiz.numberOfQuestions}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  {String(quiz.published) === "false" ? (
                    <span className="me-2" style={{ fontSize: "20px" }}>🚫</span>
                  ) : (
                    <FaCheckCircle
                      className="me-2"
                      style={{ fontSize: "20px", color: "#28a745" }}
                    />
                  )}
                  {currentUser.role === "FACULTY" && (
                    <div>
                      <button
                        className="btn btn-link"
                        onClick={() => toggleMenu(quiz._id)}
                      >
                        <BsGripVertical className="fs-3" />
                      </button>

                      <ContextMenu
                        quizId={quiz._id}
                        cid={cid}
                        isActive={activeMenu === quiz._id}
                        isPublished={String(quiz.published) === "false"}
                        onDelete={handleDeleteQuiz}
                        togglePublish={handlePublishQuiz}
                        onCopy={handleCopyQuiz}
                        onClose={() => setActiveMenu(null)} // Close the menu
                      />
                    </div>
                  )}
                </div>

                {currentUser.role === "STUDENT" && (
                  <div className="d-flex flex-column align-items-end">
                    {quiz.score && quiz.score[currentUser._id] !== undefined ? (
                      <p className="mb-1 text-muted">
                        <b>Score</b>: {
                          Array.isArray(quiz.score[currentUser._id]) && quiz.score[currentUser._id].length > 0
                            ? quiz.score[currentUser._id][quiz.score[currentUser._id].length - 1]
                            : "Not attempted yet"
                        }
                      </p>
                    ) : (
                      <p className="mb-1 text-muted">
                        <b>Score</b>: {"Not attempted yet"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}