let _singleton = Symbol();

// URL of the backend server
//const COURSE_API_URL =
//    'https://intense-journey-34677.herokuapp.com/';

const COURSE_API_URL = 'http://localhost:8080/api/course'

class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }


    createCourse(course) {
        var courseObjStr = JSON.stringify(course);
        return fetch(COURSE_API_URL, {
            method: 'Post',
            body: courseObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    deleteCourse(courseId) {
        return fetch(COURSE_API_URL + "/" + courseId, {method: 'delete'})
    }

    findAllCourses() {
            return fetch(COURSE_API_URL)
                .then(function(response){
                    return response.json();
                });
    }

    findCourseById(courseId) {
        return fetch(COURSE_API_URL + "/" + courseId)
            .then(function(response) {
                return response.json();
            });
    }

    updateCourse(courseId, course) {
        var url = COURSE_API_URL + "/" + courseId;
        var courseObjStr = JSON.stringify()
        return fetch(url, {
            method: 'Put',
            body: courseObjStr,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
export default CourseService;
