import { useSelector } from "react-redux";
import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill">
        <Modules />
      </div>
      {currentUser.role === "FACULTY" && (
        <div className="d-none d-lg-block me-3" style={{ minWidth: "400px", marginLeft: "40px" }}>
          <CourseStatus />
        </div>
      )}
    </div>

  );
}
