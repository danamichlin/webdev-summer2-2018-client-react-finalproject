import React from 'react'
import LessonEditor from './RecipeEditor'
import LessonService from '../../services/RecipeService'
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


    createRecipe(title) {
        var lesson = {title: title,
            moduleId: this.props.module.id};
        this.lessonService.createLesson(this.props.courseId, this.props.module.id, lesson)
            .then((actLesson) => {
                this.props.module.lessons.push(actLesson);
                this.forceUpdate();
            })
    }

    selectRecipe = (index) => {
        this.setState({selectedLessonIndex: index})
    }

    deleteRecipe(lessonId) {
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

  }
}