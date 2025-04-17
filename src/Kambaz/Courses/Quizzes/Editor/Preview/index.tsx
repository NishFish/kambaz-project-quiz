import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateScore } from "../../reducer";
// import { recordAnswer } from "../QuizQuestions/reducer"

export default function QuizPreview() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const currentQuiz = useSelector((state: any) =>
        state.quizzesReducer.quizzes.find((quiz: any) => quiz._id === qid)
    );
    const questionSet = useSelector((state: any) =>
        state.questionReducer.questionSets.find((qs: any) => qs.quiz === qid)
    );
    const questions = questionSet?.questions || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [submitted, setSubmitted] = useState(false);
    const [earned, setEarned] = useState<number | null>(null);
    const currentQuestion = questions[currentIndex];

    const handleAnswerChange = (value: any) => {
        if (currentQuestion?.id) {
            setAnswers({
                ...answers,
                [currentQuestion.id]: value,
            });
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const calculateEarned = () => {
        return questions.reduce((sum: number, q: any) => {
            const ans = answers[q.id];

            if (q.type === "Multiple Choice") {
                const choice = q.choices.find((c: any) => c.text === ans);
                if (choice?.isCorrect) return sum + q.points;
            } else if (q.type === "True/False") {
                const boolAns = ans === "True";
                if (boolAns === q.isCorrect) return sum + q.points;
            } else if (q.type === "Fill in the Blank") {
                const txt = (ans || "").trim().toLowerCase();
                if (q.blanks.some((b: string) => b.toLowerCase() === txt)) return sum + q.points;
            }

            return sum;
        }, 0);
    };


    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            if (!submitted) {
                const score = calculateEarned();
                if (score === undefined) {
                    console.error("Score calculation failed!");
                    return;
                }
                setEarned(score);
                setSubmitted(true);

                const updatedScoreArray = Array.isArray(currentQuiz.score)
                    ? [...currentQuiz.score, score]
                    : [score];

                dispatch(updateScore({
                    quizId: qid,
                    newScore: score,
                    username: currentUser._id,
                }));

                // Object.entries(answers).forEach(([questionId, answer]) => {
                //     dispatch(recordAnswer({
                //         quiz: qid,
                //         questionId,
                //         userId: currentUser._id,
                //         answer
                //     }));
                // });

            } else {
                navigate(`/Kambaz/Courses/${cid}/Quizzes/`);
            }
        }
    };



    const handleEditQuiz = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/editor`);
    };

    const renderQuestion = () => {
        if (!currentQuestion) return <div>No question found.</div>;

        switch (currentQuestion.type) {
            case "Multiple Choice":
                return (
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                        {currentQuestion.choices &&
                            currentQuestion.choices.map((choice: any, index: number) => (
                                <div key={index} className="form-check mt-2">
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestion.id}`}
                                        className="form-check-input"
                                        value={choice.text}
                                        checked={answers[currentQuestion.id] === choice.text}
                                        disabled={submitted}
                                        onChange={(e) => handleAnswerChange(e.target.value)}
                                    />
                                    <label className="form-check-label">{choice.text}</label>
                                </div>
                            ))}
                    </div>
                );
            case "True/False":
                return (
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                        {["True", "False"].map((val, index) => (
                            <div key={index} className="form-check mt-2">
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.id}`}
                                    className="form-check-input"
                                    value={val}
                                    checked={answers[currentQuestion.id] === val}
                                    disabled={submitted}
                                    onChange={(e) => handleAnswerChange(e.target.value)}
                                />
                                <label className="form-check-label">{val}</label>
                            </div>
                        ))}
                    </div>
                );
            case "Fill in the Blank":
                return (
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
                        <input
                            type="text"
                            className="form-control mt-3"
                            placeholder="Enter your answer"
                            value={answers[currentQuestion.id] || ""}
                            disabled={submitted}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                        />
                    </div>
                );
            default:
                return <div>Unknown question type.</div>;
        }
    };

    return (
        <div className="container mt-4">
            {currentUser.role === "FACULTY" ? (
                <h2 className="mb-4">Quiz Preview</h2>
            ) : (
                <h2 className="mb-4">{currentQuiz?.title}</h2>
            )}

            {questions.length === 0 ? (
                <div className="alert alert-warning">No questions available.</div>
            ) : (
                <div>
                    <div
                        className="d-flex justify-content-between align-items-center mb-2"
                        style={{
                            backgroundColor: "#e0e0e0",
                            padding: "8px 16px",
                            borderRadius: "4px",
                        }}
                    >
                        <span>
                            Question {currentIndex + 1} of {questions.length}
                        </span>
                        {currentQuestion && currentQuestion.points !== undefined && (
                            <span>{currentQuestion.points} pts</span>
                        )}
                    </div>
                    <div className="card p-4 mb-3">{renderQuestion()}</div>
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-secondary"
                            onClick={handleBack}
                            disabled={currentIndex === 0 || submitted}
                        >
                            Back
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            {submitted
                                ? "Completed"
                                : currentIndex < questions.length - 1
                                    ? "Next"
                                    : "Submit Quiz"}
                        </button>
                    </div>

                    {submitted && (
                        <div className="mt-4">
                            <h4>
                                You scored {earned} /{" "}
                                {questions.reduce((sum: number, q: any) => sum + q.points, 0)}
                            </h4>
                        </div>
                    )}

                    {currentUser.role === "FACULTY" && (
                        <div className="d-flex justify-content-center mt-3">
                            <button
                                className="btn btn-outline-primary"
                                onClick={handleEditQuiz}
                            >
                                Edit Quiz
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
