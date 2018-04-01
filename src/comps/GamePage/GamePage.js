import React, { Component } from 'react';
import GameSection from '../GameSection/GameSection';
import BalanceSection from '../BalanceSection/BalanceSection';
import BetSection from '../BetSection/BetSection';
import API from '../../plugins/MockupServerConnection/MockupServerConnection';
import Balance from '../../plugins/MockupBalance/MockupBalance';
import './GamePage.css';

class GamePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            hash: '',
            balance: 0,
            number: null,
            chance: null,
            gameResult: null
        };
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleCreditsRequest = this.handleCreditsRequest.bind(this);
        this.handleBetMake = this.handleBetMake.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
    }

    componentDidMount() {
        this.balance = new Balance();
        this.balance.get().then( balance => this.setState({balance}) );

        this.api = new API();
        this.api.startNewGame().then( hash => this.setState({hash, gameResult: null}) );
    }

    handleNumberChange(number){
        const chance = number ? this.api.getChance(number) : null;
        this.setState({number, chance});
    }

    handleCreditsRequest(event){
        event.preventDefault();
        this.balance.getCredit()
            .then( balance => this.setState({balance}) )
            .catch( error => console.log(error) );
    }

    handleBetMake(bet){
        console.log(bet);
        this.setState({gameEnded:true});
        this.balance.subtract(bet.amount)
            .then(function(balance){

                this.setState({balance});
                this.api.endGame(Number(bet.number), bet.amount, bet.value)
                    .then(results => this.showResults(results));

            }.bind(this))
    }

    showResults(results){
        console.log(results);
        this.setState({gameResult: results});
        this.balance.add(results.winAmount)
            .then( balance => this.setState({balance}) );

    }

    startNewGame(){
        this.api.startNewGame().then( hash => this.setState({hash, gameResult: null}) );
    }

    render() {
        return (
            <div className="GamePage">
                <BalanceSection balance={this.state.balance} onCreditsRequest={this.handleCreditsRequest}/>
                <BetSection balance={this.state.balance} number={this.state.number}
                            chance={this.state.chance} onNumberChange={this.handleNumberChange}
                            onBetMake={this.handleBetMake} disabled={!!this.state.gameResult}/>
                <GameSection hash={this.state.hash} onRestart={this.startNewGame}
                             win={this.state.gameResult && this.state.gameResult.win}
                             number={this.state.gameResult && this.state.gameResult.number}
                             string={this.state.gameResult && this.state.gameResult.string} />
            </div>
        );
    }
}

export default GamePage;