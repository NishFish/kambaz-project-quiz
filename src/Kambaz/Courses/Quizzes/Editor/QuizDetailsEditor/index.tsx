import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizDetails() {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState("Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
  const [points, setPoints] = useState(0);
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimit, setTimeLimit] = useState(20);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestions, setLockQuestions] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const handleCancel = () => {
    
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <h2 className="mb-4">Quiz Details Editor</h2>
      
      <label className="form-label">Title</label>
      <input type="text" className="form-control" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder="Enter quiz title" />
      
      <label className="form-label mt-3">Description</label>
      <ReactQuill value={description} onChange={setDescription} className="mb-3" />
      
      <label className="form-label mt-3">Quiz Type</label>
      <select className="form-select" value={quizType} onChange={(e) => setQuizType(e.target.value)}>
        <option>Graded Quiz</option>
        <option>Practice Quiz</option>
        <option>Graded Survey</option>
        <option>Ungraded Survey</option>
      </select>
      
      <label className="form-label mt-3">Assignment Group</label>
      <select className="form-select" value={assignmentGroup} onChange={(e) => setAssignmentGroup(e.target.value)}>
        <option>Quizzes</option>
        <option>Exams</option>
        <option>Assignments</option>
        <option>Project</option>
      </select>
      
      <label className="form-label mt-3">Points</label>
      <input type="number" className="form-control" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
      
      <div className="form-check mt-3">
        <input type="checkbox" className="form-check-input" checked={shuffleAnswers} onChange={() => setShuffleAnswers(!shuffleAnswers)} />
        <label className="form-check-label">Shuffle Answers</label>
      </div>
      
      <label className="form-label mt-3">Time Limit (minutes)</label>
      <input type="number" className="form-control" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} />
      
      <div className="form-check mt-3">
        <input type="checkbox" className="form-check-input" checked={multipleAttempts} onChange={() => setMultipleAttempts(!multipleAttempts)} />
        <label className="form-check-label">Allow Multiple Attempts</label>
      </div>
      
      <div className="form-check mt-3">
        <input type="checkbox" className="form-check-input" checked={showCorrectAnswers} onChange={() => setShowCorrectAnswers(!showCorrectAnswers)} />
        <label className="form-check-label">Show Correct Answers</label>
      </div>
      
      <label className="form-label mt-3">Access Code</label>
      <input type="text" className="form-control" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="Enter access code" />
      
      <div className="form-check mt-3">
        <input type="checkbox" className="form-check-input" checked={oneQuestionAtATime} onChange={() => setOneQuestionAtATime(!oneQuestionAtATime)} />
        <label className="form-check-label">One Question at a Time</label>
      </div>
      
      <div className="form-check mt-3">
        <input type="checkbox" className="form-check-input" checked={webcamRequired} onChange={() => setWebcamRequired(!webcamRequired)} />
        <label className="form-check-label">Webcam Required</label>
      </div>
      
      <div className="form-check mt-3">
        <input type="checkbox" className="form-check-input" checked={lockQuestions} onChange={() => setLockQuestions(!lockQuestions)} />
        <label className="form-check-label">Lock Questions After Answering</label>
      </div>
      
      <label className="form-label mt-3">Due Date</label>
      <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      
      <label className="form-label mt-3">Available From</label>
      <input type="date" className="form-control" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)} />
      
      <label className="form-label mt-3">Until</label>
      <input type="date" className="form-control" value={availableUntil} onChange={(e) => setAvailableUntil(e.target.value)} />
      
      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={handleCancel}>Cancel</button>
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}