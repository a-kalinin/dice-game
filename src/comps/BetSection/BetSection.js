import React, { Component } from 'react';
import BetButton from '../BetButton/BetButton';
import './BetSection.css';

class BetSection extends Component {
    constructor(props){
        super(props);
        this.state = {
            number: 0,
            amount: 0,
        };
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleFormSubmitClick = this.handleFormSubmitClick.bind(this);
    }

    handleFormSubmitClick(value){
        if(this.state.number && this.state.amount){
            this.props.onBetMake && this.props.onBetMake(
                Object.assign({value}, this.state)
            );
        }
    }

    handleAmountChange(event){
        let amount = Number(event.target.value || 0);
        if(event.target.value.indexOf('.') >=0 || event.target.value.indexOf(',') >=0 ){
            this.setState( {amount: event.target.value} );
        }
        else if(!isNaN(amount) && typeof this.props.balance === 'number'){
            amount = Math.min(this.props.balance, Math.max(0,amount));
            this.setState( {amount} );
        }
    }

    handleNumberChange(event){
        let number = Number(event.target.value || 0);
        if(isNaN(number)){
            return;
        }
        number = Math.min(100, Math.max(0, number));
        this.props.onNumberChange && this.props.onNumberChange(number);
        this.setState( {number} );
    }

    render() {
        let amountInput = <input onChange={this.handleAmountChange} value={this.state.amount}
                                 type="text" pattern="[0-9\.,]*" name="betAmount" required="required" />,
            numberInput = <input onChange={this.handleNumberChange}  value={this.state.number}
                                 type="text" pattern="[0-9]*" name="number" required="required" />;

        if(this.props.disabled){
            amountInput = <input onChange={this.handleAmountChange} value={this.state.amount} required="required"
                                 type="text" pattern="[0-9]*" name="betAmount" disabled="disabled"/>;
            numberInput = <input onChange={this.handleNumberChange}  value={this.state.number} required="required"
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
                                   onClick={this.handleFormSubmitClick} disabled={this.props.disabled} />
                        <BetButton name="lo" number={this.props.number} chance={this.props.chance && this.props.chance.lo}
                                   onClick={this.handleFormSubmitClick} disabled={this.props.disabled} />
                    </div>
                </form>
            </section>
        );
    }
}

export default BetSection;