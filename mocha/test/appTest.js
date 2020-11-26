const assert = require('chai').assert;
const ex1 = require('../app.js').exersice1;
const ex2 = require('../app.js').exersice2;
const ex3 = require('../app.js').exersice3;

describe('App',function(){
    it('Sort a given string containing its position', function(){
        const txt = "4of Fo1r pe6ople g3ood th5e the2";
        const expected = "Fo1r the2 g3ood 4of th5e pe6ople "
        assert.equal(ex1(txt),expected);
    })
    it('Compute the sum of each individual index value from the given arrays.', function(){
        const array1 = [1, 0, 2, 3, 4];
        const array2 = [3, 5, 6, 7, 8, 13];
        const expected = [ 4, 5, 8, 10, 12, 13 ]
        assert.deepEqual(ex2(array1,array2),expected);
    })
    it('Compute the sum of each individual index value from the given arrays.', function(){
        const array1 = ["arp", "live", "strong"];
        const array2 =  ["lively", "alive", "harp", "sharp", "armstrong"]
        const expected = ["arp", "live", "strong"]
        assert.deepEqual(ex3(array1,array2),expected);
    })
})