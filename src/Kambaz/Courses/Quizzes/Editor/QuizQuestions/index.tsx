import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NewQuestionEditor from "./QuizQuestionsEditor";
import { useNavigate } from "react-router-dom";
import { updateQuestionSet } from "./reducer";

export default function QuizQuestions() {
  const dispatch = useDispatch();
  const { qid } = useParams();
  const navigate = useNavigate();

  const questionSet = useSelector((state: any) =>
    state.questionReducer.questionSets.find((qs: any) => qs.quiz === qid)
  );
  const questions = questionSet ? questionSet.questions : [];

  const [draftQuestions, setDraftQuestions] = useState(questions);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    setDraftQuestions(questions);
  }, [questions]);

  const handleEdit = (question: any) => {
    setEditingQuestion(question);
    setShowModal(true);
  };

  const handleDelete = (questionId: any) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setDraftQuestions((prevDrafts: any) =>
        prevDrafts.filter((q: any) => q.id !== questionId)
      );
    }
  };

  const handleSaveDraftQuestion = (question: any) => {
    setDraftQuestions((prevDrafts: any) => {
      const exists = prevDrafts.find((q: any) => q.id === question.id);
      if (exists) {
        return prevDrafts.map((q: any) => (q.id === question.id ? question : q));
      } else {
        return [...prevDrafts, question];
      }
    });
  };

  const handleCommitChanges = () => {
    dispatch(updateQuestionSet({ quiz: qid, questions: draftQuestions }));
    navigate(-1);
  };

  const handleCancelChanges = () => {
    setDraftQuestions(questions);
    navigate(-1);
  };

  console.log(questionSet)
  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <h2 className="mb-4">Quiz Questions Editor</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          setEditingQuestion(null);
          setShowModal(true);
        }}
      >
        New Question
      </button>

      {showModal && (
        <NewQuestionEditor
          onClose={() => {
            setShowModal(false);
            setEditingQuestion(null);
          }}
          initialQuestion={editingQuestion}
          onSaveDraft={handleSaveDraftQuestion}
        />
      )}

      <ul className="list-group">
        {draftQuestions.length > 0 ? (
          draftQuestions.map((q: any) => (
            <li
              key={q.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
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
          <li className="list-group-item text-muted">
            No questions added yet.
          </li>
        )}
      </ul>

      <div className="mt-4 d-flex justify-content-between">
        <button className="btn btn-outline-secondary" onClick={handleCancelChanges}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleCommitChanges}>
          Save
        </button>
      </div>
    </div>
  );
}
