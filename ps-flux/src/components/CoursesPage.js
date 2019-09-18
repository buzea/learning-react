import React, {useState, useEffect} from 'react';
import CourseList from "./CourseList";
import {Link} from "react-router-dom";
import courseStore from "../stores/courseStore";
import {loadCourses, deleteCourse} from "../actions/courseActions";


function CoursesPage() {

    const [courses, setCourses] = useState(courseStore.getCourses());

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        if (courseStore.getCourses().length === 0) {
            loadCourses();
        }
        return () => courseStore.removeChangeListener(onChange);
    }, []);

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    function handleDelete(event) {
        deleteCourse(event.target.value);
    }

    return (
        <div>
            <h2>Courses</h2>
            <Link to={"/course"} className="btn btn-primary">Add Course</Link>
            <CourseList courses={courses} onClick={handleDelete}/>
        </div>
    );
}

export default CoursesPage;