import React, { Component } from 'react';
import './GameSection.css';

class GameSection extends Component {
    handleClick(event){
        event.preventDefault();
        this.props.onRestart && this.props.onRestart();
    }

    render() {
        return (
            <div className="GameSection">
                <h4>Game</h4>
                <div className="column">
                    <div>Provably Fair Hash</div>
                    <div>{this.props.hash}</div>
                </div>
                <div className="column">
                    <div>{this.props.win === true ? 'WIN' : this.props.win === false ? 'LOSE' : null}</div>
                    <div>{this.props.number}</div>
                    <div>{this.props.string}</div>
                </div>
                <div className="column">
                    <button onClick={ this.handleClick.bind(this) }>Start New Game</button>
                </div>
            </div>
        );
    }
}

export default GameSection;