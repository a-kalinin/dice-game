import React, { Component } from 'react';
import './BetButton.css';

class BetButton extends Component {

    handleClick(event){
        event.preventDefault();
        this.props.onClick && this.props.onClick(this.props.name);
    }

    render() {
        let input = <input type="submit" value={'Bet ' + this.props.name}
                           onClick={this.handleClick.bind(this)}/>;

        if(this.props.disabled){
            input = <input type="submit" value={'Bet ' + this.props.name}
                           onClick={this.handleClick.bind(this)} disabled="disabled"/>;
        }

        return (
            <div className="BetButton">
                <div className="row">
                    {input}
                </div>
                <div className="row">
                    number {this.props.name === 'hi' ? '>=' : '<='} {this.props.number}
                </div>
                <div className="row">
                    chance: {this.props.chance && this.props.chance.chance}%
                </div>
                <div className="row">
                    payout: {this.props.chance && this.props.chance.payout}x
                </div>
             </div>
        );
    }
}

export default BetButton;