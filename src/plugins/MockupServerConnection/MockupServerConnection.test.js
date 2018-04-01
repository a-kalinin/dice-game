import API from './MockupServerConnection';
import assert from 'assert';

describe('API', function(){
    describe('Calculate chances properly', function() {
        it('Bet 50 Hi Chance of Winning: 50% Payout: 2x', () => {
            const result = (new API()).getChance(50, 'hi');
            assert.equal(result.hi.chance, 50);
            assert.equal(result.hi.payout, 2);
        });

        it('Bet 1 Lo Chance of Winning 1% Payout: 100x', () => {
            const result = (new API()).getChance(1, 'lo');
            assert.equal(result.lo.chance, 1);
            assert.equal(result.lo.payout, 100);
        });

        // in the real this logic is wrong. "Hi" equal ">=" and as minimal value is 1,
        // user can make unlimited bets "1 Hi" and always win 1.01x of his bet
        it('Bet 1 Hi Chance of Winning 99% Payout: 1.01x', () => {
            const result = (new API()).getChance(1, 'hi');
            assert.equal(result.hi.chance, 99);
            assert.equal(result.hi.payout, 1.01);
        });


        it('Bet 10 Hi Chance of Winning 90% Payout: 1.11x', () => {
            const result = new API().getChance(10, 'hi');
            assert.equal(result.hi.chance, 90);
            assert.equal(result.hi.payout, 1.11);
        });

        it('Bet 10 Lo Chance of Winning 10% Payout: 10x', () => {
            const result = (new API()).getChance(10, 'lo');
            assert.equal(result.lo.chance, 10);
            assert.equal(result.lo.payout, 10);
        });
    });
});