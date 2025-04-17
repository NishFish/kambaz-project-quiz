import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import NewQuestionEditor from "./QuizQuestionsEditor";
import { useNavigate } from "react-router-dom";
import {findQuestionsByQuizId, createQuestion, updateQuestion, deleteQuestion} from "../../client.ts"
import { setQuestions } from "./reducer.ts";
import { v4 as uuidv4 } from "uuid";

export default function QuizQuestions() {
  const dispatch = useDispatch();
  const { qid } = useParams();
  const navigate = useNavigate();

  const questionSet = useSelector((state: any) => state.questionReducer.questionSets);

  const questions = questionSet ? questionSet : [];

  const [draftQuestions, setDraftQuestions] = useState(questions);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    fetchQuestionsForQuiz();
  }, []);

  const fetchQuestionsForQuiz = async () => {
      const questions = await findQuestionsByQuizId(qid!);
      console.log(questions);
      dispatch(setQuestions(questions));
      setDraftQuestions(questions);
    };

  const handleEdit = (question: any) => {
    setEditingQuestion(question);
    setShowModal(true);
  };

  const handleDelete = async (questionId: any) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      await deleteQuestion(questionId);
      setDraftQuestions((prevDrafts: any) =>
        prevDrafts.filter((q: any) => q._id !== questionId)
      );
      setQuestions((prevDrafts: any) =>
        prevDrafts.filter((q: any) => q._id !== questionId)
      );
    }
  };

  const handleSaveDraftQuestion = (question: any) => {
    setDraftQuestions((prevDrafts: any) => {
      const exists = prevDrafts.find((q: any) => q._id === question._id);
      if (exists) {
        return prevDrafts.map((q: any) => (q._id === question._id ? question : q));
      } else {
        return [...prevDrafts, question];
      }
    });
  };

  const handleCommitChanges = async () => {
    draftQuestions.forEach(async (question:any)  => {
      if (question._id && questions.some((q:any) => q._id === question._id)) {
        await updateQuestion(question );
      } else {
        await createQuestion({...question, _id: uuidv4(), quiz: qid});
      }
    });
  
    navigate(-1);
  };

  const handleCancelChanges = () => {
    setDraftQuestions(questions);
    navigate(-1);
  };

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
              key={q._id}
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
                  onClick={() => handleDelete(q._id)}
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
