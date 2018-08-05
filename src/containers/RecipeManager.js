import CourseList from './cuisines/CuisineList';
import CourseEditor from './cuisines/CuisineEditor';
import ModuleEditor from './modules/ModuleEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import WidgetListComponent from './widgets/WidgetListComponent'
import WidgetListContainer from "./widgets/WidgetListContainer";

class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div>
                {/*<root>*/}
                    <Route exact path="/cuisine/list"
                           component={CuisineList}>
                    </Route>
                    <Route exact path="/course/:courseId/edit"
                           component={CuisineEditor}>
                    </Route>
                    {/*<Route exact path="/course/:courseId/module/:moduleId/lesson/:lessonId"*/}
                           {/*component={LessonEditor}*/}
                    <Route exact path="/cuisine/:cuisineId/recipe"
                           component={RecipeEditorContainer}>
                    </Route>
                    {/*<Link to="/widgets">Widgets</Link>*/}

                    {/*<Route exact path="/course/:courseId/module/:moduleId"*/}
                           {/*component={ModuleEditor}/>*/}
                {/*</root>*/}
                </div>
            </Router>
        )};
}

export default CourseManager;
