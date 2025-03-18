import { BsGripVertical } from "react-icons/bs";
import "../../styles.css"
import { GoTriangleDown } from "react-icons/go";
import ModuleControlButtons from "./ModuleControlButtons";
import { MdOutlineEditNote } from "react-icons/md";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { editAssignment } from "./reducer";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const handleClick = () => {
        const newAssignmentId = uuidv4();
        navigate(`/Kambaz/Courses/${cid}/Assignments/${newAssignmentId}`);
    };
    const dispatch = useDispatch();
    return (
        <div id="wd-assignments" className="assignments-container">
            <div className="d-flex justify-content-between align-items-center">

                <div className="search-container d-flex align-items-center">
                    <CiSearch className="search-icon me-2" />
                    <input
                        type="text"
                        id="wd-search-assignment"
                        placeholder="Search..."
                    />
                </div>
                {currentUser.role === "FACULTY" && (
                    <div>
                        <button
                            id="wd-add-module-btn"
                            className="btn btn-lg border me-2"
                            style={{ backgroundColor: "#e4e4e4", height: "48px" }}
                        >
                            <FaPlus className="position-relative me-2" style={{ bottom: "3px" }} />
                            Group
                        </button>
                        <button
                            id="wd-add-assignment-btn"
                            className="btn btn-lg btn-danger"
                            style={{ height: "48px" }}
                            onClick={handleClick}
                        >
                            <FaPlus className="position-relative me-2" style={{ bottom: "3px" }} />
                            Assignment
                        </button>
                    </div>
                )}
            </div>
            <br />

            <ul id="wd-assignment-list" className="list-group rounded-0">

                <div className="wd-title p-3 ps-2 d-flex justify-content-between align-items-center" style={{
                    backgroundColor: "#e4e4e4"
                }}>
                    {currentUser.role === "FACULTY" && (
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                        </div>
                    )}
                    <div className="flex-grow-1 text-left">
                        <h4 className="mb-0"><GoTriangleDown /><b> ASSIGNMENTS</b></h4>
                    </div>
                    {currentUser.role === "FACULTY" && (
                        <>
                            <div
                                className="px-3 py-1"
                                style={{
                                    border: "1px solid",
                                    borderRadius: "20px",
                                    fontSize: "20px",
                                    display: "inline-block",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                40% of Total
                            </div>
                            <div className="d-flex align-items-center">
                                <ModuleControlButtons />
                            </div>
                        </>
                    )}
                </div>

                {assignments
                    .filter((assignments: any) => assignments.course === cid)
                    .map((assignments: any) => (
                        <li
                            key={assignments._id}
                            className={`list-group-item py-3 px-3 ${currentUser.role === "FACULTY" ? "wd-assignment-list-item" : ""
                                }`}
                        >
                            <div className="d-flex align-items-center justify-content-between">
                                {currentUser.role === "FACULTY" && (
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="fs-1 me-2 text-secondary" />
                                        <MdOutlineEditNote style={{ color: "green", fontSize: "24px" }} className="fs-1 me-3" />
                                    </div>
                                )}
                                <div className="flex-grow-1">
                                    {currentUser.role === "FACULTY" ? (
                                        <a
                                            href={`#/Kambaz/Courses/${cid}/Assignments/${assignments._id}`}
                                            className="wd-assignment-link fw-bold text-dark text-decoration-none"
                                            style={{ fontSize: "20px" }}
                                            onClick={() => dispatch(editAssignment(assignments._id))}
                                        >
                                            {assignments.title}
                                        </a>
                                    ) : (
                                        <span
                                            className="fw-bold text-dark"
                                            style={{ fontSize: "20px" }}
                                        >
                                            {assignments.title}
                                        </span>
                                    )}
                                    <p className="mb-1 text-muted">
                                        <span style={{ color: "#dc3545" }}>{assignments.modules}</span> | <b>Not available until</b> {assignments.release} |
                                    </p>
                                    <p className="mb-1 text-muted">
                                        <b>Due</b> {assignments.due} | {assignments.points} points
                                    </p>
                                </div>
                                {currentUser.role === "FACULTY" && (
                                    <div className="d-flex align-items-center">
                                        <AssignmentControlButtons assignmentId={assignments._id} />
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
