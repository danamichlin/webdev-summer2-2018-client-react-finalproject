import React from 'react';
import LessonService from '../services/LessonService'
import { Link } from 'react-router-dom'

export default class LessonAddition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            title: ''}

            this.titleChanged = this.titleChanged.bind(this);
            this.setEditMode = this.setEditMode.bind(this);
            this.addingLesson = this.addingLesson.bind(this);
        }


    titleChanged(event) {
        this.setState({title: event.target.value});
    }

    setEditMode(editMode) {
        this.setState({editMode: editMode});
        if (!editMode) {
            this.setState({title: ''});
        }
    }

    addingLesson() {
        this.props.createLesson(this.state.title);
        this.setEditMode(false);
    }




    render() {
        if (this.state.editMode) {
            return (
                <div>
                    <input onChange={(event) => this.titleChanged(event)} value={this.state.title}/>
                    <button onClick={this.addingLesson}>
                        <i className='fa fa-check'/>
                    </button>
                    <button onClick={() => this.setEditMode(false)}>
                        <i className='fa fa-remove'/>
                    </button>
                </div>
            )
        }
        else {
            return (
                // not edit mode (has edit + delete buttons, no input field)
                <div>
                    <button onClick={() => this.setEditMode(true)}>
                        <i className='fa fa-plus'/>
                    </button>
                </div>
            )
        }
    }
}