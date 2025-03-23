import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import QuizDetails from "./QuizDetailsEditor";
import QuizQuestions from "./QuizQuestions";

const QuizEditor = () => {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mt-3">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <div></div> {/* Empty div to push content to the right */}
        <div className="d-flex align-items-center">
          <span className="me-2">
            Points <strong>0</strong>
          </span>
          <div className="vr mx-3"></div> {/* Vertical separator */}
          <span className="text-muted">Not Published</span>
          <FaEllipsisV className="ms-2" />
        </div>
      </div>

      {/* Tabs */}
      <div className="d-flex border-bottom mb-3">
        <button
          className={`btn btn-link text-decoration-none ${activeTab === "details" ? "fw-bold border-bottom border-dark" : "text-muted"}`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </button>
        <button
          className={`btn btn-link text-decoration-none ms-3 ${activeTab === "questions" ? "fw-bold border-bottom border-dark" : "text-muted"}`}
          onClick={() => setActiveTab("questions")}
        >
          Questions
        </button>
      </div>

      {/* Content */}
      {activeTab === "details" ? <QuizDetails /> : <QuizQuestions />}
    </div>
  );
};

export default QuizEditor;