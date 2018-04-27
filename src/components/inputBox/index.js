import React, {Component} from 'react';
import {func} from 'prop-types';

import './index.css';

export default class InputBox extends Component {
    static propTypes = {
        handlePointSubmit: func.isRequired,
    };

    state = {
        inputValue: ''
    };

    handleInputChange = (e) => this.setState({ inputValue: e.target.value });

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.handlePointSubmit(this.state.inputValue);
        this.setState({
            inputValue: ''
        });
    };

    render() {
        return (
            <form
                className="input-container"
                onSubmit={this.handleFormSubmit}
            >
                <input
                    placeholder="Новая точка маршрута"
                    className="input-container-input"
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                />
            </form>
        );
    }
}
