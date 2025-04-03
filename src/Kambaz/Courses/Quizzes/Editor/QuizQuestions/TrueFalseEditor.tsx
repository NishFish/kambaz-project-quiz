import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type TrueFalseQuestion = {
  question: string;
  isCorrect: boolean; // true means the answer is True, false means False
  id?: string;
};

interface TrueFalseEditorProps {
  onSave: (question: TrueFalseQuestion) => void;
  initialData?: TrueFalseQuestion | null;
}

const TrueFalseEditor = ({ onSave, initialData }: TrueFalseEditorProps) => {
  const [questionData, setQuestionData] = useState<TrueFalseQuestion>(
    initialData || { question: "", isCorrect: true }
  );

  useEffect(() => {
    if (initialData) {
      setQuestionData(initialData);
    }
  }, [initialData]);

  const handleQuestionChange = (value: string) => {
    const updated = { ...questionData, question: value };
    setQuestionData(updated);
    onSave(updated);
  };

  const handleCorrectChange = (value: boolean) => {
    const updated = { ...questionData, isCorrect: value };
    setQuestionData(updated);
    onSave(updated);
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <div className="mb-3">
        <i className="fs-6">
          Enter the question, then select if the answer is True or False.
        </i>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Question</label>
        <ReactQuill
          value={questionData.question}
          onChange={handleQuestionChange}
          placeholder="Enter question description"
          theme="snow"
          modules={{ toolbar: [["bold", "italic", "underline"], ["link"]] }}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Answer</label>
        <div className="d-flex">
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
