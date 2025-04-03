import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NewQuestionEditor from "./QuizQuestionsEditor";
import { deleteQuestion } from "./reducer";

export default function QuizQuestions() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const { qid } = useParams(); // Extract quiz ID from URL

  const questionSet = useSelector((state: any) =>
    state.questionReducer.questionSets.find((qs: any) => qs.quiz === qid)
  );
  const questions = questionSet ? questionSet.questions : [];

  const handleEdit = (question: any) => {
    setEditingQuestion(question);
    setShowModal(true);
  };

  const handleDelete = (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch(deleteQuestion({ quiz: qid, questionId }));
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingQuestion(null);
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <h2 className="mb-4">Quiz Questions Editor</h2>
      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        New Question
      </button>

      {showModal && (
        <NewQuestionEditor
          onClose={handleCloseModal}
          initialQuestion={editingQuestion}
        />
      )}

      <ul className="list-group">
        {questions.length > 0 ? (
          questions.map((q: any) => (
            <li key={q.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                {q.name} ({q.type}) - {q.points} points
              </span>
              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(q)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </button>
              </div>
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
