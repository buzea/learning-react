import React, {useState} from 'react';
import {Prompt} from "react-router-dom";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import {toast} from "react-toastify";

const ManageCoursePage = props => {

    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: "",
        category: ""
    });

    const handleChange = ({target}) => {
        const updatedCourse = {...course, [target.name]: target.value};
        setCourse(updatedCourse);
    };

    function handleSubmit(event) {
        event.preventDefault();
        courseApi.saveCourse(course)
            .then(() => {
                toast.success("Course saved");
                props.history.push("/courses");
            });
    }

    return (
        <>
            <h2>Manage Course</h2>
            {/*<Prompt when={true} message={"Are you sure you want to leave?"}/>*/}
            {/*{props.match.params.slug}*/}
            <CourseForm course={course} onChange={handleChange} onSubmit={handleSubmit}/>
        </>
    );
};

export default ManageCoursePage;