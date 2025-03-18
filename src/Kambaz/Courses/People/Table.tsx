import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as db from "../../Database";

export default function PeopleTable() {
    const { cid } = useParams();
    const { users, enrollments } = db;
    return (
        <div
            id="wd-people-table"
            style={{
                fontSize: "1.0rem",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
            }}
        >
            <Table
                striped
                className="table-sm"
                style={{
                    margin: "0",
                }}
            >
                <thead>
                    <tr>
                        <th style={{ padding: "0.25rem" }}>Name</th>
                        <th style={{ padding: "0.25rem" }}>Login ID</th>
                        <th style={{ padding: "0.25rem" }}>Section</th>
                        <th style={{ padding: "0.25rem" }}>Role</th>
                        <th style={{ padding: "0.25rem" }}>Last Activity</th>
                        <th style={{ padding: "0.25rem" }}>Total Activity</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter((usr) =>
                            enrollments.some((enrollment) => enrollment.user === usr._id && enrollment.course === cid)
                        )
                        .map((user: any) => (
                            <tr key={user._id}>
                                <td className="wd-full-name text-nowrap">
                                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                                    <span className="wd-first-name">{user.firstName}</span>
                                    <span className="wd-last-name">{user.lastName}</span>
                                </td>
                                <td className="wd-login-id">{user.loginId}</td>
                                <td className="wd-section">{user.section}</td>
                                <td className="wd-role">{user.role}</td>
                                <td className="wd-last-activity">{user.lastActivity}</td>
                                <td className="wd-total-activity">{user.totalActivity}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}
