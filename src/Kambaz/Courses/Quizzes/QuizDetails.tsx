import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa"; // For the start button for students
import { BsFillGearFill } from "react-icons/bs"; // For the edit button

// Default quiz data (you can replace this with your actual quiz data)
const exampleQuizDetails = {
  type: "Graded Quiz",
  points: 100,
  assignmentGroup: "Quizzes",
  shuffleAnswers: "Yes",
  timeLimit: "20 Minutes",
  multipleAttempts: "No",
  howManyAttempts: 1,
  showCorrectAnswers: "No",
  accessCode: "",
  oneQuestionAtATime: "Yes",
  webcamRequired: "No",
  lockQuestionsAfterAnswering: "No",
  dueDate: "2025-03-30",
  availableDate: "2025-03-15",
  untilDate: "2025-03-28",
};

export default function QuizDetails() {
  const { qid } = useParams();
  const { cid } = useParams();

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const [quizDetails] = useState(exampleQuizDetails);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    console.log(`Starting quiz: ${qid}`);
  };

  const handleEditQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`);
  };

  const handlePreviewQuiz = () => {
    console.log(`Previewing quiz: ${qid}`);
  };

  return (
    <div className="quiz-details-container">
      {/* Centered Buttons at the top */}
      <div className="buttons-container">
        <button className="btn btn-light me-2" onClick={handleEditQuiz}>
          <BsFillGearFill className="me-2" />
          Edit Quiz
        </button>
        <button className="btn btn-primary" onClick={handlePreviewQuiz}>
          Preview
        </button>
      </div>

      {/* Horizontal line separator */}
      <hr className="my-4" />

      <div className="quiz-details-content">
        {/* Quiz name on the left */}
        <div className="quiz-name mb-4">
          <h3 className="quiz-details-header">{quizDetails.type}</h3>
        </div>

        {/* Centered quiz details */}
        <div className="quiz-details-row">
          <b>Points:</b> {quizDetails.points}
        </div>
        <div className="quiz-details-row">
          <b>Assignment Group:</b> {quizDetails.assignmentGroup}
        </div>
        <div className="quiz-details-row">
          <b>Shuffle Answers:</b> {quizDetails.shuffleAnswers}
        </div>
        <div className="quiz-details-row">
          <b>Time Limit:</b> {quizDetails.timeLimit}
        </div>
        <div className="quiz-details-row">
          <b>Multiple Attempts:</b> {quizDetails.multipleAttempts}
        </div>
        {quizDetails.multipleAttempts === "Yes" && (
          <div className="quiz-details-row">
            <b>How Many Attempts:</b> {quizDetails.howManyAttempts}
          </div>
        )}
        <div className="quiz-details-row">
          <b>Show Correct Answers:</b> {quizDetails.showCorrectAnswers}
        </div>
        <div className="quiz-details-row">
          <b>Access Code:</b> {quizDetails.accessCode || "None"}
        </div>
        <div className="quiz-details-row">
          <b>One Question at a Time:</b> {quizDetails.oneQuestionAtATime}
        </div>
        <div className="quiz-details-row">
          <b>Webcam Required:</b> {quizDetails.webcamRequired}
        </div>
        <div className="quiz-details-row">
          <b>Lock Questions After Answering:</b> {quizDetails.lockQuestionsAfterAnswering}
        </div>
        <div className="quiz-details-row">
          <b>Due Date:</b> {quizDetails.dueDate}
        </div>
        <div className="quiz-details-row">
          <b>Available Date:</b> {quizDetails.availableDate}
        </div>
        <div className="quiz-details-row">
          <b>Until Date:</b> {quizDetails.untilDate}
        </div>

        {currentUser.role === "STUDENT" && (
          <div className="start-quiz-button mt-4">
            <button className="btn btn-lg btn-success" onClick={handleStartQuiz}>
              <FaPlay className="me-2" />
              Start Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}