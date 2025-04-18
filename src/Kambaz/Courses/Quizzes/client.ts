import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

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

export const createQuestionsForQuiz = async (quizId: string, question: any) => {
    const response = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials
        .get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};