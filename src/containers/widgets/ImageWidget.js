import React from 'react'

export const ImageWidget = ({widget, updateWidget}) => {

    let src;
    let caption;
    return (
        <div>
        {!widget.showPreview &&
         <div>
            <label htmlFor="imageUrl" className="form-control">Image Source
                <input id="imageUrl"
                       className="form-control"
                       placeholder="Image URL"
                       ref={node => src = node}
                       value={widget.src}
                       onChange={() => {
                           widget.src = src.value;
                           updateWidget(widget);
                       }}/>
            </label>

            <label htmlFor="caption" className="form-control">Caption
                <input id="caption"
                       className="form-control"
                       placeholder="Caption"
                       ref={node => caption = node}
                       value={widget.caption}
                       onChange={() => {
                           widget.caption = caption.value;
                           updateWidget(widget);
                       }}/>
            </label>


            <h4>Preview</h4>
         </div>
        }
            <img src={widget.src}></img>
            <p>{widget.caption}</p>

        </div>
    )

}