class MockupServerConnection {

    constructor(){
        this.funds = this.funds || 0;
    }

    /**
     * getter/setter for "funds", changes value stored in localStorage
     */
    get funds(){
        return Number(localStorage.funds);
    }

    set funds(funds){
        localStorage.funds = Math.round(funds*100)/100;
    }

    /**
     * subtracts some credits from balance
     * @param {number} amount - amount to subtract
     * @return {Promise<number>} - resolve will get current balance amount
     */
    subtract( amount ){
        return new Promise(function(resolve, reject){
            if(this.funds >= amount){
                this.funds = this.funds - amount;
                setTimeout( funds => resolve(funds), 100, this.funds ); // mockup delay for API call
            } else {
                setTimeout( () => reject('Not enough funds'), 100 ); // mockup delay for API call
            }
        }.bind(this));
    }

    /**
     * adds some credits to balance
     * @param amount - amount to add
     * @return {Promise<number>} - resolve will get current balance amount
     */
    add(amount){
        return new Promise(function(resolve, reject){
            this.funds = this.funds + amount;
            setTimeout( funds => resolve(funds), 200, this.funds ); // mockup delay for API call
        }.bind(this));
    }

    /**
     * Asks for free credits
     * @return {Promise<number>} - resolve will get current balance amount, if balance>0 - rejects
     */
    getCredit(){
        return new Promise(function(resolve, reject){
            const credit = 100;
            if(this.funds === 0){
                this.funds = this.funds + credit;
                setTimeout( funds => resolve(funds), 200, this.funds ); // mockup delay for API call
            } else {
                setTimeout( () => reject('No credit while have any money'), 200 ); // mockup delay for API call
            }
        }.bind(this));
    }

    /**
     * get current balance
     * @return {Promise<number>} - resolve will get current balance amount, if balance>0 - rejects
     */
    get(){
        return new Promise(function(resolve, reject){
            setTimeout( funds => resolve(funds), 200, this.funds ); // mockup delay for API call
        }.bind(this));
    }

}

export default MockupServerConnection;
