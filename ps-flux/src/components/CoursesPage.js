import React, {useState, useEffect} from 'react';
import {getCourses} from '../api/courseApi'
import CourseList from "./CourseList";
import {Link} from "react-router-dom";

function CoursesPage() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses().then(dbCourses => setCourses(dbCourses));
    }, []);

    return (
        <div>
            <h2>Courses</h2>
            <Link to={"/course"} className="btn btn-primary">Add Course</Link>
            <CourseList courses={courses}/>
        </div>
    );
}

export default CoursesPage;