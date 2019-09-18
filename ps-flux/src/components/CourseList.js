import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

function CourseList(props) {
    return (
        <table className="table">
            <thead>
            <tr>
                <th> Title</th>
                <th> Author ID</th>
                <th> Category</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {props.courses.map(function (course) {
                return (
                    <tr key={course.id}>
                        <td><Link to={"/course/" + course.slug}>{course.title}</Link></td>
                        <td>{course.authorId}</td>
                        <td>{course.category}</td>
                        <td>
                            <button onClick={props.onClick} value={course.id} className="btn btn-danger">Delete</button>
                        </td>
                    </tr>);
            })}
            </tbody>
        </table>
    );
}

CourseList.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        authorId: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired
    })).isRequired,
    onClick: PropTypes.func.isRequired
};

export default CourseList;