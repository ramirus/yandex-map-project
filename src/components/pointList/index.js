import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import Point from '../point';
import './index.css';

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
});

class PointList extends Component {
    static propTypes = {
        pointList: PropTypes.array.isRequired,
        reorder: PropTypes.func.isRequired,
        removePoint: PropTypes.func.isRequired,
    };

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        this.props.reorder(
            this.props.pointList,
            result.source.index,
            result.destination.index
        );
    }

    render() {
        const {pointList, removePoint} = this.props;
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {pointList.map((item, index) => (
                                <Draggable draggableId={index} index={index} key={index}>
                                    {(provided, snapshot) => (
                                        <Point
                                            provided={provided}
                                            snapshot={snapshot}
                                            label={item.properties.get('balloonContent')}
                                            index={index}
                                            removePoint={removePoint}
                                        />
                                    )}
                                </Draggable>

                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default PointList;
