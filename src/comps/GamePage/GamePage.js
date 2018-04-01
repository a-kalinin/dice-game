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
            amount: 0,
            number: 0,
            chance: null,
            gameResult: null
        };
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handleCreditsRequest = this.handleCreditsRequest.bind(this);
        this.handleBetMake = this.handleBetMake.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
    }

    componentDidMount() {
        //attach plugin for balance API
        this.balance = new Balance();
        this.balance.get().then( balance => this.setState({balance}) );

        //attach plugin for game API
        this.api = new API();
        this.api.startNewGame().then( hash => this.setState({hash, gameResult: null}) );
    }

    /**
     * handler for user's bet's number change
     * @param {Number} number - number, which user bets on
     */
    handleNumberChange(number){
        const chance = number ? this.api.getChance(number) : null;
        this.setState({number, chance});
    }

    /**
     * handler for user's bet's amount change
     * @param {Number} amount - user's bet's amount
     */
    handleAmountChange(amount){
        this.setState({amount});
    }

    /**
     * handler for user's free credits request
     * @param {Event} event - button click event
     */
    handleCreditsRequest(event){
        event.preventDefault();
        this.balance.getCredit()
            .then( balance => this.setState({balance}) )
            .catch( error => console.log(error) );
    }

    /**
     * handler for user's bet
     * @param {String} bet - type of bet, allowed "hi" and "lo"
     */
    handleBetMake(bet){
        if(!this.state.number || !this.state.amount){
            return;
        }
        this.setState({gameEnded:true});
        this.balance.subtract(this.state.amount)
            .then(function(balance){

                this.setState({balance});
                this.api.endGame(Number(this.state.number), this.state.amount, bet)
                    .then(results => this.showResults(results));

            }.bind(this))
    }

    /**
     * Show game results and update balance
     * @param {Object} results - game results from game API
     * @param {String} results.hash - hash string of salted number
     * @param {Boolean} results.win - boolean, indicates if the user won
     * @param {Number} results.winAmount - amount, which user won
     * @param {Number} results.number - game result number
     * @param {String} results.salted - number+salt string
     */
    showResults(results){
        this.setState({gameResult: results});
        this.balance.add(results.winAmount)
            .then( balance => this.setState({balance}) );
    }

    /**
     * reset data and start new game
     */
    startNewGame(){
        this.api.startNewGame()
            .then( hash => this.setState({hash, gameResult: null}) );
    }

    render() {
        const disableBetButtons = !this.state.number || !this.state.amount;
        return (
            <div className="GamePage">
                <BalanceSection balance={this.state.balance} onCreditsRequest={this.handleCreditsRequest}/>
                <BetSection balance={this.state.balance} number={this.state.number} amount={this.state.amount}
                            chance={this.state.chance} onNumberChange={this.handleNumberChange}
                            onAmountChange={this.handleAmountChange} onBetMake={this.handleBetMake}
                            disableBetButtons={disableBetButtons} disableAll={!!this.state.gameResult}/>
                <GameSection hash={this.state.hash} onRestart={this.startNewGame}
                             win={this.state.gameResult && this.state.gameResult.win}
                             number={this.state.gameResult && this.state.gameResult.number}
                             string={this.state.gameResult && this.state.gameResult.string} />
            </div>
        );
    }
}

export default GamePage;