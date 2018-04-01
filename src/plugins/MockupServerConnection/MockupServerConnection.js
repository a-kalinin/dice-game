import { sha256 } from 'js-sha256';

const resultPropName = Symbol();

class MockupServerConnection {

    constructor(){
        this.rangeStart = 1;
        this.rangeEnd = 100;
        this[resultPropName] = null; //private property
        this.resultHash = null;
    }

    startNewGame(){
        const result = this.getResult();
        this[resultPropName] = result;
        this.resultHash = sha256(result.string);
        return new Promise(function(resolve, reject){
            setTimeout( hash => resolve(hash), 100, this.resultHash ); // mockup delay for API call
        }.bind(this));
    }

    getResult(){
        const number = Math.round( this.rangeStart + (this.rangeEnd  - this.rangeStart) * Math.random() ),
            saltLength = 5,
            saltRange = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            getRandomSymbol = () => saltRange[ Math.round( Math.random()*( saltRange.length-1 ) ) ];
        let salt = '';

        for(let i = 0; i<saltLength; i++){
            salt += getRandomSymbol();
        }

        return {number, salt, string: number+salt}
    }

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
