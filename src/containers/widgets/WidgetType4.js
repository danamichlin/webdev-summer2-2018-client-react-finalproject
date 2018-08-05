import React from 'react'

export const WidgetType4 = ({widget, updateWidget}) => {
    let widgetType;
    return (
        <div>
            <h3>Widgety Type 4 - {widget.title} - {widget.widgetType}</h3>
            <select className="form-control"
                    ref={node => widgetType = node}
                    onChange={() => {
                        let w = {
                            id: widget.id,
                            widgetType: widgetType.value
                        };
                        updateWidget(w)}}>
                <option value="WT1">Widget Type 1</option>
                <option value="WT2">Widget Type 2</option>
                <option value="WT3">Widget Type 3</option>
                <option value="WT4">Widget Type 4</option>

            </select>
        </div>
    )
}