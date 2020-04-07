const fs = require('fs');

/*
//readFileSync
console.log('Processing readFileSync Function START');
let result = fs.readFileSync('syntex/sample.txt', 'utf8');
console.log(result);
console.log('Processing readFileSync Function END');
*/

console.log('Processing readFileSync Function START');
// 비동기 콜백 함수
let result = fs.readFile('syntex/sample.txt', 'utf8', (err, result) => {
    console.log(result);
});
console.log('Processing readFileSync Function END');