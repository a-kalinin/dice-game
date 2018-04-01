class MockupServerConnection {

    constructor(){
        this.funds = this.funds || 0;
    }

    get funds(){
        return Number(localStorage.funds);
    }

    set funds(funds){
        localStorage.funds = Math.round(funds*100)/100;
    }

    subtract( amount ){
        return new Promise(function(resolve, reject){
            if(this.funds >= amount){
                this.funds -= amount;
                setTimeout( funds => resolve(funds), 100, this.funds ); // mockup delay for API call
            } else {
                setTimeout( () => reject('Not enough funds'), 100 ); // mockup delay for API call
            }
        }.bind(this));
    }

    add(amount){
        return new Promise(function(resolve, reject){
            this.funds += amount;
            setTimeout( funds => resolve(funds), 200, this.funds ); // mockup delay for API call
        }.bind(this));
    }

    getCredit(){
        return new Promise(function(resolve, reject){
            const credit = 100;
            if(this.funds === 0){
                this.funds += credit;
                setTimeout( funds => resolve(funds), 200, this.funds ); // mockup delay for API call
            } else {
                setTimeout( () => reject('No credit while have any money'), 200 ); // mockup delay for API call
            }
        }.bind(this));
    }

    get(){
        return new Promise(function(resolve, reject){
            setTimeout( funds => resolve(funds), 200, this.funds ); // mockup delay for API call
        }.bind(this));
    }

}

export default MockupServerConnection;
