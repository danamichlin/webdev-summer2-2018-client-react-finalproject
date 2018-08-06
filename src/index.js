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
        this.state = {api: '', images: []};

        this.titleChanged = this.titleChanged.bind(this);
        this.renderImages = this.renderImages.bind(this); 
        this.renderImageUrls = this.renderImageUrls.bind(this); 
        this.getAPI = this.getAPI.bind(this);
    }
    titleChanged(event) {
        this.setState({api: event.target.value})
    };

    renderImages(response) {
        response.items.forEach(element => {
            this.setState({images: this.state.images.concat(element.snippet.thumbnails.default.url)})
        });
    };

    renderImageUrls() {
        var rows = this.state.images.map(function(image) {
            console.log("rendering");
            return <img className="widget-image" src={image} width="90"/>;
        });
        return (rows)
    };

    getAPI() {
        this.setState({images: []});
            fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + this.state.api + "&type=video&key=AIzaSyBy8LJmSegON_gEweoYnun1JwZbzaojYhs")
                .then(function(response){
                        return response.json(); 
                    }).then(res => {
                        this.renderImages(res);
                    })
        }; 
    
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
                            <tbody>
              {this.renderImageUrls()}
            </tbody>
            </div>
            </Provider>
        )
    }
}

ReactDOM.render(
    <WhiteBoard/>,
    document.getElementById('root')
);