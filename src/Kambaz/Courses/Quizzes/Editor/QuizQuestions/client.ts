import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

// --- Question Routes ---

export const deleteQuestion = async (qid: string) => {
    const { data } = await axiosWithCredentials.delete(`${QUESTIONS_API}/${qid}`);
    return data;
};

export const updateQuestion = async (question: any) => {
    const { data } = await axiosWithCredentials.put(`${QUESTIONS_API}/${question._id}`, question);
    return data;
};

export const updateQuestionScore = async (qid: any, newScore: Number, username: String) => {
    const { data } = await axiosWithCredentials.put(`${QUESTIONS_API}/${qid}`, { username, newScore });
    return data;
};