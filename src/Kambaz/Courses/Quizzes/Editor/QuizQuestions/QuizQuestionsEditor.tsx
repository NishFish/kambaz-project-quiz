import { useState } from "react";
import MultipleChoiceEditor from "./MultipleChoiceEditor"; // Import your MultipleChoiceEditor
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";

const NewQuestionEditor = ({ onClose }: { onClose: () => void }) => {
  // State to track selected question type
  const [questionType, setQuestionType] = useState<string>("Multiple Choice");

  // Handle change in question type dropdown
  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionType(e.target.value);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block" }}
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg"> {/* Add modal-lg class for wider modal */}
        <div className="modal-content">
          <div className="modal-header">
            {/* Header Section with editable fields */}
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex w-75">
                {/* Question Name on the left */}
                <div className="me-3 w-50">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter question name"
                  />
                </div>

                {/* Question Type dropdown */}
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

              {/* Points field on the right */}
              <div className="w-25">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Points"
                />
              </div>
            </div>
          </div>

          {/* Separator */}
          <hr />

          {/* Render the appropriate editor based on selected question type */}
          {questionType === "Multiple Choice" && (
            <MultipleChoiceEditor onSave={() => {}} onCancel={onClose} />
          )}
          {questionType === "True/False" && (
            <TrueFalseEditor onSave={() => {}} onCancel={onClose} />
          )}
          {questionType === "Fill in the Blank" && (
            <FillInTheBlankEditor onSave={() => {}} onCancel={onClose} />
          )}

          {/* Footer Section with action buttons */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQuestionEditor;