let _singleton = Symbol();

export default class WidgetService {

    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }

    createWidget(widget) {
        var url = `http://localhost:8080/api/lesson/${widget.lessonId}/widget`;
        return fetch(url, {
            body: JSON.stringify(widget),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
            .then(function (response) {
            return response.json(); })
    }

    saveWidgets(widgets, lessonId) {
        var url = `http://localhost:8080/api/lesson/${lessonId}/widget`;
        return fetch(url, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(widgets)
        });
        // }).then(function (response) {
        //     return response.json();
        // })
    }

    deleteWidget(widgetId) {
        var url = `http://localhost:8080/api/widget/${widgetId}`;
        return fetch(url, {
            method: 'delete'
        });
    }

    loadWidgetsByLessonId(lessonId) {
        return fetch(`http://localhost:8080/api/lesson/${lessonId}/widget`);
    }


}
