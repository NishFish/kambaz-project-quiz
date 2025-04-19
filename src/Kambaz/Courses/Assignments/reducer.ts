import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignment: (state, { payload: assignments }) => {
            state.assignments = assignments;
        },
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment = {
                _id: uuidv4(),
                title: assignment.title,
                description: assignment.description || "",
                points: assignment.points || 100,
                due: assignment.due || "",
                release: assignment.release || "",
                until: assignment.until || "",
                course: assignment.course,
                modules: "Multiple Modules",
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId
            );
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignmentId ? { ...a, editing: true } : a
            ) as any;
        },
    },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;
