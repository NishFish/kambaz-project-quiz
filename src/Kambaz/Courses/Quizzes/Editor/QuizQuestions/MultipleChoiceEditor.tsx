import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

type MultipleChoiceQuestion = {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
};

const MultipleChoiceEditor = ({ onSave }: { onSave: (question: MultipleChoiceQuestion) => void }) => {
  const [questionData, setQuestionData] = useState<MultipleChoiceQuestion>({
    question: "",
    choices: [{ text: "", isCorrect: false }],
  });

  const handleQuestionChange = (value: string) => {
    setQuestionData((prev) => {
      const updatedData = { ...prev, question: value };
      onSave(updatedData); // Notify parent about data change
      return updatedData;
    });
  };

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = [...questionData.choices];
    newChoices[index].text = text;
    setQuestionData((prev) => {
      const updatedData = { ...prev, choices: newChoices };
      onSave(updatedData); // Notify parent about data change
      return updatedData;
    });
  };

  const handleCorrectChange = (index: number) => {
    const newChoices = questionData.choices.map((choice, i) => ({
      ...choice,
      isCorrect: i === index,
    }));
    setQuestionData((prev) => {
      const updatedData = { ...prev, choices: newChoices };
      onSave(updatedData); // Notify parent about data change
      return updatedData;
    });
  };

  const addChoice = () => {
    setQuestionData((prev) => {
      const updatedData = {
        ...prev,
        choices: [...prev.choices, { text: "", isCorrect: false }],
      };
      onSave(updatedData); // Notify parent about data change
      return updatedData;
    });
  };

  const removeChoice = (index: number) => {
    const newChoices = questionData.choices.filter((_, i) => i !== index);
    setQuestionData((prev) => {
      const updatedData = { ...prev, choices: newChoices };
      onSave(updatedData); // Notify parent about data change
      return updatedData;
    });
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <div className="mb-3">
        <i className="fs-10">Enter the question, then multiple answers. Mark the answers that are correct.</i>
      </div>

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

      <div className="mb-3">
        <label className="form-label fw-bold">Answers</label>
        {questionData.choices.map((choice, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <input
              type="text"
              className="form-control me-2"
              placeholder={`Choice ${index + 1}`}
              value={choice.text}
              onChange={(e) => handleChoiceChange(index, e.target.value)}
            />
            <input
              type="radio"
              name="correctAnswer"
              checked={choice.isCorrect}
              onChange={() => handleCorrectChange(index)}
            />
            <button className="btn btn-danger btn-sm ms-2" onClick={() => removeChoice(index)}>-</button>
          </div>
        ))}
        <button className="btn btn-secondary mt-2" onClick={addChoice}>Add Choice</button>
      </div>
    </div>
  );
};

export default MultipleChoiceEditor;
