import React, { Component } from 'react';
import './GameSection.css';

class GameSection extends Component {
    handleClick(event){
        event.preventDefault();
        this.props.onRestart && this.props.onRestart();
    }

    render() {
        return (
            <section className="GameSection">
                <div className="column">
                    <h4>Provably Fair Hash</h4>
                    <div><textarea disabled="disabled" value={this.props.hash} /></div>
                </div>
                <div className="column gameResults">
                    <h4>Game</h4>
                    <div className={this.props.win === true ? 'win result' : this.props.win === false ? 'lose result' : 'result'} />
                    <div className="number">{this.props.number}</div>
                    <div className="string">{this.props.string}</div>
                </div>
                <div className="column">
                    <button onClick={ this.handleClick.bind(this) }>Start New Game</button>
                </div>
            </section>
        );
    }
}

export default GameSection;