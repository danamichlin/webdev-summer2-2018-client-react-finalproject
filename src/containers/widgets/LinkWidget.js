import React from 'react'

export const LinkWidget = ({widget, updateWidget}) => {
    let widgetType;
    let url;
    let name;
    return (

        <div>
            {!widget.showPreview &&
             <div>
                 <label className="form-control" htmlFor="hyperlink">Link URL
                     <input id="hyperlink"
                            className="form-control"
                            value={widget.url}
                            ref={node => url = node}
                            placeholder="URL"
                            onChange={() => {
                                widget.url = url.value;
                                updateWidget(widget);
                            }}>
                     </input>
                 </label>

                 <label className="form-control" htmlFor="linkName">
                     Link Name
                     <input id="linkName"
                            className="form-control"
                            value={widget.name}
                            ref={node => name = node}
                            placeholder="This is a link"
                            onChange={() => {
                                widget.name = name.value;
                                updateWidget(widget);
                            }}>
                     </input>
                 </label>

                 <h4>Preview</h4>
             </div>
            }

            GO TO: <a href={widget.url}>{widget.name}</a>

            {/*<select className="form-control-sm float-right"*/}
            {/*ref={node => widgetType = node}*/}
            {/*onChange={() => {*/}
            {/*let w = {*/}
            {/*id: widget.id,*/}
            {/*widgetType: widgetType.value*/}
            {/*};*/}
            {/*updateWidget(w)}}>*/}
            {/*<option value="PARAGRAPH">Paragraph Widget</option>*/}
            {/*<option value="WT2">Widget Type 2</option>*/}
            {/*<option value="WT3">Widget Type 3</option>*/}
            {/*<option value="WT4">Widget Type 4</option>*/}
            {/*</select>*/}

        </div>
    )
}
