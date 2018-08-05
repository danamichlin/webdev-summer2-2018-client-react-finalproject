import React from 'react'

export const HeadingWidget = ({widget, updateWidget}) => {

    // variables to bind to low-level node
    let text;
    let size;

    return (
    <div>
        {!widget.showPreview &&
         <div>
             <label htmlFor="text" className="form-control">
                 Heading Text
                 <input className="form-control"
                        placeholder="Enter Heading Text"
                        id="text"
                        ref={node => text = node}
                        onChange={() => {
                            widget.text = text.value;
                            updateWidget(widget);
                            // insert - check to see if no size set, then if true set default size to h1
                        }}/>
             </label>




             <label htmlFor="size">Heading Size</label>
                 <select className="form-control"
                         id="size"
                         value={widget.size}
                         ref={node => size = node}
                         onChange={() => {
                             widget.size = parseInt(size.value);
                             updateWidget(widget);
                         }}>
                     <option value="1">Heading 1</option>
                     <option value="2">Heading 2</option>
                     <option value="3">Heading 3</option>
                     <option value="4">Heading 4</option>
                 </select>

             <h4>Preview</h4>

         </div>
        }

        {widget.size === 1 && <h1>{widget.text}</h1>}
        {widget.size === 2 && <h2>{widget.text}</h2>}
        {widget.size === 3 && <h3>{widget.text}</h3>}
        {widget.size === 4 && <h4>{widget.text}</h4>}


    </div>
    )
}
