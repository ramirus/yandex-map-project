import React, {Component} from 'react';
import './index.css';

class InputBox extends Component {

    state = {
        inputValue: ''
    }

    handleInputChange = (e) => this.setState({ inputValue: e.target.value });

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.setState({
            inputValue: ''
        })
        this.props.handlePointSubmit(this.state.inputValue);
    }

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

export default InputBox;
