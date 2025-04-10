import React from "react";
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdPublish, MdContentCopy } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

type ContextMenuProps = {
  quizId: string;
  cid: string | undefined;
  isActive: boolean;
  isPublished: boolean;
  onDelete: (quizId: string) => void;
  togglePublish: (quizId: string) => void;
  onCopy: (quizId: string) => void;
  onClose: () => void;
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  quizId,
  cid,
  isActive,
  isPublished,
  onDelete,
  togglePublish,
  onClose,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {isActive && (
        <div
          className="context-menu"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            zIndex: 1000,
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            minWidth: "180px",
          }}
        >
          <button
            className="btn btn-link d-flex align-items-center"
            style={{ fontSize: "16px", color: "#007bff", padding: "8px 12px", borderRadius: "4px" }}
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}`)}
          >
            <MdEdit className="me-2" />
            Edit
          </button>
          <button
            className="btn btn-link d-flex align-items-center"
            style={{ fontSize: "16px", color: "#dc3545", padding: "8px 12px", borderRadius: "4px" }}
            onClick={() => onDelete(quizId)}
          >
            <MdDelete className="me-2" />
            Delete
          </button>
          <button
            className="btn btn-link d-flex align-items-center"
            style={{
              fontSize: "16px",
              color: "#28a745",
              padding: "8px 12px",
              borderRadius: "4px",
            }}
            onClick={() => { togglePublish(quizId); onClose() }}
          >
            <MdPublish className="me-2" />
            {isPublished ? "Unpublish" : "Publish"}
          </button>
          <button
            className="btn btn-link d-flex align-items-center"
            style={{
              fontSize: "16px",
              color: "#868e96",
              padding: "8px 12px",
              borderRadius: "4px",
            }}
            onClick={onClose}
          >
            <FaTimes className="me-2" />
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default ContextMenu;