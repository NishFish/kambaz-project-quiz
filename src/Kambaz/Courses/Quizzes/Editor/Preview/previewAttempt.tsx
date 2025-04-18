import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {findQuestionsByQuizId, findQuizById} from "../../client.ts";
export default function QuizPreviewAttempt() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();

    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    const [currentQuiz, setCurrentQuiz] = useState<any>(null);
    const [questionSet, setQuestionSet] = useState<any>(null);
    const [previousAnswers, setPreviousAnswers] = useState<Record<string, any>>({});

    const hasPreviousAttempt =
        currentQuiz?.userAttempts &&
        currentQuiz.userAttempts[currentUser._id] !== undefined;

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                // Fetch quiz and question set data
                const quizData = await findQuizById(qid!);
                setCurrentQuiz(quizData);

                const questionSetData = await findQuestionsByQuizId(qid!);
                setQuestionSet(questionSetData);

                if (hasPreviousAttempt) {
                    const prevAnswers: Record<string, any> = {};
                    questionSetData?.questions.forEach((q: any) => {
                        const ans = q.latestAnswers?.[currentUser._id];
                        if (ans !== undefined) {
                            prevAnswers[q.id] = ans;
                        }
                    });
                    setPreviousAnswers(prevAnswers);
                }
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        if (qid) {
            fetchQuizData(); // Ensure qid is available before making the API call
        }
    }, [qid, currentUser._id, hasPreviousAttempt]);



    // Helper to check correctness
    const isCorrect = (q: any): boolean => {
        const ans = previousAnswers[q.id];
        if (ans === undefined) return false;
        if (q.type === "Multiple Choice") {
            return !!q.choices.find((c: any) => c.text === ans && c.isCorrect);
        }
        if (q.type === "True/False") {
            return (ans === "True") === q.isCorrect;
        }
        if (q.type === "Fill in the Blank") {
            const txt = (ans || "").trim().toLowerCase();
            return q.blanks.some((b: string) => b.toLowerCase() === txt);
        }
        return false;
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>
                    {currentUser.role === "FACULTY" ? "Quiz Preview" : currentQuiz?.title}
                </h2>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/`)}
                >
                    Back
                </button>
            </div>

            <div className="mb-3">
                {hasPreviousAttempt ? (
                    <div className="alert alert-info">Previous Attempt Loaded.</div>
                ) : (
                    <div className="alert alert-warning">No Previous Attempt.</div>
                )}
            </div>

            {hasPreviousAttempt && questionSet?.questions.length > 0 && (
                <div>
                    {questionSet?.questions.map((q: any, idx: number) => {
                        const correct = isCorrect(q);
                        return (
                            <div key={q.id} className="card mb-3">
                                <div
                                    className={`card-header d-flex justify-content-between align-items-center ${correct ? "bg-success text-white" : "bg-danger text-white"
                                        }`}
                                >
                                    <span>
                                        Question {idx + 1} of {questionSet?.questions.length} ({q.points} pts)
                                    </span>
                                </div>
                                <div className="card-body">
                                    <div
                                        className="mb-3"
                                        dangerouslySetInnerHTML={{ __html: q.question }}
                                    />

                                    {q.type === "Multiple Choice" && (
                                        <ul className="list-group">
                                            {q.choices.map((c: any) => {
                                                const selected = previousAnswers[q.id] === c.text;
                                                const choiceCorrect = c.isCorrect;
                                                const liClass = selected
                                                    ? choiceCorrect
                                                        ? "list-group-item list-group-item-success"
                                                        : "list-group-item list-group-item-danger"
                                                    : "list-group-item";
                                                return (
                                                    <li key={c.text} className={liClass}>
                                                        {c.text}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}

                                    {q.type === "True/False" && (
                                        <ul className="list-group">
                                            {["True", "False"].map((val) => {
                                                const selected = previousAnswers[q.id] === val;
                                                const correctVal = (val === "True") === q.isCorrect;
                                                const liClass = selected
                                                    ? correctVal
                                                        ? "list-group-item list-group-item-success"
                                                        : "list-group-item list-group-item-danger"
                                                    : "list-group-item";
                                                return (
                                                    <li key={val} className={liClass}>
                                                        {val}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}

                                    {q.type === "Fill in the Blank" && (
                                        <input
                                            type="text"
                                            className={`form-control ${previousAnswers[q.id] === undefined
                                                ? ""
                                                : correct
                                                    ? "is-valid"
                                                    : "is-invalid"
                                                }`}
                                            value={previousAnswers[q.id] || ""}
                                            disabled
                                            placeholder="No answer provided"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {currentUser.role === "FACULTY" && (
                <div className="d-flex justify-content-center mt-3">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() =>
                            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`)
                        }
                    >
                        Edit Quiz
                    </button>
                </div>
            )}
        </div>
    );
}
