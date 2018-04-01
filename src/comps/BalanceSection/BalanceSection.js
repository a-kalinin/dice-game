import React, { Component } from 'react';
import './BalanceSection.css';

class BalanceSection extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        event.preventDefault();
        this.props.onCreditsRequest && this.props.onCreditsRequest();
    }

    render() {
        let button = <input type="submit" onClick={this.props.onCreditsRequest} value="Get free credits" />;
        if(this.props.balance){
            button = <input type="submit" onClick={this.props.onCreditsRequest} value="Get free credits" disabled="disabled"/>
        }

        return (
            <div className="BalanceSection">
                <div>
                    Balance: <span className="value">{ this.props.balance }</span> credits
                </div>
                <div>
                    {button}
                </div>
            </div>
        );
    }
}

export default BalanceSection;