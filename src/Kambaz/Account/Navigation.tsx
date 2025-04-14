import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <ListGroup id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <ListGroup.Item className="p-0 border-0 active">
        <Link
          to="/Kambaz/Account/Signin"
          id="wd-course-home-link"
          className="btn btn-link w-100 text-start list-group-item border-0"
        >
          Signin
        </Link>
      </ListGroup.Item>

      <ListGroup.Item className="p-0 border-0">
        <Link
          to="/Kambaz/Account/Signup"
          id="wd-course-modules-link"
          className="btn btn-link w-100 text-start text-danger list-group-item border-0"
        >
          Sign up
        </Link>
      </ListGroup.Item>

      <ListGroup.Item className="p-0 border-0">
        <Link
          to="/Kambaz/Account/Profile"
          id="wd-course-modules-link"
          className="btn btn-link w-100 text-start text-danger list-group-item border-0"
        >
          Profile
        </Link>
      </ListGroup.Item>
      <ListGroup.Item className="p-0 border-0">
        {currentUser && currentUser.role === "ADMIN" && (
          <Link to={`/Kambaz/Account/Users`} className={`btn btn-link w-100 text-start text-danger list-group-item border-0 ${active("Users")}`}> Users </Link>)}
      </ListGroup.Item>
    </ListGroup>
  );
}
