// if와 for문 같은 함수는 값이 될 수 없다.
// let i = if(true) {console.log(1)}

// 함수는 값이 될 수 있다.
let f = function() {
    console.log(1+2);
}
f(); // 출력이 된다.

// 함수를 배열에 담을 수 도 있다.
let array = [f];
array[0](); // 함수 배열 출력

let o = {
    func:f // 함수 f를 지칭한다.
}
o.func(); // o를 출력한다.