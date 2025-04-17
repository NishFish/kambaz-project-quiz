import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// --- Quiz Routes ---
export const createQuiz = async (quiz: any) => {
  const { data } = await axios.post(QUIZZES_API, quiz);
  return data;
};

export const deleteQuizz = async (qid: string) => {
  const { data } = await axios.delete(`${QUIZZES_API}/${qid}`);
  return data;
};

export const findQuizById = async (qid: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${qid}`);
  return data;
};

export const findAllQuizzesFromCourse = async (cid: string) => {
  const { data } = await axios.get(`${COURSES_API}/${cid}/quizzes`);
  return data;
};

export const updateQuizz = async (quiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const togglePublishQuiz = async (qid: string) => {
  const { data } = await axios.put(`${QUIZZES_API}/${qid}/toggle-publish`);
  return data;
};

// --- Question Routes ---
export const createQuestion = async (question: any) => {
  const { data } = await axios.post(QUESTIONS_API, question);
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
  const { data } = await axios.put(`${QUESTIONS_API}/${question._id}`, question);
  return data;
};

// --- Answer Routes ---
export const createAnswer = async (answer: any) => {
  const { data } = await axios.post(ANSWERS_API, answer);
  return data;
};

export const getAnswerById = async (aid: string) => {
  const { data } = await axios.get(`${ANSWERS_API}/${aid}`);
  return data;
};

export const getAnswersByQuizId = async (qid: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${qid}/answers`);
  return data;
};