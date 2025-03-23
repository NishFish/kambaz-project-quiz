import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import styles for the Quill editor

type FillInTheBlankQuestion = {
  question: string;
  blanks: string[]; // List of possible correct answers for the blank
};

const FillInTheBlankEditor = ({ onSave, onCancel }: { onSave: (question: FillInTheBlankQuestion) => void; onCancel: () => void }) => {
  const [questionData, setQuestionData] = useState<FillInTheBlankQuestion>({
    question: "",
    blanks: [""], // Start with one blank answer field
  });

  // Handle changes for Question content (WYSIWYG editor)
  const handleQuestionChange = (value: string) => {
    setQuestionData((prev) => ({ ...prev, question: value }));
  };

  // Handle blank answer change
  const handleBlankChange = (index: number, text: string) => {
    const newBlanks = [...questionData.blanks];
    newBlanks[index] = text;
    setQuestionData((prev) => ({ ...prev, blanks: newBlanks }));
  };

  // Add a new blank answer
  const addBlank = () => {
    setQuestionData((prev) => ({
      ...prev,
      blanks: [...prev.blanks, ""], // Add a new blank field
    }));
  };

  // Remove a blank answer
  const removeBlank = (index: number) => {
    const newBlanks = questionData.blanks.filter((_, i) => i !== index);
    setQuestionData((prev) => ({ ...prev, blanks: newBlanks }));
  };

  // Handle the Save button
  const handleSave = () => {
    onSave(questionData);
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      {/* Instructions for the user */}
      <div className="mb-3">
        <i className="fs-6">Enter the question with a blank, then specify possible correct answers.</i>
      </div>

      {/* Question Text (WYSIWYG Editor) */}
      <div className="mb-3">
        <label className="form-label fw-bold">Question</label>
        <ReactQuill
          value={questionData.question}
          onChange={handleQuestionChange}
          placeholder="Enter question description"
          theme="snow"
          modules={{ toolbar: [['bold', 'italic', 'underline'], ['link']] }}
        />
      </div>

      {/* Blank Answers Section */}
      <div className="mb-3">
        <label className="form-label fw-bold">Possible Answers for the Blank</label>
        {questionData.blanks.map((blank, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={blank}
              onChange={(e) => handleBlankChange(index, e.target.value)}
              placeholder={`Possible Answer ${index + 1}`}
            />
            {/* Remove Blank Button */}
            {questionData.blanks.length > 1 && (
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeBlank(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addBlank}>
          Add Another Possible Answer
        </button>
      </div>
    </div>
  );
};

export default FillInTheBlankEditor;