console.log('A');
console.log('B');

let a = 4;
let b = 10;

// 짝수 인지 조건문
let c = a + b;
if (c % 2 == 0) {
    console.log(`c는 짝수 ${c}`);
}

// args 출력
let args = process.argv;
console.log(`args = ${args}`);
console.log(`args[0] = ${args[0]}`);
console.log(`args[1] = ${args[1]}`);