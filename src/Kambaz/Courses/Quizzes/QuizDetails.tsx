import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa"; // For the start button for students
import { BsFillGearFill } from "react-icons/bs"; // For the edit button
import "./styles.css";

// Default quiz data (fallback)
const exampleQuizDetails = {
  title: "Graded Quiz",
  points: 100,
  assignmentGroup: "Quizzes",
  shuffleAnswers: false,
  timeLimit: "20 Minutes",
  multipleAttempts: false,
  howManyAttempts: 1,
  showCorrectAnswers: false,
  accessCode: "",
  oneQuestionAtATime: true,
  webcamRequired: false,
  lockQuestionsAfterAnswering: false,
  published: true,
  dueDate: "2025-03-30",
  availableDate: "2025-03-15",
  availableUntilDate: "2026-03-28",
  score: {},
  userAttempts: {}
};

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const quizDetails =
    useSelector((state: any) =>
      state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
    ) || exampleQuizDetails;

  // Helper function to convert booleans to "Yes"/"No"
  const boolToStr = (value: any) => (value ? "Yes" : "No");

  const handleStartQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleViewQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/previewAttempt`);
  };

  const handleEditQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`);
  };

  const handlePreviewQuiz = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const getAvailability = (quiz: any) => {
    const currentDate = new Date();

    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);
    if (String(quiz.published) === "false") {
      return false;
    }
    if (currentDate > availableUntilDate) {
      return false;
    } else if (currentDate >= availableDate && currentDate <= availableUntilDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="quiz-details-container">
      {currentUser.role === "FACULTY" && (
        <div className="buttons-container">
          <button className="btn btn-light me-2" onClick={handleEditQuiz}>
            <BsFillGearFill className="me-2" />
            Edit Quiz
          </button>
          <button className="btn btn-primary" onClick={handlePreviewQuiz}>
            Preview
          </button>
        </div>
      )}

      <hr className="my-4" />

      <div className="quiz-details-content">
        <div className="quiz-name mb-4">
          <h3 className="quiz-details-header">{quizDetails.title}</h3>
        </div>

        <div className="quiz-details-row">
          <b>Points:</b> {quizDetails.points}
        </div>
        <div className="quiz-details-row">
          <b>Assignment Group:</b> {quizDetails.assignmentGroup}
        </div>
        <div className="quiz-details-row">
          <b>Shuffle Answers:</b> {boolToStr(quizDetails.shuffleAnswers)}
        </div>
        <div className="quiz-details-row">
          <b>Time Limit:</b> {quizDetails.timeLimit}
        </div>
        <div className="quiz-details-row">
          <b>Multiple Attempts:</b> {boolToStr(quizDetails.multipleAttempts)}
        </div>
        {quizDetails.multipleAttempts && (
          <div className="quiz-details-row">
            <b>How Many Attempts:</b> {quizDetails.howManyAttempts}
          </div>
        )}
        <div className="quiz-details-row">
          <b>Show Correct Answers:</b> {boolToStr(quizDetails.showCorrectAnswers)}
        </div>
        <div className="quiz-details-row">
          <b>Access Code:</b> {quizDetails.accessCode || "None"}
        </div>
        <div className="quiz-details-row">
          <b>One Question at a Time:</b> {boolToStr(quizDetails.oneQuestionAtATime)}
        </div>
        <div className="quiz-details-row">
          <b>Webcam Required:</b> {boolToStr(quizDetails.webcamRequired)}
        </div>
        <div className="quiz-details-row">
          <b>Lock Questions After Answering:</b> {boolToStr(quizDetails.lockQuestionsAfterAnswering)}
        </div>
        <div className="quiz-details-row">
          <b>Due Date:</b> {quizDetails.dueDate}
        </div>
        <div className="quiz-details-row">
          <b>Available Date:</b> {quizDetails.availableDate}
        </div>
        <div className="quiz-details-row">
          <b>Until Date:</b> {quizDetails.availableUntilDate}
        </div>

        {currentUser.role === "STUDENT" && (
          <div className="mt-3">
            <b>Remaining Attempts:</b>{" "}
            {quizDetails.howManyAttempts - (quizDetails.userAttempts[currentUser._id] || 0)}
          </div>
        )}

        {currentUser.role === "STUDENT" &&
          quizDetails.multipleAttempts === "true" &&
          (quizDetails.userAttempts[currentUser._id] || 0) < quizDetails.howManyAttempts &&
          getAvailability(quizDetails)  && (
            <div className="start-quiz-button mt-4">
              <button className="btn btn-lg btn-success" onClick={handleStartQuiz}>
                <FaPlay className="me-2" />
                Start Quiz
              </button>
            </div>
          )}


        {currentUser.role === "STUDENT" && (
          <div className="start-quiz-button mt-4">
            <button className="btn btn-lg btn-danger" onClick={handleViewQuiz}>
              <FaPlay className="me-2" />
              View Last Attempt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
