import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaCheckCircle } from "react-icons/fa"; // Import check circle icon
import { GoTriangleUp } from "react-icons/go"; // For the dropdown triangle
import ContextMenu from "./QuizContextMenu"; // Import the new ContextMenu component
import { v4 as uuidv4 } from 'uuid';
import "./styles.css"
import { deleteQuiz } from "./reducer";
import { CiSearch } from "react-icons/ci";


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

  const handleDeleteQuiz = (quizId: string) => {
    dispatch(deleteQuiz(quizId))
  };

  const handlePublishQuiz = (quizId: string) => {
    console.log(`Publishing/unpublishing quiz: ${quizId}`);
  };

  const handleCopyQuiz = (quizId: string) => {
    console.log(`Copying quiz: ${quizId}`);
  };

  const toggleMenu = (quizId: string) => {
    setActiveMenu((prevState) => (prevState === quizId ? null : quizId));
  };

  // Function to calculate availability status
  const getAvailability = (quiz: any) => {
    const currentDate = new Date();

    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);

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
      {/* Header with dropdown triangle */}
      <div className="quiz-header">
        <GoTriangleUp className="dropdown-icon" />
        <span>Quizzes</span>
      </div>

      <ul id="wd-quiz-list" className="list-group rounded-0">
        {quizzes
          .filter((quiz: any) => quiz.course === cid)
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
                    <div className="wd-quiz-name">{quiz.title}</div> {/* Larger quiz name */}
                  </a>

                  {/* Display Availabil   ity and other quiz details */}
                  <div className="wd-quiz-info">
                    <p className="mb-1 text-muted">
                      <b>Availability</b>: {getAvailability(quiz)} &nbsp; | &nbsp;
                      <b>Due</b>: {quiz.dueDate} &nbsp; | &nbsp; {quiz.points} points &nbsp; | &nbsp;
                      <b>Number of questions</b>: {quiz.numberOfQuestions}
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-end">
                  {/* Display Score if student */}
                  {currentUser.role === "STUDENT" && quiz.score && (
                    <p className="mb-1 text-muted">
                      <b>Score</b>: {quiz.score}
                    </p>
                  )}
                </div>

                {currentUser.role === "FACULTY" && (
                  <div className="d-flex align-items-center">
                    {/* Checkmark moved to the left */}
                    <FaCheckCircle
                      className="me-2" // Add margin to the right for spacing
                      style={{
                        fontSize: "20px",
                        color: quiz.published ? "#28a745" : "#6c757d", // Green if published, lighter if not
                      }}
                    />

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
                      isPublished={quiz.published}
                      onDelete={handleDeleteQuiz}
                      togglePublish={handlePublishQuiz}
                      onCopy={handleCopyQuiz}
                      onClose={() => setActiveMenu(null)} // Close the menu
                    />
                  </div>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}