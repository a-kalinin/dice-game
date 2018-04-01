import { sha256 } from 'js-sha256';

// getting private property name
const resultPropName = Symbol();

class MockupServerConnection {

    constructor(){
        this.rangeStart = 1;
        this.rangeEnd = 100;
        this[resultPropName] = null; //private property
        this.resultHash = null;
    }

    /**
     * Starts new game, reset all the game attributes, such as number, hash
     * @return {Promise<String>} - resolve function will get new number's hash
     */
    startNewGame(){
        const result = this.getResult();
        this[resultPropName] = result;
        this.resultHash = sha256(result.salted);
        return new Promise(function(resolve, reject){
            setTimeout( hash => resolve(hash), 100, this.resultHash ); // mockup delay for API call
        }.bind(this));
    }

    /**
     * generates game data, such as number and salted string (to get hash)
     * @return {{number: number, salted: string}}
     */
    getResult(){
        const number = Math.round( this.rangeStart + (this.rangeEnd  - this.rangeStart) * Math.random() ),
            saltLength = 5,
            saltRange = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            getRandomSymbol = () => saltRange[ Math.round( Math.random()*( saltRange.length-1 ) ) ];
        let salt = '__';

        for(let i = 0; i<saltLength; i++){
            salt += getRandomSymbol();
        }

        return {number, salted: number+salt}
    }

    /**
     * Get user's bet data and returns all the game data with win/lose result included
     * @param {Number} number - number, which user bets on
     * @param {Number} amount - amount of user's bet
     * @param {String} bet - type of bet, allowed "hi" and "lo"
     * @return {Promise<{hash: string, win: boolean, winAmount: number, number: number, salted: string}>}
     *      hash - hash string of salted number
     *      win - boolean, indicates if the user won
     *      winAmount - amount, which user won
     *      number - game result number
     *      salted - number+salt string
     */
    endGame( number, amount, bet ){
        const gameResult = this[resultPropName],
            resNumber = gameResult.number,
            chances = this.getChance(number)[bet],
            win = bet === 'hi' ? resNumber >= number : resNumber <= number,
            winAmount = win ? amount * chances.payout : 0,
            hash = this.resultHash;

        this[resultPropName] = null;
        this.resultHash = null;

        return new Promise(function(resolve,reject){
            const result = Object.assign({}, gameResult, {
                hash,
                win,
                winAmount,
            });
            setTimeout( result => resolve(result), 100, result ); // mockup delay for API call
        });
    }

    /**
     * gets number, which user bets on, and returns chances for "hi" and "lo" bet types
     * @param number - number, which user bets on
     * @return {{hi: {chance: number, payout: number}, lo: {chance: number, payout: number}}}
     *      chance - chance of win in percents
     *      payout - multiplier for user's bet's amount in win case
     */
    getChance(number){
        if( typeof number !== 'number' || number > this.rangeEnd || number < this.rangeStart ){
            throw new Error('Wrong number passed: '+ String(number));
        }

        const range = this.rangeEnd - this.rangeStart + 1,
            loRange = number - this.rangeStart+1,
            hiRange = this.rangeEnd - number,
            loChance = loRange / range,
            hiChance = hiRange / range;

        return {
            hi:{
                chance: hiChance*100,
                payout: Math.round(1/hiChance * 100) / 100,
            },
            lo:{
                chance: loChance*100,
                payout: Math.round(1/loChance * 100) / 100,
            }
        }

    }

}

export default MockupServerConnection;
