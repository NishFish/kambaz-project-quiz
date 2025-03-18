import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenAssignmentCheckmark() {
    return (
        <span className="me-2 position-relative">
            <FaCheckCircle style={{ top: "-3px" }}
                className="text-success me-1 position-absolute fs-4" />
            <FaCircle className="text-white me-2 fs-4" />
        </span>
    );
}
