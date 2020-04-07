/*
function a() {
    console.log('A');
} a();
*/

// 위와 아래 익명객체는 같다.
let a = function () {
    console.log('A');
} 

// callback 함수 사용 법 이다.
function slowfunc(callback) {
    callback();
}

slowfunc(a); // 매개변수로 a를 제공 한다면 실행 된다.

// PM2를 설치하면 편해진다.
// https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
// Spring의 devTools 처럼 자동으로 리로드 시켜주는 명령어가 존재한다.

// pm2 start main.js --watch 를 실행하면 자동으로 시켜준다.

// debug를 위한 log 창은 pm2 log 명령어를 실행 시키면 된다.