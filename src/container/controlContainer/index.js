import React from 'react';

import './index.css';
import InputBox from '../../components/inputBox';
import PointList from '../../components/pointList';

const ControlContainer = (props) => {
    const {
        pointList,
        handlePointSubmit,
        reorder,
        removePoint
    } = props;

    return (
        <div className="control-container">
            <InputBox
                handlePointSubmit={handlePointSubmit}
            />
            <PointList
                pointList={pointList}
                reorder={reorder}
                removePoint={removePoint}
            />
        </div>
    );
};

export default ControlContainer;