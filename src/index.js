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
    constructor() {
        super();
        this.state = {api: ''};

        this.titleChanged = this.titleChanged.bind(this);
        this.getAPI = this.getAPI.bind(this);
    }
    titleChanged(event) {
        this.setState({api: event.target.value})
    };

    getAPI() {
        return window.location.replace("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + this.state.api + "&type=video&key=AIzaSyBy8LJmSegON_gEweoYnun1JwZbzaojYhs")
    }
    
    render() {
        return (
            <Provider store={store}>
            <div className="container-fluid" >
                <div className="p-3 mb-2 bg-secondary text-white">Recipe tutorials</div>
                <input id="titleFld"
                               placeholder="breaded chicken"
                               onChange={this.titleChanged}
                               />
                <button onClick={this.getAPI}>
                                UseApi
                            </button>
            </div>
            </Provider>
        )
    }
}

ReactDOM.render(
    <WhiteBoard/>,
    document.getElementById('root')
);