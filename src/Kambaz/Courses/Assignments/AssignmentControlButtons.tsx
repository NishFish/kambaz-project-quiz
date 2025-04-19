import { IoEllipsisVertical } from "react-icons/io5";
import GreenAssignmentCheckmark from "./GreenCheckmark";
import { deleteAssignment } from "./reducer";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as assignmentsClient from "./client";


export default function AssignmentControlButtons({ assignmentId }: { assignmentId: string }) {
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
        setShowConfirm(false);
    };

    return (
        <div className="float-end">
            <GreenAssignmentCheckmark />
            <IoEllipsisVertical className="fs-2" />
            <FaTrash className="text-danger me-2 fs-4" onClick={handleDelete} />
            {showConfirm && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Assignment</h5>
                                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this assignment?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
