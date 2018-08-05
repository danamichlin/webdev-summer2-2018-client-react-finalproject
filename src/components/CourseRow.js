import React from 'react';
import { Link } from 'react-router-dom'

import CourseService from '../services/CourseService';


class CourseRow extends React.Component {
    constructor(props) {
        super(props);
        this.courseService = CourseService.instance;
    }

    render() {
        return (
                    <tr>
                        <td>
                        <Link to={`/course/${this.props.course.id}/edit`}>
                            {this.props.course.title}
                        </Link></td>
                        <td>{this.props.course.created}</td>
                        <td>{this.props.course.modified}</td>
                        <td id={this.props.course.id}>
                            <button onClick={() => this.props.editCourse(
                                this.props.course)}>
                                <i className="fa fa-pencil"/>
                            </button>
                            <button onClick={() => this.props.deleteCourse(
                                this.props.course.id)}>
                                <i className="fa fa-trash"/>
                            </button>
                        </td>
                    </tr>

    )}}

export default CourseRow;