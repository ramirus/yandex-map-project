import React, {Component} from 'react';

import './index.css';
import ControlContainer from '../controlContainer';
import MapService from '../../utils/mapService';

class App extends Component {
    mapService = {};
    state = {
        placeMarks: [],
        center: [55.79, 49.12]
    };

    handlePointSubmit = (pointAddress) => {
        this.mapService.addPoint(pointAddress, this.state.placeMarks.length).then(newPlacemark => {
            let placeMarks = this.state.placeMarks;
            placeMarks = [...placeMarks, newPlacemark];
            this.setState({
                placeMarks: placeMarks
            });
        });
    }

    updatePointsNum = (placeMarks, startIndex, endIndex) => {
        if (startIndex < endIndex) {
            this.mapService.updatePointsNum(placeMarks, startIndex, endIndex);
        } else {
            this.mapService.updatePointsNum(placeMarks, endIndex, startIndex);
        }
    }

    updatePoints = (index, placeMark) => {
        let placeMarks = [...this.state.placeMarks];
        placeMarks[index] = placeMark;
        this.setState({
            placeMarks
        })
    }

    reorder = (list, startIndex, endIndex) => {
        let placeMarks = [...this.state.placeMarks];
        let [changed] = placeMarks.splice(startIndex, 1);
        placeMarks.splice(endIndex, 0, changed);
        this.setState({
            placeMarks: placeMarks
        });
        this.updatePointsNum(placeMarks, startIndex, endIndex);
    };

    removePoint = (index) => {
        let placeMarks = [...this.state.placeMarks];
        this.mapService.removePlacemark(placeMarks[index]);
        placeMarks = [...placeMarks.slice(0, index), ...placeMarks.slice(index + 1)];
        this.setState({
            placeMarks: placeMarks
        });
        this.updatePointsNum(placeMarks, index, placeMarks.length - 1);
    }

    componentDidMount() {
        this.mapService = new MapService(this.mapContainer, this.state.center, this.updatePoints);
    }

    render() {
        return (
            <div className="app-container">
                <div
                    className="map-container"
                    ref={(map) => this.mapContainer = map}
                />
                <ControlContainer
                    pointList={this.state.placeMarks}
                    handlePointSubmit={this.handlePointSubmit}
                    reorder={this.reorder}
                    removePoint={this.removePoint}
                />
            </div>
        );
    }
}

export default App;
