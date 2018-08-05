import React from 'react'
import ModuleList2 from '../modules/ModuleList2'
import LessonTabs from '../lessons/LessonTabs'
import CourseService from "../../services/CourseService";

class CourseEditor extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            course: {
                modules: [{
                    title: ','
                }],
                courseId: 0,
                module: null
            }};
        this.courseService = CourseService.instance;

        this.selectCourse = this.selectCourse.bind(this);
        this.onModuleSelected = this.onModuleSelected.bind(this);
    }

    componentDidMount() {
        this.selectCourse(this.props.match.params.courseId);
        this.course = this.courseService.findCourseById(this.props.match.params.courseId)
            .then((course) => {
                this.course = course;
                this.forceUpdate();
            });
    }

    selectCourse(courseId) {
        var id = parseInt(courseId);
        this.setState({courseId: id});
    }

    onModuleSelected(module) {
        this.setState({module: module});
    }


    render() {
        return(
            <div width='100%'>
                {this.course && <div class="p-2 mb-1 bg-secondary text-white">
                             Editing course: {this.course.title}</div>}
                <div className="row">
                    <div className="col-3">
                        <ModuleList2 onModuleSelected={this.onModuleSelected}
                                     selectedModule={this.state.module}
                                     courseId={this.props.match.params.courseId}/>

                    </div>
                    <div className="col-9">
                        <LessonTabs module={this.state.module}
                                    courseId={this.props.match.params.courseId}/>
                    </div>
                </div>
            </div>
    );}
}

export default CourseEditor;
