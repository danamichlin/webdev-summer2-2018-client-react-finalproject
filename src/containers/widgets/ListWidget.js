import React from 'react'

export const ListWidget = ({widget, updateWidget}) => {

    // variables to bind to low-level node
    let text;
    let ordered;

    return (
        <div>
            {!widget.showPreview &&
             <div>
                 <h3>List Widget</h3>
                 <label className="form-control" htmlFor="list">
                     List Items
                     <textarea id="list"
                               className="form-control"
                               value={widget.listItems}
                               ref={node => text = node}
                               placeholder="Enter list items here"
                               onChange={() => {
                                   widget.listItems = text.value;
                                   updateWidget(widget);
                               }}>

                    </textarea>
                 </label>

                 <label>
                     <input type="checkbox"
                            checked={widget.ordered}
                            ref={node => ordered = node}
                            onChange={() => {
                                widget.ordered = ordered.checked;
                                updateWidget(widget);
                            }}/>Ordered
                 </label>


                 <h4>Preview</h4>
             </div>
            }

            {!widget.ordered && widget.listItems &&
             <ul>
                 {widget.listItems.split("\n").map((item, index) => (
                     <li key={index}>{item}</li>
                 ))}
             </ul>
            }

            {widget.ordered && widget.listItems &&
             <ol>
                 {widget.listItems.split("\n").map((item, index) => (
                     <li key={index}>{item}</li>
                 ))}
             </ol>
            }
        </div>
    )
}
