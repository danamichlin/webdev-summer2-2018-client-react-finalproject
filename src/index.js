import React from 'react'
import ReactDOM from 'react-dom'
import CourseManager from './containers/CourseManager';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {widgetReducer} from "./reducers/widgetReducer";


class ModuleListItem extends React.Component {
    render() {
        return(
            <li className="list-group-item">
                {this.props.title}
                <span className="pull-right">
          <i style={{'margin-right': '5px'}} className="fa fa-trash"></i>
          <i className="fa fa-pencil"></i>
        </span>
            </li>
        )
    }
}

let store = createStore(widgetReducer);


class WhiteBoard extends React.Component {
    render() {
        return (
            <Provider store={store}>
            <div className="container-fluid" >
                <div className="p-3 mb-2 bg-secondary text-white">Whiteboard</div>
                <div>
                    <CourseManager/>
                </div>
            </div>
            </Provider>
        )
    }
}

ReactDOM.render(
    <WhiteBoard/>,
    document.getElementById('root')
);