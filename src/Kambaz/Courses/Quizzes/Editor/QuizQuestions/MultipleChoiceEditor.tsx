import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import styles for the Quill editor

type MultipleChoiceQuestion = {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
};

const MultipleChoiceEditor = ({ onSave, onCancel }: { onSave: (question: MultipleChoiceQuestion) => void; onCancel: () => void }) => {
  const [questionData, setQuestionData] = useState<MultipleChoiceQuestion>({
    question: "",
    choices: [{ text: "", isCorrect: false }],
  });

  // Handle changes for Question content (WYSIWYG editor)
  const handleQuestionChange = (value: string) => {
    setQuestionData((prev) => ({ ...prev, question: value }));
  };

  // Handle choice text change
  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = [...questionData.choices];
    newChoices[index].text = text;
    setQuestionData((prev) => ({ ...prev, choices: newChoices }));
  };

  // Toggle the correct answer for a choice
  const handleCorrectChange = (index: number) => {
    const newChoices = questionData.choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setQuestionData((prev) => ({ ...prev, choices: newChoices }));
  };

  // Add a new choice
  const addChoice = () => {
    setQuestionData((prev) => ({
      ...prev,
      choices: [...prev.choices, { text: "", isCorrect: false }],
    }));
  };

  // Remove a choice
  const removeChoice = (index: number) => {
    const newChoices = questionData.choices.filter((_, i) => i !== index);
    setQuestionData((prev) => ({ ...prev, choices: newChoices }));
  };

  // Handle the Save button
  const handleSave = () => {
    onSave(questionData);
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      {/* Instructions for the user with smaller text */}
      <div className="mb-3">
        <i className="fs-10">Enter the question, then multiple answers. Mark the answers that are correct.</i>
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

      {/* Choices Section */}
      <div className="mb-3">
        <label className="form-label fw-bold">Answers</label>
        {questionData.choices.map((choice, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={choice.text}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
              placeholder={`Answer ${index + 1}`}
            />
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                checked={choice.isCorrect}
                onChange={() => handleCorrectChange(index)}
              />
              <label className="form-check-label">Correct</label>
            </div>
            {/* Remove Choice Button */}
            {questionData.choices.length > 1 && (
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={() => removeChoice(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addChoice}>
          Add Answer
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceEditor;