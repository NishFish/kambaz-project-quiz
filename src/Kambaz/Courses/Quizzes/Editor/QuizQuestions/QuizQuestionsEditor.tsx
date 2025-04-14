import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import { v4 as uuidv4 } from "uuid";

interface NewQuestionEditorProps {
  onClose: () => void;
  onSaveDraft: (question: any) => void;
  initialQuestion?: any;
}

const NewQuestionEditor = ({
  onClose,
  initialQuestion,
  onSaveDraft,
}: NewQuestionEditorProps) => {
  const { qid } = useParams();

  const [questionType, setQuestionType] = useState(
    initialQuestion ? initialQuestion.type : "Multiple Choice"
  );
  const [questionName, setQuestionName] = useState(
    initialQuestion ? initialQuestion.name : ""
  );
  const [points, setPoints] = useState(initialQuestion ? initialQuestion.points : 0);
  const [questionData, setQuestionData] = useState(initialQuestion || null);

  useEffect(() => {
    if (initialQuestion) {
      setQuestionType(initialQuestion.type);
      setQuestionName(initialQuestion.name);
      setPoints(initialQuestion.points);
      setQuestionData(initialQuestion);
    }
  }, [initialQuestion]);

  const handleQuestionTypeChange = (event: any) => {
    setQuestionType(event.target.value);
    setQuestionData(null);
  };

  const handleSaveQuestion = () => {
    if (!questionData || !questionName.trim()) {
      alert("Please complete the question details before saving.");
      return;
    }

    const completeQuestion = {
      ...questionData,
      id: initialQuestion?.id || questionData.id || uuidv4(),
      name: questionName,
      points,
      type: questionType,
      latestAnswers: {}
    };

    onSaveDraft(completeQuestion);
    onClose();
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex w-75">
                <div className="me-3 w-50">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter question name"
                    value={questionName}
                    onChange={(e) => setQuestionName(e.target.value)}
                  />
                </div>
                <div className="w-50">
                  <select
                    className="form-select"
                    value={questionType}
                    onChange={handleQuestionTypeChange}
                  >
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Fill in the Blank</option>
                  </select>
                </div>
              </div>
              <div className="w-25">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Points"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <hr />

          {questionType === "Multiple Choice" && (
            <MultipleChoiceEditor onSave={setQuestionData} initialData={questionData} />
          )}
          {questionType === "True/False" && (
            <TrueFalseEditor onSave={setQuestionData} initialData={questionData} />
          )}
          {questionType === "Fill in the Blank" && (
            <FillInTheBlankEditor onSave={setQuestionData} initialData={questionData} />
          )}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveQuestion}>
              Save Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionEditor;
