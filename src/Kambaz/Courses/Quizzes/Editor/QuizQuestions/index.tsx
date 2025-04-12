import { useState } from "react";
import NewQuestionEditor from "./QuizQuestionsEditor";

export default function QuizQuestions() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <h2 className="mb-4">Quiz Questions Editor</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        New Question
      </button>

      {showModal && <NewQuestionEditor onClose={() => setShowModal(false)} />}

      <ul className="list-group">
        {/* List of questions will be displayed here we need to make a route so if this gets clciked we edit it?*/}
      </ul>

      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-outline-secondary">Cancel</button>
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}