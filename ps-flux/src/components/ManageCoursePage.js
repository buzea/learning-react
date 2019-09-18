import React, {useState, useEffect} from 'react';
import CourseForm from "./CourseForm";
import {toast} from "react-toastify";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions"

const ManageCoursePage = props => {

    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState(courseStore.getCourses());
    const [course, setCourse] = useState({
        id: null,
        slug: "",
        title: "",
        authorId: "",
        category: ""
    });

    function onChange() {
        setCourses(courseStore.getCourses());
    }

    useEffect(() => {
        courseStore.addChangeListener(onChange);
        const slug = props.match.params.slug;
        if (courses.length === 0) {
            courseActions.loadCourses();
        } else if (slug) {
            let courseBySlug = courseStore.getCourseBySlug(slug);
            setCourse(courseBySlug);
        }
        return () => courseStore.removeChangeListener(onChange);
    }, [courses.length, props.match.params.slug]);

    const handleChange = ({target}) => {
        const updatedCourse = {...course, [target.name]: target.value};
        setCourse(updatedCourse);
    };

    function formIsValid() {
        const _errors = {};

        if (!course.title) _errors.title = "Title is required";
        if (!course.authorId) _errors.authorId = "Author is required";
        if (!course.category) _errors.category = "Category is required";

        setErrors(_errors);

        return Object.keys(_errors).length === 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        courseActions.saveCourse(course)
            .then(() => {
                props.history.push("/courses");
                toast.success("Course saved");
            });
    }

    return (
        <>
            <h2>Manage Course</h2>
            {/*<Prompt when={true} message={"Are you sure you want to leave?"}/>*/}
            {/*{props.match.params.slug}*/}
            <CourseForm
                errors={errors}
                course={course}
                onChange={handleChange}
                onSubmit={handleSubmit}/>
        </>
    );
};

export default ManageCoursePage;