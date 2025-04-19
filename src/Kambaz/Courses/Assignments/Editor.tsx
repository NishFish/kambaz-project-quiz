import { Form, Table, Card } from "react-bootstrap";
import "../../styles.css";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import { convertToISO, convertToHumanReadable } from "./convert_date"
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
    const { cid, aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);

    const existingAssignment = assignments.find((a: any) => a._id === aid);

    const [assignment, setAssignment] = useState({
        title: "",
        description: "",
        points: 100,
        due: "",
        release: "",
        until: "",
        group: "ASSIGNMENTS",
        gradeDisplay: "Percentage",
        submissionType: "Online",
        modules: "Multiple Modules",
        assignTo: "Everyone",
    });

    useEffect(() => {
        if (existingAssignment) {
            setAssignment(existingAssignment);
        }
    }, [existingAssignment]);

    const handleChange = (e: any) => {
        setAssignment({ ...assignment, [e.target.id]: e.target.value });
    };


    const handleSave = async () => {
        if (!cid) return;

        const formattedAssignment = {
            ...assignment,
            due: convertToHumanReadable(assignment.due),
            release: convertToHumanReadable(assignment.release),
            until: convertToHumanReadable(assignment.until)
        };

        if (aid && existingAssignment) {
            const createdAssignment = await assignmentsClient.updateAssignment(assignment);
            dispatch(updateAssignment(createdAssignment));
        } else {
            const newAssignment = {
                ...formattedAssignment,
                course: cid,
            };

            const createdAssignment = await coursesClient.createAssignmentForCourse(cid, newAssignment);
            dispatch(addAssignment(createdAssignment));
        }

        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };

    return (
        <div id="wd-assignments-editor" className="p-4">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="title">Assignment Name</Form.Label>
                    <Form.Control type="text" id="title" value={assignment.title} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="description">Assignment Description</Form.Label>
                    <Form.Control as="textarea" id="description" rows={5} value={assignment.description} onChange={handleChange} />
                </Form.Group>

                <Table borderless>
                    <tbody>
                        <tr>
                            <td className="text-end align-top">
                                <Form.Label htmlFor="points">Total Points</Form.Label>
                            </td>
                            <td>
                                <Form.Control type="number" id="points" value={assignment.points} onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <td className="text-end align-top">
                                <Form.Label htmlFor="group">Assignment Group</Form.Label>
                            </td>
                            <td>
                                <Form.Select id="group" value={assignment.group} onChange={handleChange}>
                                    <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                                </Form.Select>
                            </td>
                        </tr>

                        <tr>
                            <td className="text-end align-top">
                                <Form.Label htmlFor="gradeDisplay">Display Grade As</Form.Label>
                            </td>
                            <td>
                                <Form.Select id="gradeDisplay" value={assignment.gradeDisplay} onChange={handleChange}>
                                    <option value="Percentage">Percentage</option>
                                    <option value="Points">Points</option>
                                </Form.Select>
                            </td>
                        </tr>

                        <tr>
                            <td className="text-end align-top">
                                <Form.Label htmlFor="submissionType">Submission Type</Form.Label>
                            </td>
                            <td>
                                <Card className="mb-3">
                                    <Card.Body className="mb-3 w-100 align-items-start">
                                        <Form.Group className="mb-3 w-100 text-start">
                                            <Form.Select id="submissionType" value={assignment.submissionType} onChange={handleChange}>
                                                <option value="Online">Online</option>
                                                <option value="In-Person">In-Person</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <div className="mt-3 text-start">
                                            <Form.Label><b>Online Entry Options</b></Form.Label>
                                            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entries" />
                                            <Form.Check type="checkbox" id="wd-website-url" label="Website URLs" />
                                            <Form.Check type="checkbox" id="wd-media-recordings" label="Media Recordings" />
                                            <Form.Check type="checkbox" id="wd-student-annotation" label="Student Annotations" />
                                            <Form.Check type="checkbox" id="wd-file-upload" label="File Uploads" />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </td>
                        </tr>

                        <tr>
                            <td className="text-end align-top">
                                <Form.Label htmlFor="assignTo">Assign</Form.Label>
                            </td>
                            <td>
                                <Card className="mb-3">
                                    <Card.Body className="mb-3 w-100">
                                        <Form.Group className="mb-3 w-100 text-start">
                                            <Form.Label htmlFor="assignTo"><b>Assign to</b></Form.Label>
                                            <Form.Select id="assignTo" value={assignment.assignTo} onChange={handleChange}>
                                                <option value="Everyone">Everyone</option>
                                                <option value="Nishanth">Nishanth</option>
                                                <option value="Michael">Michael</option>
                                                <option value="Lud">Lud</option>
                                                <option value="Connor">Connor</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3 w-100 text-start">
                                            <Form.Label htmlFor="due"><b>Due</b></Form.Label>
                                            <Form.Control type="datetime-local" id="due" value={convertToISO(assignment.due)} onChange={handleChange} />
                                        </Form.Group>
                                        <Form.Group className="mb-3 d-flex text-start w-100">
                                            <div className="me-2 w-50">
                                                <Form.Label htmlFor="release"><b>Available from</b></Form.Label>
                                                <Form.Control type="datetime-local" id="release" value={convertToISO(assignment.release)} onChange={handleChange} />
                                            </div>
                                            <div className="ms-2 w-50">
                                                <Form.Label htmlFor="until"><b>Until</b></Form.Label>
                                                <Form.Control type="datetime-local" id="until" value={convertToISO(assignment.until)} onChange={handleChange} />
                                            </div>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <div className="text-end mt-4">
                    <hr />
                    <button className="btn btn-secondary me-2" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </Form>
        </div>
    );
}
