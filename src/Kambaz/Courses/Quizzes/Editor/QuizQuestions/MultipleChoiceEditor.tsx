import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type MultipleChoiceQuestion = {
  id?: string;
  question: string;
  choices: { text: string; isCorrect: boolean }[];
};

interface MultipleChoiceEditorProps {
  onSave: (question: MultipleChoiceQuestion) => void;
  initialData?: MultipleChoiceQuestion | null;
}

const MultipleChoiceEditor = ({ onSave, initialData }: MultipleChoiceEditorProps) => {
  const [questionData, setQuestionData] = useState<MultipleChoiceQuestion>({
    question: "",
    choices: [{ text: "", isCorrect: false }],
  });

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setQuestionData(initialData);
    }
  }, [initialData]);

  const handleQuestionChange = (value: string) => {
    setQuestionData((prev) => {
      const updated = { ...prev, question: value };
      onSave(updated);
      return updated;
    });
  };

  const handleChoiceChange = (index: number, text: string) => {
    setQuestionData((prev) => {
      const newChoices = prev.choices.map((choice, i) =>
        i === index ? { ...choice, text } : choice
      );
      const updated = { ...prev, choices: newChoices };
      onSave(updated);
      return updated;
    });
  };

  const handleCorrectChange = (index: number) => {
    setQuestionData((prev) => {
      const newChoices = prev.choices.map((choice, i) => ({
        ...choice,
        isCorrect: i === index, // Only one choice can be correct
      }));
      const updated = { ...prev, choices: newChoices };
      onSave(updated);
      return updated;
    });
  };

  const addChoice = () => {
    setQuestionData((prev) => {
      const updated = {
        ...prev,
        choices: [...prev.choices, { text: "", isCorrect: false }],
      };
      onSave(updated);
      return updated;
    });
  };

  const removeChoice = (index: number) => {
    setQuestionData((prev) => {
      const updatedChoices = prev.choices.filter((_, i) => i !== index);
      const updated = { ...prev, choices: updatedChoices };
      onSave(updated);
      return updated;
    });
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <div className="mb-3">
        <i className="fs-6">
          Enter the question, then multiple answers. Mark one answer as correct.
        </i>
      </div>

      {/* Question Input */}
      <div className="mb-3">
        <label className="form-label fw-bold">Question</label>
        <ReactQuill
          value={questionData.question}
          onChange={handleQuestionChange}
          placeholder="Enter question"
          theme="snow"
          modules={{ toolbar: [["bold", "italic", "underline"], ["link"]] }}
        />
      </div>

      {/* Choices Input */}
      <div className="mb-3">
        <label className="form-label fw-bold">Answers</label>
        {questionData.choices.map((choice, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              value={choice.text}
              placeholder={`Choice ${index + 1}`}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
            <input
              type="radio"
              name="correctAnswer"
              checked={choice.isCorrect}
              onChange={() => handleCorrectChange(index)}
            />
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => removeChoice(index)}
              disabled={questionData.choices.length === 1}
            >
              -
            </button>
          </div>
        ))}
        <button className="btn btn-secondary mt-2" onClick={addChoice}>
          Add Choice
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceEditor;
