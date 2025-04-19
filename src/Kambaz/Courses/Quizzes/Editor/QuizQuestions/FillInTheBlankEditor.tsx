import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export type FillInTheBlankQuestion = {
  question: string;
  blanks: string[]; // List of possible correct answers for the blank
  id?: string;
};

interface FillInTheBlankEditorProps {
  onSave: (question: FillInTheBlankQuestion) => void;
  initialData?: FillInTheBlankQuestion | null;
}

const FillInTheBlankEditor = ({ onSave, initialData }: FillInTheBlankEditorProps) => {
  const [questionData, setQuestionData] = useState<FillInTheBlankQuestion>(
    initialData || { question: "", blanks: [""] }
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

  const handleBlankChange = (index: number, text: string) => {
    const newBlanks = [...questionData.blanks];
    newBlanks[index] = text;
    const updated = { ...questionData, blanks: newBlanks };
    setQuestionData(updated);
    onSave(updated);
  };

  const addBlank = () => {
    const updatedBlanks = [...questionData.blanks, ""];
    const updated = { ...questionData, blanks: updatedBlanks };
    setQuestionData(updated);
    onSave(updated);
  };

  const removeBlank = (index: number) => {
    if (questionData.blanks.length > 1) { // Prevent removing the last blank
      const newBlanks = questionData.blanks.filter((_, i) => i !== index);
      const updated = { ...questionData, blanks: newBlanks };
      setQuestionData(updated);
      onSave(updated);
    }
  };

  return (
    <div className="container mt-4 p-4 bg-light border rounded">
      <div className="mb-3">
        <i className="fs-6">
          Enter the question with a blank, then specify possible correct answers.
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
            {questionData.blanks.length > 1 && (
              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => removeBlank(index)}
              >
                -
              </button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-2" onClick={addBlank}>
          Add Another Possible Answer
        </button>
      </div>
    </div>
  );
};

export default FillInTheBlankEditor;
