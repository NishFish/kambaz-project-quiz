import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router";

export default function CourseNavigation() {
  const links = [
    { label: "Home", path: "/Home" },
    { label: "Modules", path: "/Modules" },
    { label: "Piazza", path: "/Piazza" },
    { label: "Zoom", path: "/Zoom" },
    { label: "Assignments", path: "/Assignments" },
    { label: "Quizzes", path: "/Quizzes" },
    { label: "Grades", path: "/Grades" },
    { label: "People", path: "/People" },
  ];

  const { cid } = useParams();
  const { pathname } = useLocation();

  return (
    <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <ListGroup.Item
          className={`p-0 border-0 ${pathname.includes(link.path) ? "active" : ""}`}
          key={link.path}
        >
          <Link
            to={`/Kambaz/Courses/${cid}${link.path}`}
            id={`wd-course-${link.label.toLowerCase()}-link`}
            className={`btn btn-link w-100 text-start list-group-item border-0
              ${pathname.includes(link.path) ? "text-dark" : "text-danger"}
            `}
          >
            {link.label}
          </Link>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
