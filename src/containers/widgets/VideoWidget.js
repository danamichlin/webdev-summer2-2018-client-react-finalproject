import React from 'react'

export const VideoWidget = ({widget, updateWidget}) => {

    let src;
    return (
        <div>

            {!widget.showPreview &&
             <div>
                 <label htmlFor="URL" className="form-control">YouTube ID
                     <input id="URL"
                            className="form-control"
                            ref={node => src = node}
                            placeholder="Enter YouTube video ID here"
                            onChange={() => {
                                widget.src = src.value;
                                updateWidget(widget);
                            }}/>
                 </label>

                 <h4>Preview</h4>
             </div>
            }

            <iframe width="560" height="315"
                    src={`https://www.youtube.com/embed/${widget.src}`}
                    frameBorder="0" allow="autoplay; encrypted-media"
                    allowFullScreen></iframe>

        </div>
    )

}