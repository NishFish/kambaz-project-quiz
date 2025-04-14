import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./styles.css"
import { useSelector } from "react-redux";
import { useState } from 'react';

export default function Dashboard({ enrollments, courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
    courses: any[]; enrollments: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean; setEnrolling: (enrolling: boolean) => void; updateEnrollment: (courseId: string, enrolled: boolean) => void;
  }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showAllCourses,] = useState(false);

  /*
  const enrolledCourses = courses.filter(course => {
    return enrollments.some(enrollment =>
      course !== null && enrollment.user === currentUser._id && enrollment.course === course._id
    );
  });
  */




  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {currentUser.role === "STUDENT" && (
          <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </div>

      <hr />
      {currentUser.role === "FACULTY" && (
        <div>
          <h5>New Course
            <div className="d-flex justify-content-end">
              <button className="btn btn-warning px-3 py-2 me-2"
                onClick={updateCourse}
                id="wd-update-course-click">
                Update
              </button>
              <button className="btn btn-outline-primary  px-3 py-2"
                id="wd-add-new-course-click"
                onClick={addNewCourse}>
                Add
              </button>
            </div>


          </h5><br />
          <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} /><br />
        </div>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({(showAllCourses || currentUser.role === "FACULTY") ? courses.length : courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => {
            enrollments.some(enrollment => enrollment.user === currentUser._id && enrollment.course === course._id);
            return (
              <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card className="shadow rounded-3 overflow-hidden mt-4">
                  <Link to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <Card.Img src={course.image} variant="top" width={100} height={160} />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name} </Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "50px" }}>
                        {course.description} </Card.Text>
                      <p
                        className="card-subtext text-muted"
                        style={{ fontSize: '0.85rem', marginTop: '-15px' }}
                      >
                        {`${course.term} ${course.section}`}
                      </p>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <Button variant="primary" className="m-0"> Open </Button>
                        {currentUser.role === "STUDENT" && enrolling && (
                          <button onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }} className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                        {currentUser.role === "FACULTY" && (
                          <div className="d-flex">
                            <button
                              id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning me-1"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                              }}
                              className="btn btn-danger me-1"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  );
}
