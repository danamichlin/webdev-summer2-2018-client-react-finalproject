import React from 'react';
import CourseRow from "../../components/CuisineRow";
import CuisineService from '../../services/CuisineService';

class CourseList extends React.Component {

    constructor() {
        super();
        this.cuisineService = CuisineService.instance;
        this.state = {cuisine: {id: 0, name: ''},
                        cuisines: []};


        //binding "this" to event handlers
        this.titleChanged = this.titleChanged.bind(this);
        this.clearCourseFormInputs = this.clearCourseFormInputs.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.editCourse = this.editCourse.bind(this);
        this.findAllCourses = this.findAllCourses.bind(this);
        this.putCourseInForm = this.putCourseInForm.bind(this);
    }

    // lifecycle function of react
    componentDidMount() {
        this.findAllCourses();
    }

    componentWillReceiveProps() {
        this.findAllCourses();
    }

    courseRows() {
        var self = this;
        // map: says that for each course in courses, return the lambda function(courses)
        var rows = this.state.courses.map(function(courseInfo) {
            // course --> html attribute of <CourseRow>
            // {course} --> the course passed into the function (ie the course in the list of
            // courses
            return <CourseRow course={courseInfo} key={courseInfo.id}
                              deleteCourse={self.deleteCourse} editCourse={self.editCourse}/>;


            // alternate way of writing contents of map:
            // map(module => <CourseRow course={courseInfo}/>)
        });
        return rows
    }

    //TODO
    putCourseInForm(course) {
        this.setState({course: {title: this.state.course.title}});
    }


    clearCourseFormInputs() {
        this.setState({course: {title: ''}});
    }

    titleChanged(event) {
        this.setState({course: {id: this.state.course.id , title: event.target.value}});
        console.log(this.state)
    }


    createCourse() {
      var c = this.state.course;
        this.cuisineService.createCourse(c)
            .then(() => {
                this.setState({
                    course: {title: ''}
                              });

            })
            .then(this.findAllCourses)
            .then(this.clearCourseFormInputs);
    }

    updateCourse(event) {
        console.log(this.state);
        //this.setState({course: {id: this.state.course.id, title: event.target.value}});
        this.cuisineService.updateCourse(this.state.course.id, this.state.course)
            .then(this.findAllCourses)
            .then(this.clearCourseFormInputs);

    }



    deleteCourse(courseId) {
        if (window.confirm("Are you sure you want to delete this course?")) {
            this.cuisineService.deleteCourse(courseId)
                .then(this.findAllCourses);
        }
    }

    editCourse(course) {

        this.setState({course: course});
        console.log(this.state);
        // this.cuisineService.findCourseById(course)
        //     .then(this.putCourseInForm(this.state.course));
    }

    findAllCourses() {
        this.cuisineService.findAllCourses()
            .then(courses => {
                this.setState({courses: courses});
            });
    }

    render() {
        return (
            <div>
                <h2>Cuisine List</h2>
                <table className="table table-bordered table-striped table-responsive-md"
                    align='center'>
                    <thead>
                        <tr>
                            <th><span>Cuisine Name</span></th>
                            {/* <th><ModuleList2*/}
                            {/*     courseId={this.state.courseId}/></th>*/}
                        </tr>
                    <tr>
                        <th><input id="cuisineName"
                               placeholder="American"
                               onChange={this.titleChanged}
                               value={this.state.cuisine.name}/>  </th>
                        <th></th>
                        <th></th>
                        <th><button onClick={this.createCuisine}>
                            <i className="fa fa-plus"/>
                        </button>
                            <button onClick={this.updateCuisine}>
                                <i className="fa fa-check"/>
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.cuisineRows()}
                    </tbody>
                    {/*<Route path={'/api/course/${this.props.course.id}/module'}*/}
                </table>

            </div>
        )
    }


}
export default CourseList;