import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd';

import './index.css';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});

class Point extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        removePoint: PropTypes.func.isRequired,
    }

    render() {
        const { label, index, removePoint } = this.props;
        return (
            <Draggable draggableId={index} index={index}>
                {(provided, snapshot) => (
                    <div>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                            {label}
                            <span
                                onClick={() => removePoint(index)}
                            >x</span>
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Point;
