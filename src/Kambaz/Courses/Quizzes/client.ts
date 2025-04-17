import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// --- Quiz Routes ---
export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const togglePublishQuiz = async (
    quizId: string,
    newPublished: "true" | "false"
) => {
    const { data } = await axiosWithCredentials.put(
        `${QUIZZES_API}/${quizId}`,
        { published: newPublished }
    );
    return data;
};

// --- Question Routes ---
export const createQuestion = async (question: any) => {
    const { data } = await axios.post(`${QUIZZES_API}/${question.quiz}/questions`, question);
    return data;
};

export const findQuestionById = async (qid: string) => {
    const { data } = await axios.get(`${QUESTIONS_API}/${qid}`);
    return data;
};

export const findQuestionsByQuizId = async (quizId: string) => {
    const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    return data;
};

export const deleteQuestion = async (qid: string) => {
    const { data } = await axios.delete(`${QUESTIONS_API}/${qid}`);
    return data;
};

export const updateQuestion = async (question: any) => {
    const { data } = await axios.put(`${QUESTIONS_API}/${question.questionId}`, question);
    return data;
};