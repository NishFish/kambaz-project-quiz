import { useState } from "react";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addQuestion } from "./reducer";

const NewQuestionEditor = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const { qid } = useParams(); // Extracts the quiz ID from the URL

  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [questionName, setQuestionName] = useState("");
  const [points, setPoints] = useState(0);
  const [questionData, setQuestionData] = useState<any>(null);

  // Handles changing question type
  const handleQuestionTypeChange = (event: any) => {
    setQuestionType(event.target.value);
    setQuestionData(null); // Reset stored question data
  };

  // Save question data
  const handleSaveQuestion = () => {
    if (!questionData || !questionName.trim()) {
      alert("Please complete the question details before saving.");
      return;
    }

    const completeQuestion = {
      ...questionData,
      name: questionName,
      points,
      type: questionType,
    };

    dispatch(addQuestion({ quiz: qid, question: completeQuestion }));
    onClose(); // Close modal after saving
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
                  <select className="form-select" value={questionType} onChange={handleQuestionTypeChange}>
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
            <MultipleChoiceEditor onSave={setQuestionData} />
          )}
          {questionType === "True/False" && (
            <TrueFalseEditor onSave={setQuestionData} />
          )}
          {questionType === "Fill in the Blank" && (
            <FillInTheBlankEditor onSave={setQuestionData} />
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
