import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import "../../styles.css";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useState } from "react";
import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { GoTriangleDown } from "react-icons/go";



export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="assignments-container">
      {currentUser.role === "FACULTY" && (
        <div>
          <ModulesControls setModuleName={setModuleName} moduleName={moduleName}
            addModule={() => {
              dispatch(addModule({ name: moduleName, course: cid }));
              setModuleName("");
            }} />
          <br />
          <br />
        </div>
      )}
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                {currentUser.role === "FACULTY" && (
                  <>
                    <BsGripVertical className="me-2 fs-3" />
                  </>)}
                <GoTriangleDown />{!module.editing && module.name}
                {currentUser.role === "FACULTY" && (
                  <>
                    {module.editing && (
                      <input className="form-control w-50 d-inline-block"
                        onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            dispatch(updateModule({ ...module, editing: false }));
                          }
                        }}
                        defaultValue={module.name} />
                    )}
                    <ModuleControlButtons moduleId={module._id}
                      deleteModule={(moduleId) => {
                        dispatch(deleteModule(moduleId));
                      }}
                      editModule={(moduleId) => dispatch(editModule(moduleId))} />
                  </>
                )}
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li key={lesson._id}
                      className={`list-group-item p-3 ps-1 ${currentUser.role === "FACULTY" ? "wd-lesson" : ""
                        }`}
                    >
                      {currentUser.role === "FACULTY" && (
                        <>
                          <BsGripVertical className="me-2 fs-3" />
                        </>)}
                      {lesson.name}
                      {currentUser.role === "FACULTY" && (
                        <>
                          <LessonControlButtons />
                        </>)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
