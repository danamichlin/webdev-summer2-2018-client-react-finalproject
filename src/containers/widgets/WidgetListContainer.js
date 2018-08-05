import {connect} from 'react-redux'
import WidgetListComponent from './WidgetListComponent.js'
import WidgetService from '../../services/WidgetService.js'

const stateToPropertyMapper = (state, ownProps) => (
    {
        // widgets: ownProps.lesson.widgets
        widgets: state.widgets
    }
);

let widgetService = WidgetService.instance;

const dispatcherToPropertyMapper = dispatch => (
    {
        deleteWidget: (wid) => dispatch({
            type: 'DELETE_WIDGET',
            widgetId: wid
        }),
        createWidget: w => dispatch({
            type: 'CREATE_WIDGET',
            widget: w
        }),
        updateWidget: w => dispatch({
            type: 'UPDATE_WIDGET',
            widget: w
        }),
        saveWidgets: (lessonId) => dispatch({
            type: 'SAVE_WIDGETS',
            lessonId: lessonId
        }),
        loadAllWidgets: () => {
            fetch('http://localhost:8080/api/widget')
                .then(response => response.json())
                .then(widgets => dispatch({
                    type: 'FIND_ALL_WIDGETS',
                    widgets: widgets
                }))
        },
        loadWidgetsByLessonId: lessonId => {
            //fetch(`http://localhost:8080/api/lesson/${lessonId}/widget`)
            return widgetService.loadWidgetsByLessonId(lessonId)
                .then(response => response.json())
                .then(widgets => dispatch({
                    type: 'FIND_LESSON_WIDGETS',
                    widgets: widgets
                }))
        },
        up: (widgetId) => {
            dispatch({
                type: 'UP',
                widgetId: widgetId
            })
        },
        down: (widgetId) => {
            dispatch({
                type: 'DOWN',
                widgetId: widgetId
            })
        },
        updateView: (showPreview) => {
            dispatch({
                type: 'PREVIEW',
                showPreview: showPreview
            })
        }
    }
);


const WidgetListContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)
    (WidgetListComponent);

export default WidgetListContainer;