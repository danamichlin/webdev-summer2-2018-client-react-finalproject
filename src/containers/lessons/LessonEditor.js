import React from 'react';
import LessonService from '../../services/LessonService'
import WidgetListContainer from "../widgets/WidgetListContainer";

class LessonEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            title: this.props.lesson.title}

        this.lessonService = LessonService.instance;

        this.setEditMode = this.setEditMode.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.lesson.id != prevProps.lesson.id) {
            this.setState({editMode: false,
                              title: this.props.lesson.title});
        }
    }

    setEditMode(editMode) {
        this.setState({editMode: editMode});
        if (!editMode) {
            this.setState({title: this.props.lesson.title});
        }
    }

    titleChanged(event) {
        this.setState({title: event.target.value});
    }


    updateLesson() {
        this.props.lesson.title = this.state.title;
        this.lessonService.updateLesson(this.props.lesson.id, this.props.lesson);
        this.setEditMode(false);
        this.props.nameChanged();
    }


    render() {
        if (this.state.editMode) {
            return (
                <div class="p-3 mb-2 bg-info text-white">
                    <input onChange={(event) => this.titleChanged(event)} value={this.state.title}/>
                    <button onClick={() => this.updateLesson()}>
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
                    <div class="p-3 mb-2 bg-info text-white">
                        {/*// onClick={() => this.props.onLessonSelected(this.props.lesson)}>*/}
                        Editing Lesson: {this.state.title} &nbsp; &nbsp;

                        <button onClick={() => this.setEditMode(true)}>
                            <i className='fa fa-pencil'/>
                        </button>
                        <button onClick={() => {this.props.deleteLesson(this.props.lesson.id)}}>
                            <i className='fa fa-trash'/>
                        </button>
                    </div>

                    <WidgetListContainer lesson={this.props.lesson}/>
                </div>
            )
        }
    }
}



export default LessonEditor;