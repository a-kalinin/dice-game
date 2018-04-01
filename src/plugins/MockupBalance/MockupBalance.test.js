import Balance from './MockupBalance';
import assert from 'assert';

describe('Balance', function(){
        it('Get funds with no money in account', () => {
            const balance = new Balance();
            const getCredit = function(){
                balance.getCredit()
                    .then(function( credit ){
                        assert.equal(credit,100);
                    })
                    .catch(function(error){
                        assert.equal(error, null);
                    });
            };

            balance.subtract(100).then(getCredit);
        });

        it('Get funds with some money in account', () => {
            const balance = new Balance();
            const getCredit = function(){
                balance.getCredit()
                    .then(function( credit ){
                        assert.equal(credit,0);
                    })
                    .catch(function(){
                        assert.equal(1,1);
                    });
            };

            balance.subtract(50).then(getCredit);
        });
});