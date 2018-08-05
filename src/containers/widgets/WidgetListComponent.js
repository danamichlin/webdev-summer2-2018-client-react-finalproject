import React from 'react'
import {WidgetType1} from './WidgetType1'
import {WidgetType2} from './WidgetType2'
import {WidgetType3} from './WidgetType3'
import {WidgetType4} from './WidgetType4'
import {HeadingWidget} from "./HeadingWidget";
import {ListWidget} from "./ListWidget";
import {VideoWidget} from "./VideoWidget";
import {ParagraphWidget} from "./ParagraphWidget";
import {LinkWidget} from "./LinkWidget";
import {ImageWidget} from "./ImageWidget";

class WidgetListComponent extends React.Component {
    constructor(props) {
        super(props);
        //let widgetTitle;
        //let widgetType;
        //this.props.loadAllWidgets();
        this.props.loadWidgetsByLessonId(props.lesson.id);

    }

    componentDidUpdate(prevProps) {
        if (this.props.lesson.id !== prevProps.lesson.id) {
            this.props.loadWidgetsByLessonId(this.props.lesson.id);
        }
    }

    showPreview;
    widgetTitle;
    widgetType;
    widgetTitleText;

    render() {
        // let lessonWidgets = this.props.widgets.filter(widget =>
        //      widget.lesson.id === this.props.lesson.id);
        return (
            <div>

                {!this.showPreview &&
                 <button className="btn btn-success float-right"
                         onClick={() => {
                             this.props.saveWidgets(this.props.lesson.id);
                         }}>
                     SAVE
                 </button>
                }

                <input type="checkbox"
                       checked={this.showPreview}
                       ref={node => this.preview = node}
                       onChange={() => {
                           this.showPreview = this.preview.checked;
                           this.props.updateView(this.showPreview);
                       }}/>Preview

                {!this.showPreview &&
                 <h1>Widget List ({this.props.widgets.length})</h1>
                }

                <ul className="list-group">

                    {!this.showPreview &&
                     <li className="list-group-item">
                         <label className="form-control" htmlFor="newWidgetTitle">
                             Widget Title
                             <input className="form-control"
                                    id="newWidgetTitle"
                                    value={this.widgetTitleText}
                                    ref={node => this.widgetTitle = node}
                                    onChange={() => {
                                        this.widgetTitleText = this.widgetTitle.value;
                                    }}/>
                         </label>

                         <label className="form-control" htmlFor="newWidgetTypeSelection">
                             Widget Type
                             <select className="form-control"
                                     ref={node => this.widgetType = node}
                                     id="newWidgetTypeSelection">
                                 <option value="HEADING">Heading Widget</option>
                                 <option value="LIST">List Widget</option>
                                 <option value="VIDEO">Video Widget</option>
                                 <option value="PARAGRAPH">Paragraph Widget</option>
                                 <option value="LINK">Link Widget</option>
                                 <option value="IMAGE">Image Widget</option>
                                 <option value="WT4">Widget Type 4</option>
                             </select>
                         </label>
                         <button className="btn btn-primary"
                                 onClick={() => {
                                     let widget = {
                                         lessonId: this.props.lesson.id,
                                         title: this.widgetTitle.value,
                                         widgetType: this.widgetType.value,
                                         showPreview: this.showPreview,
                                         size: 1
                                     };
                                     this.widgetTitle.value = '';
                                     this.props.createWidget(widget);
                                 }}>
                             Add Widget
                         </button>
                     </li>
                    }


                    {this.props.widgets.map((widget, index) =>
                        <li className='list-group-item'
                            key={index}>
                            {/*{widget.title} {widget.id} - {widget.widgetType}*/}

                            {!widget.showPreview &&
                             <div>
                                 <h3 className='float-left'>{widget.widgetType}: {widget.title}</h3>

                                 <button className='float-right btn btn-danger'
                                         onClick={() => this.props.deleteWidget(widget.id)}>
                                     Delete
                                 </button>

                                 <button className='float-right btn btn-warning'
                                         onClick={() => this.props.down(widget.id)}>
                                     <i className='fa fa-chevron-down'/>
                                 </button>

                                 <button className='float-right btn btn-warning'
                                         onClick={() => this.props.up(widget.id)}>
                                     <i className='fa fa-chevron-up'/>
                                 </button>

                                 <select className="form-control-sm float-right"
                                     //ref={node => this.widgetType = node}
                                         onChange={(e) => {
                                             let w = {
                                                 id: widget.id,
                                                 widgetType: e.currentTarget.value
                                             };
                                             this.props.updateWidget(w)
                                         }}>
                                     <option value="HEADING">Heading Widget</option>
                                     <option value="PARAGRAPH">Paragraph Widget</option>
                                     <option value="LIST">List Widget</option>
                                     <option value="VIDEO">Video Widget</option>
                                     <option value="IMAGE">Image Widget</option>
                                     <option value="LINK">Link Widget</option>
                                 </select>
                             </div>
                            }



                            <div>
                                {widget.widgetType === 'HEADING' &&
                                 <HeadingWidget widget={widget}
                                                updateWidget={this.props.updateWidget}/>}

                                {widget.widgetType === 'LIST' &&
                                 <ListWidget widget={widget}
                                             updateWidget={this.props.updateWidget}/>}

                                {widget.widgetType === 'VIDEO' &&
                                 <VideoWidget widget={widget}
                                              updateWidget={this.props.updateWidget}/>}

                                {widget.widgetType === 'PARAGRAPH' &&
                                 <ParagraphWidget widget={widget}
                                              updateWidget={this.props.updateWidget}/>}

                                {widget.widgetType === 'LINK' &&
                                 <LinkWidget widget={widget}
                                              updateWidget={this.props.updateWidget}/>}

                                {widget.widgetType === 'IMAGE' &&
                                 <ImageWidget widget={widget}
                                              updateWidget={this.props.updateWidget}/>}

                                {widget.widgetType === 'WT4' &&
                                 <WidgetType4 widget={widget}
                                              updateWidget={this.props.updateWidget}/>}
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default WidgetListComponent