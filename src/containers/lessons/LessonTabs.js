import React from 'react'
import LessonEditor from './LessonEditor'
import LessonService from '../../services/LessonService'
import LessonAddition from '../../components/LessonAddition'

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLessonIndex: 0
        }

        this.lessonService = LessonService.instance;

        this.selectLesson = this.selectLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.nameChanged = this.nameChanged.bind(this);

    }


    createLesson(title) {
        var lesson = {title: title,
            moduleId: this.props.module.id};
        this.lessonService.createLesson(this.props.courseId, this.props.module.id, lesson)
            .then((actLesson) => {
                this.props.module.lessons.push(actLesson);
                this.forceUpdate();
            })
    }

    selectLesson = (index) => {
        this.setState({selectedLessonIndex: index})
    }

    deleteLesson(lessonId) {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            this.lessonService.deleteLesson(lessonId);
            for (var i = 0; i < this.props.module.lessons.length; i++) {
                if (this.props.module.lessons[i].id == lessonId) {
                    this.props.module.lessons.splice(i, 1);
                    break;
                }
            }
            this.forceUpdate();
        }
    }

    nameChanged() {
        this.forceUpdate();
    }

  render() {
    if (!this.props.module) {
      return <div>Please select Module</div>
    }
    else {
        var hasLesson = this.state.selectedLessonIndex < this.props.module.lessons.length;
        return (
            <div>
              <h6>Lesson Tabs {this.props.module.lessons.length}</h6>
              <ul className="nav nav-tabs">
                  {this.props.module.lessons.map(
                      (lesson, i) => {
                          return (
                              <li className='nav-item'>
                              {/*<LessonTab lesson={lesson}*/}
                                         {/*onClick={() => this.selectLesson(i)}*/}
                                  {/*key={lesson.id} deleteLesson={this.deleteLesson}>*/}

                              {/*</LessonTab>*/}
                                  <a className={i == this.state.selectedLessonIndex
                                                ? "nav-link active"
                                                : "nav-link"}
                                     href="#"
                                  onClick={() => this.selectLesson(i)}>{lesson.title}</a>&nbsp;&nbsp;
                              </li>
                          )
                      }
                  )}
                  <LessonAddition createLesson={this.createLesson}/>
              </ul>
                {hasLesson && <LessonEditor
                    lesson={this.props.module.lessons[this.state.selectedLessonIndex]}
                    deleteLesson={this.deleteLesson}
                    nameChanged={this.nameChanged}/>}
                {!hasLesson && "Add lessons"}
                {/*<TopicPills lesson={this.props.module.lessons[this.state.selectedLessonIndex]}/>*/}
            </div>
        )
    }
  }
}