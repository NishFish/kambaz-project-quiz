import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NewQuestionEditor from "./QuizQuestionsEditor";

export default function QuizQuestions() {
  const [showModal, setShowModal] = useState(false);
  const { qid } = useParams(); // Extract quiz ID from URL
  const questionSet = useSelector((state: any) =>
    state.questionReducer.questionSets.find((qs: any) => qs.quiz === qid)
  );
  const questions = questionSet ? questionSet.questions : [];

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <h2 className="mb-4">Quiz Questions Editor</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        New Question
      </button>

      {showModal && <NewQuestionEditor onClose={() => setShowModal(false)} />}

      <ul className="list-group">
        {questions.length > 0 ? (
          questions.map((q: any) => (
            <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
              {q.name} ({q.type}) - {q.points} points
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No questions added yet.</li>
        )}
      </ul>

      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-outline-secondary">Cancel</button>
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}
