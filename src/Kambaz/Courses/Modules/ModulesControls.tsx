import { FaPlus } from "react-icons/fa6";
import ModuleEditor from "./ModuleEditor";
import GreenCheckmark from "./GreenCheckmark";
import { Dropdown, ListGroup } from "react-bootstrap";
export default function ModulesControls({ moduleName, setModuleName, addModule }:
    { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
    return (
        <div id="wd-modules-controls" className="d-flex align-items-center flex-wrap text-nowrap">
            <button id="wd-collapse-all" className="btn btn-lg custom-dark-grey-btn me-2" type="button" style={{
                height: "48px",
                marginTop: "1px"
            }}>
                Collapse All
            </button>
            <button id="wd-view-progress" className="btn btn-lg custom-dark-grey-btn me-2" type="button" style={{
                height: "48px",
                marginTop: "1px"
            }}>
                View Progress
            </button>
            <div className="dropdown">
                <Dropdown>
                    <Dropdown.Toggle
                        id="wd-publish-all-btn"
                        className="btn btn-lg custom-dark-grey-btn me-2"
                        type="button"
                        aria-expanded="false"
                        style={{
                            height: "48px",
                            marginTop: "1px"
                        }}
                    >
                        <GreenCheckmark />
                        Publish All
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <ListGroup variant="flush">
                            <ListGroup.Item as="a" id="wd-publish-all-modules-and-items-btn" href="#" className="dropdown-item d-flex align-items-center">
                                <GreenCheckmark />
                                Publish all modules and items
                            </ListGroup.Item>
                            <ListGroup.Item as="a" id="wd-publish-modules-only-button" href="#" className="dropdown-item d-flex align-items-center">
                                <GreenCheckmark />
                                Publish modules only
                            </ListGroup.Item>
                            <ListGroup.Item as="a" id="wd-unpublish-all-modules-and-items" href="#" className="dropdown-item">
                                <span className="text-danger me-2">&#x274C;</span>
                                Unpublish all modules and items
                            </ListGroup.Item>
                            <ListGroup.Item as="a" id="wd-unpublish-modules-only" href="#" className="dropdown-item">
                                <span className="text-danger me-2">&#x274C;</span>
                                Unpublish modules only
                            </ListGroup.Item>
                        </ListGroup>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <button
                id="wd-add-module-btn"
                className="btn btn-lg btn-danger me-2"
                data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog"
            >
                <FaPlus className="position-relative me-2" style={{ bottom: "3px" }} />
                Module
            </button>
            <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
                setModuleName={setModuleName} addModule={addModule} />
        </div>
    );
}