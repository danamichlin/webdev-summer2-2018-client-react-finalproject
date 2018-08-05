import React from 'react';
import ModuleService from '../../services/ModuleService';
import ModuleListItem from '../../components/ModuleListItem';
import ModuleEditor from './ModuleEditor';

import {BrowserRouter as Router, Route} from 'react-router-dom'


class ModuleList2 extends React.Component {

    constructor(props) {
        super(props);
        this.state =  {
            courseId: '',
            module: {
                title: '',
                id: 0,
                courseId: this.props.courseId,
                lessons: []
            },
            modules: []
        };

        this.moduleService = ModuleService.instance;

        //binding to "this"
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleAttributes = this.setModuleAttributes.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.editModule = this.editModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
        this.clearModuleFormInputs = this.clearModuleFormInputs.bind(this);
        //this.renderModules = this.renderModules.bind(this);

    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        console.log(this.state.courseId);
        //this.setModules(this.props.modules);
        this.findAllModulesForCourse(this.props.courseId)
    }

    componentWillReceiveProps(newProps){
        // this.findAllModulesForCourse(newProps.courseId)
    }

    setModuleAttributes(event) {
        this.setState({module: {
            title: event.target.value,
            id: this.state.module.id,
            courseId: this.props.courseId
        }});
    }


    putModuleInForm(module) {
        this.setState({module: {title: this.state.module.title}});
    }

    //TODO
    clearModuleFormInputs() {
        this.setState({module: {title: '',
            id: this.state.module.id,
            courseId: this.props.courseId
        }});
    }

    titleChanged(event) {
        this.setState({module: {id: this.state.module.id , title: event.target.value}});
        console.log(this.state)
    }

    setCourseId() {
        this.setState({courseId: this.props.courseId});
    }

    createModule() {
        // this.setState({module: {
        //     courseId: this.props.courseId
        // }});
        this.moduleService.createModule(this.props.courseId, this.state.module)
            .then(() => {
                this.findAllModulesForCourse
                (this.props.courseId);
            });
       // this.setState(module: {courseId: this.props.courseId});
    }

    //TODO
    updateModule(event) {
        console.log(this.state.module);

        //this.setState({course: {id: this.state.course.id, title: event.target.value}});
       // this.setState({module: {courseId: this.props.courseId}});
        this.moduleService.updateModule(this.state.module.id, this.state.module)
            .then(this.findAllModulesForCourse(this.props.courseId))
            .then(this.clearModuleFormInputs);

    }

    editModule(module) {

        // this.moduleService.findModuleById(module)
        //     .then(this.putModuleInForm(this.state.module));
        this.setState({module: module});
        //console.log(this.state);
        // this.courseService.findCourseById(course)
        //     .then(this.putCourseInForm(this.state.course));
    }

    deleteModule(moduleId) {
        if (window.confirm("Are you sure you want to delete this module?")) {
            this.moduleService
                .deleteModule(moduleId)
                .then(() => {
                    this.findAllModulesForCourse
                    (this.props.courseId)
                });
        }
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setModules(modules) {
        this.setState({modules: modules})
    }

    renderModules() {

        //var modules = this.state.modules;
        //var moduleList = [];
        let modules = this.state.modules.map((module) => {
            return <ModuleListItem module={module} key={module.id} courseId={this.state.courseId}
                                   delete={this.deleteModule}
                                   edit={this.editModule}
                                   onModuleSelected={this.props.onModuleSelected}
                                   selected={this.props.selectedModule == module}/>
        });
        return (<tbody>{modules}</tbody>)
    }

    render() {
        return (
            <Router>
            <div>
                <table className="table table-bordered table-striped table-responsive-md"
                       align='center'>
                    <tr>
                        <td>
                            <input value={this.state.module.title}
                                   placeholder="New Module"
                                   onChange={this.setModuleAttributes}/>
                        </td>
                        <td>
                            <button onClick={this.createModule}>
                                <i className="fa fa-plus"/>
                            </button>
                            <button onClick={this.updateModule}>
                                <i className="fa fa-check"/>
                            </button>
                        </td>
                    </tr>
                        {this.renderModules()}

                </table>
                <div>
                    <Route path="/course/:courseId/module/:moduleId"
                           component={ModuleEditor}/>
                </div>
            </div>
            </Router>
        )}
}


export default ModuleList2;