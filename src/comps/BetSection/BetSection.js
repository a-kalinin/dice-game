import React, { Component } from 'react';
import BetButton from '../BetButton/BetButton';
import './BetSection.css';

class BetSection extends Component {
    constructor(props){
        super(props);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleFormSubmitClick = this.handleFormSubmitClick.bind(this);
    }

    handleFormSubmitClick(value){
        this.props.onBetMake && this.props.onBetMake(value);
    }

    handleAmountChange(event){
        let amount = Number(event.target.value || 0);
        if(event.target.value.indexOf('.') >=0 || event.target.value.indexOf(',') >=0 ){
            this.props.onAmountChange && this.props.onAmountChange(event.target.value);
        }
        else if(!isNaN(amount) && typeof this.props.balance === 'number'){
            amount = Math.min(this.props.balance, Math.max(0,amount));
            this.props.onAmountChange && this.props.onAmountChange(amount);
        }
    }

    handleNumberChange(event){
        let number = Number(event.target.value || 0);
        if(isNaN(number)){
            return;
        }
        number = Math.min(100, Math.max(0, number));
        this.props.onNumberChange && this.props.onNumberChange(number);
    }

    render() {
        let amountInput = <input onChange={this.handleAmountChange} value={this.props.amount}
                                 type="text" pattern="[0-9\.,]*" name="betAmount" required="required" />,
            numberInput = <input onChange={this.handleNumberChange}  value={this.props.number}
                                 type="text" pattern="[0-9]*" name="number" required="required" />;

        if(this.props.disableAll){
            amountInput = <input onChange={this.handleAmountChange} value={this.props.amount} required="required"
                                 type="text" pattern="[0-9]*" name="betAmount" disabled="disabled"/>;
            numberInput = <input onChange={this.handleNumberChange}  value={this.props.number} required="required"
                                 type="text" pattern="[0-9]*" name="number" disabled="disabled"/>;
        }

        return (
            <section className="BetSection">
                <form onSubmit={event => event.preventDefault()}>
                    <div className="row">
                        <div className="column name">Bet Amount</div>
                        <div className="column input">{amountInput}</div>
                    </div>
                    <div className="row">
                        <div className="column name">Number</div>
                        <div className="column input">{numberInput}</div>
                    </div>
                    <div className="row">
                        <BetButton name="hi" number={this.props.number} chance={this.props.chance && this.props.chance.hi}
                                   onClick={this.handleFormSubmitClick} disabled={this.props.disableAll || this.props.disableBetButtons} />
                        <BetButton name="lo" number={this.props.number} chance={this.props.chance && this.props.chance.lo}
                                   onClick={this.handleFormSubmitClick} disabled={this.props.disableAll || this.props.disableBetButtons} />
                    </div>
                </form>
            </section>
        );
    }
}

export default BetSection;