// import {assert} from "chai";

// import { calcScore } from "../source/bowling.js";

// // const assert = chai.assert;

// describe("Scoring Bowling", function(){
//     it("Miss all the balls -> 0", function(){
//         const rolls =Array(20).fill(0)    //have 20 strikes, each scoring a zero
//         const result = calcScore(rolls);
//         const expected=0;
//         assert.equal(result, expected);
//     });

//     // every roll he knocks a pin
//     it("All single balls -> 20", function(){
//         const rolls =Array(20).fill(1)     
//         const result = calcScore(rolls);
//         const expected= 20;
//         assert.equal(result, expected);
//     });
//     it("When player gets a spare, they get a bonus from the next throw", function(){
//         const rolls = [
//             5,5,    //spare
//             2,3,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//         ];
//         const result = calcScore(rolls);
//         const expected= 17;
//         assert.equal(result, expected);    //if result is equal to expected, it passes otherwise fails
//     });
//     it("Spare in the final frame counts bonus throw", function(){
//         const rolls = [
//             0,0,    //spare
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             7,3, 8,
//         ];
//         const result = calcScore(rolls);
//         const expected= 18;
//         assert.equal(result, expected);
//     });
//     it("When player gets a sprike, they get a bonus from the next throw", function(){
//         const rolls = [
//             10,    //Strike
//             2,3,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//         ];
//         const result = calcScore(rolls);
//         const expected= 20;
//         assert.equal(result, expected);
//     });

//     it("When player gets a sprike in the last frame, they get a bonus from the next throw", function(){
//         const rolls = [
//             0,0,    //Strike
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             0,0,
//             10,10,1,     //is given two more strikes, gets a 10 and 1 in each strike respectiviely
//         ];
//         const result = calcScore(rolls);
//         const expected= 21;
//         assert.equal(result, expected);
//     });

//     it("All strike balls -> 300", function(){
//         const rolls =Array(12).fill(10)  //have 12 strikes. Each you get a 10
//         const result = calcScore(rolls);
//         const expected=300;
//         assert.equal(result, expected);
//     });



// });




import { assert } from "chai";
import { calcScore } from "../source/bowling.js";

describe("Scoring Bowling", function(){
    it("Miss all the balls -> 0", function(){
        const rolls = Array(20).fill(0); 
        const result = calcScore(rolls);
        const expected = 0;
        assert.equal(result, expected);
    });

    it("All single balls -> 20", function(){
        const rolls = Array(20).fill(1); 
        const result = calcScore(rolls);
        const expected = 20;
        assert.equal(result, expected);
    });

    it("When player gets a spare, they get a bonus from the next throw", function(){
        const rolls = [
            5, 5, 
            2, 3, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0
        ];
        const result = calcScore(rolls);
        const expected = 17; // 10 for spare + next roll (2) + 2 + 3 = 17
        assert.equal(result, expected);
    });

    it("Spare in the final frame counts bonus throw", function(){
        const rolls = [
            0, 0,
            0,0,
            0, 0,
            0, 0,
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            7, 3, 8];
        const result = calcScore(rolls);
        const expected = 18; // Spare in final frame with bonus roll of 8
        assert.equal(result, expected);
    });

    it("Strike in the first frame gives bonus for next two rolls", function(){
        const rolls = [
            10, 
            2, 3, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0,
            0, 0];
        const result = calcScore(rolls);
        const expected = 20; // 10 + 2 + 3 + remaining rolls = 20
        assert.equal(result, expected);
    });

    it("Strike in the last frame gives two bonus rolls", function(){
        const rolls = [
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            0, 0, 
            10, 10, 1];   //gets addition 2 strikes   
        const result = calcScore(rolls);
        const expected = 21; // Strike in last frame with two bonus rolls: 10 + 10 + 1 = 21
        assert.equal(result, expected);
    });

    it("All strikes -> 300 (Perfect Game)", function(){
        const rolls = Array(12).fill(10); 
        const result = calcScore(rolls);
        const expected = 300; // Maximum score for a perfect game
        assert.equal(result, expected);
    });

    it("Random game with no strikes or spares", function(){
        const rolls = [
            1, 2, 
            3, 4, 
            5, 4, 
            3, 2, 
            1, 2, 
            4, 5, 
            6, 3, 
            2, 1, 
            0, 0, 
            7, 1
        ];
        const result = calcScore(rolls);
        const expected = 56; // Calculated frame-by-frame
        assert.equal(result, expected);
    });

    it("When player gets random sprikes and a spares", function(){
                const rolls = [
                    0,1,    //Strike
                    2,3,
                    0,0,
                    1, 1,
                    2,6,
                    0,0,
                    5,2,
                    3,0,
                    5,5,
                    6,0,
                ];
                const result = calcScore(rolls);
                const expected= 48;
                assert.equal(result, expected);
            });
});

