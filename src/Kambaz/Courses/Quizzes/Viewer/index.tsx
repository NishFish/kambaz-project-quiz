import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

type TrueFalseQuestion = {
  question: string;
  isCorrect: boolean;
};

type MultipleChoiceQuestion = {
  question: string;
  choices: { text: string; isCorrect: boolean }[];
};

type FillInTheBlankQuestion = {
  question: string;
  blanks: string[];
};

type Question = {
  type: "truefalse" | "multiplechoice" | "fillintheblank";
  data: TrueFalseQuestion | MultipleChoiceQuestion | FillInTheBlankQuestion;
};

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const isFaculty = currentUser?.role === "FACULTY";

  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions: Question[] = [
    {
      type: "truefalse",
      data: {
        question: "The HTML label element can be associated with an input using the for attribute.",
        isCorrect: true,
      },
    },
    {
      type: "multiplechoice",
      data: {
        question: "Which tag is used to define a table row in HTML?",
        choices: [
          { text: "<table>", isCorrect: false },
          { text: "<tr>", isCorrect: true },
          { text: "<td>", isCorrect: false },
          { text: "<th>", isCorrect: false },
        ],
      },
    },
    {
      type: "fillintheblank",
      data: {
        question: "The _____ tag is used to create a hyperlink in HTML.",
        blanks: ["a", "<a>"],
      },
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    const time = new Date().toLocaleString();
    setSubmittedAt(time);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "truefalse":
        const tf = currentQuestion.data as TrueFalseQuestion;
        return (
          <div>
            <p className="mb-4">{tf.question}</p>
            <div className="space-y-2">
              {["True", "False"].map((val) => (
                <div key={val} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={val}
                    name="tf"
                    value={val}
                    checked={selectedAnswer === val}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={!!submittedAt}
                  />
                  <label htmlFor={val} className="cursor-pointer">
                    {val}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "multiplechoice":
        const mc = currentQuestion.data as MultipleChoiceQuestion;
        return (
          <div>
            <p className="mb-4">{mc.question}</p>
            <div className="space-y-2">
              {mc.choices.map((choice, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`choice-${idx}`}
                    name="mc"
                    value={choice.text}
                    checked={selectedAnswer === choice.text}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={!!submittedAt}
                  />
                  <label htmlFor={`choice-${idx}`} className="cursor-pointer">
                    {choice.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "fillintheblank":
        const fib = currentQuestion.data as FillInTheBlankQuestion;
        return (
          <div>
            <p className="mb-4">{fib.question}</p>
            <input
              type="text"
              className="border px-2 py-1 rounded"
              value={selectedAnswer || ""}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={!!submittedAt}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">
        Question {currentQuestionIndex + 1}
      </h1>

      {isFaculty && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          ⚠️ This is a preview of the published version of the quiz
        </div>
      )}

      <p className="text-sm text-gray-500 mb-4">
        {submittedAt ? `Started: ${submittedAt}` : "Started: Just now"}
      </p>

      <div className="border rounded p-4 bg-white shadow mb-4">
        {renderQuestion()}
      </div>

      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 border rounded"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex >= questions.length - 1}
        >
          Next ▸
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSubmit}
          disabled={!!submittedAt}
        >
          Submit Quiz
        </button>
      </div>

      {isFaculty && (
        <div className="border rounded p-2 text-sm mb-4 bg-gray-100">
          <button className="text-blue-600 hover:underline" onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`)}>
            ✎ Keep Editing This Quiz
          </button>
        </div>
      )}
      <div className="mt-8">
  
  <h3 className="font-semibold mb-2">All Questions</h3>
  <ul className="space-y-2">
    {questions.map((q, index) => (
      <li
        key={index}
        onClick={() => setCurrentQuestionIndex(index)}
        className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded border transition duration-150
          ${
            index === currentQuestionIndex
              ? "bg-blue-100 border-blue-400 text-blue-800 font-semibold"
              : "bg-white border-gray-300 text-gray-800 hover:bg-gray-50 hover:shadow"
          }`}
      >
        <span className="text-lg">❓</span>
        <span>
          <strong>Question {index + 1}</strong>
        </span>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
}
