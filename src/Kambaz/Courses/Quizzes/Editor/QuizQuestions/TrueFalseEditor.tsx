import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import styles for the Quill editor

type TrueFalseQuestion = {
  question: string;
  isCorrect: boolean; // Boolean to track if the answer is True or False
};

const TrueFalseEditor = ({ onSave }: { onSave: (question: TrueFalseQuestion) => void }) => {
  const [questionData, setQuestionData] = useState<TrueFalseQuestion>({
    question: "",
    isCorrect: true, // Default to True
  });

  // Handle changes for Question content (WYSIWYG editor)
  const handleQuestionChange = (value: string) => {
    setQuestionData((prev) => ({ ...prev, question: value }));
    onSave({ ...questionData, question: value }); // Notify parent about data change
  };

  // Toggle the correct answer for True or False
  const handleCorrectChange = (value: boolean) => {
    setQuestionData((prev) => {
      const updatedData = { ...prev, isCorrect: value };
      onSave(updatedData); // Notify parent about data change
      return updatedData;
    });
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      {/* Instructions for the user with smaller text */}
      <div className="mb-3">
        <i className="fs-6">Enter the question, then select if the answer is True or False.</i>
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

      {/* True/False Section */}
      <div className="mb-3">
        <label className="form-label fw-bold">Answer</label>
        <div className="d-flex">
          {/* True Option */}
          <div className="form-check me-4">
            <input
              type="radio"
              className="form-check-input"
              id="trueOption"
              checked={questionData.isCorrect}
              onChange={() => handleCorrectChange(true)}
            />
            <label className="form-check-label" htmlFor="trueOption">
              True
            </label>
          </div>

          {/* False Option */}
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              id="falseOption"
              checked={!questionData.isCorrect}
              onChange={() => handleCorrectChange(false)}
            />
            <label className="form-check-label" htmlFor="falseOption">
              False
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseEditor;
