import React, {Component} from 'react';
import PropTypes from 'prop-types'

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
        provided: PropTypes.object.isRequired,
        snapshot: PropTypes.object.isRequired,
    }

    render() {
        const {label, index, removePoint, provided, snapshot} = this.props;
        return (
            <div>
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    className="point"
                >
                            <span className="point-label">
                                {label}
                            </span>
                    <span
                        className="point-remove-icon"
                        onClick={() => removePoint(index)}
                    >x</span>
                </div>
                {provided.placeholder}
            </div>
        );
    }
}

export default Point;
