import React from 'react';
import {array, func} from 'prop-types';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

import Point from '../point';
import './index.css';

const grid = 8;

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
});

const PointList = (props) => {
    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        props.reorder(
            props.pointList,
            result.source.index,
            result.destination.index
        );
    };

    const {pointList, removePoint} = props;
    return (
        <DragDropContext onDragEnd={onDragEnd}>
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

};

PointList.propTypes = {
    pointList: array.isRequired,
    reorder: func.isRequired,
    removePoint: func.isRequired,
};

export default PointList;
