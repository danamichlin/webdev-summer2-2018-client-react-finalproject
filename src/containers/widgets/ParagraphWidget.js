import React from 'react'

export const ParagraphWidget = ({widget, updateWidget}) => {
    //let widgetType;
    let text;
    return (

        <div>
            {!widget.showPreview &&
            <div>

                <label className="form-control" htmlFor="paragraph">
                    Paragraph Text
                    <textarea id="paragraph"
                              className="form-control"
                              placeholder="Enter paragraph text here"
                              value={widget.text}
                              ref={node => text = node}
                              onChange={ () => {
                                  widget.text = text.value;
                                  updateWidget(widget);
                              }}>
                    </textarea>
                </label>
                <h4>Preview</h4>
            </div>
            }

            <p>{widget.text}</p>

        </div>
    )
}
