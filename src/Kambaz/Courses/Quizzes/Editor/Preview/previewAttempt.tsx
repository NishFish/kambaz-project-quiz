import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizPreviewAttempt() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();

    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const currentQuiz = useSelector((state: any) =>
        state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === qid)
    );
    const questionSet = useSelector((state: any) =>
        state.questionReducer.questionSets.find((qs: any) => qs.quiz === qid)
    );
    const questions = questionSet?.questions || [];

    // Determine if user has attempted before
    const hasPreviousAttempt =
        currentQuiz?.userAttempts &&
        currentQuiz.userAttempts[currentUser._id] !== undefined;

    // Prepopulate previous answers
    const [previousAnswers, setPreviousAnswers] = useState<Record<string, any>>({});
    useEffect(() => {
        if (hasPreviousAttempt) {
            const prev: Record<string, any> = {};
            questions.forEach((q: any) => {
                const ans = q.latestAnswers?.[currentUser._id];
                if (ans !== undefined) {
                    prev[q.id] = ans;
                }
            });
            setPreviousAnswers(prev);
        }
    }, [hasPreviousAttempt, questions, currentUser._id]);

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

            {hasPreviousAttempt && questions.length > 0 && (
                <div>
                    {questions.map((q: any, idx: number) => (
                        <div key={q.id} className="card mb-3 p-4">
                            <div className="mb-2">
                                <strong>
                                    Question {idx + 1} of {questions.length} ({q.points} pts)
                                </strong>
                            </div>
                            <div
                                className="mb-3"
                                dangerouslySetInnerHTML={{ __html: q.question }}
                            />

                            {q.type === "Multiple Choice" && (
                                <ul className="list-group">
                                    {q.choices.map((c: any) => (
                                        <li
                                            key={c.text}
                                            className={
                                                "list-group-item" +
                                                (previousAnswers[q.id] === c.text ? " active" : "")
                                            }
                                        >
                                            {c.text}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {q.type === "True/False" && (
                                <ul className="list-group">
                                    {["True", "False"].map((val) => (
                                        <li
                                            key={val}
                                            className={
                                                "list-group-item" +
                                                (previousAnswers[q.id] === val ? " active" : "")
                                            }
                                        >
                                            {val}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {q.type === "Fill in the Blank" && (
                                <input
                                    type="text"
                                    className="form-control"
                                    value={previousAnswers[q.id] || ""}
                                    disabled
                                    placeholder="No answer provided"
                                />
                            )}
                        </div>
                    ))}
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
