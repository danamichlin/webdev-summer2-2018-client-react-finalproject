import React from 'react';
import { Link } from 'react-router-dom'

import CourseService from '../services/CuisineService';


class CuisineRow extends React.Component {
    constructor(props) {
        super(props);
        this.cuisineService = CuisineService.instance;
    }

    render() {
        return (
                    <tr>
                        <td>
                        <Link to={`/cuisine/${this.props.cuisine.id}/edit`}>
                            {this.props.cuisine.name}
                        </Link></td>
                        <td id={this.props.cuisine.id}>
                            <button onClick={() => this.props.editCuisine(
                                this.props.cuisine)}>
                                <i className="fa fa-pencil"/>
                            </button>
                            <button onClick={() => this.props.deleteCuisine(
                                this.props.cuisine.id)}>
                                <i className="fa fa-trash"/>
                            </button>
                        </td>
                    </tr>

    )}}

export default CourseRow;