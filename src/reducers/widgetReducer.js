import WidgetService from '../services/WidgetService'

let initialState = {
    widgets:
        [
            // {title: 'Heading Widget 1', id: 1, widgetType: 'HEADING'},
            // {title: 'List Widget 1', id: 2, widgetType: 'LIST', ordered: false,
            // listItems: 'item1\nitem2\nitem3'},
            // {title: 'YouTube Widget 1', id: 3, widgetType: 'YOUTUBE'},
            // {title: 'Widget 1', id: 123, widgetType: 'WT1'},
            // {title: 'Widget 2', id: 234, widgetType: 'WT2'},
            // {title: 'Widget 3', id: 345, widgetType: 'WT3'},
            // {title: 'Widget 4', id: 456, widgetType: 'WT4'}
        ]
};

let widgetService = WidgetService.instance;

export const widgetReducer = (

    state=initialState,

    action) => {

    let fromIndex;
    let toIndex;

    switch (action.type) {

        case 'FIND_ALL_WIDGETS':
            console.log(action.widgets);
            return {
                widgets: action.widgets
            };
        case 'FIND_LESSON_WIDGETS':
            return {
                widgets: action.widgets
            };
        case 'DELETE_WIDGET':
            widgetService.deleteWidget(action.widgetId);
            return {
                widgets: state.widgets.filter(
                    widget => widget.id !== action.widgetId
                )
            };
        case 'CREATE_WIDGET':
            widgetService.createWidget(action.widget);
            return {
                widgets: [
                    action.widget,
                    ...state.widgets
                ]
            };
        case 'UPDATE_WIDGET':
            return {
                widgets: state.widgets.map(widget => {
                    // NOTE: widget is old widget; action.widget is new widget
                    if (widget.id === action.widget.id) {
                        return action.widget;
                    }
                    else {
                        return widget;
                    }
                })
            };
        case 'SAVE_WIDGETS':
            widgetService.saveWidgets(state.widgets, action.lessonId);
            return state;
        case 'UP' :
            fromIndex = state.widgets.findIndex(widget => widget.id === action.widgetId);
            toIndex = fromIndex--;
            let state2 = JSON.parse(JSON.stringify(state));
            state2.widgets.splice(toIndex, 0, state2.widgets.splice(fromIndex, 1)[0]);
            return state2;
            // console.log(action.widgetId);
            // fromIndex = state.widgets.findIndex((widget) => widget.id === action.widgetId);
            // toIndex = fromIndex--;
            // state.widgets.splice(toIndex, 0, state.widgets.splice(fromIndex, 1)[0]);
            // let widgets = Object.assign(state.widgets);
            // return {
            //     widgets: widgets
            // };
            //return state;
        case 'DOWN' :
            fromIndex = state.widgets.findIndex(widget => widget.id === action.widgetId);
            toIndex = fromIndex++;
            state2 = JSON.parse(JSON.stringify(state));
            // state2 = Object.assign(state);
            state2.widgets.splice(toIndex, 0, state2.widgets.splice(fromIndex, 1)[0]);
            return state2;
            // fromIndex = state.widgets.findIndex((widget) => widget.id === action.widgetId);
            // toIndex = fromIndex++;
            // return state;
        case 'PREVIEW' :
            return {
                widgets: state.widgets.map(widget => {
                    // NOTE: widget is old widget; action.widget is new widget
                    widget.showPreview = action.showPreview;
                    return widget;
                })
            };
        default: return state;
    }

}
