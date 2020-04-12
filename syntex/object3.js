// 이렇게 변수들이 1억개가 존재 한다면..?
// let v1 = 'v1';
// 중간에 변수를 바꿔 버리면 끔찍한 결과로 이어진다..
// v1 = 'egoing';
// let v2 = 'v2';

// 객체로 정리 정돈 하여 변수를 삽입 시킨다면.
// 불상사를 막을 수 있다.
// let o = {
//     v1:'v1',
//     v2:'v2',
// }

// function f1() {
//     console.log(o.v1);
// }
// // 중간에 f1 함수를 재정의 해버린다면
// // 이전 f1함수가 쓸모가 없어지는 상황이 발생된다.
// function f2() {
//     console.log(o.v2);
// }
// f1();
// f2();

// 아래 방법으로 방지가 가능하다.
// o라는 변수 안에 서로 관련이 있는 변수화 함수가 같이 존재 하기때문에
// 정리 되었다고 할 수 있다.
let o = {
    v1:'v1',
    v2:'v2',
    f1:function() {
        console.log(this.v1);
    },
    f2:function() {
        console.log(this.v2);
    }
}

o.f1(); // 객체 속 함수 호출
o.f2();

// 객체는 코드의 복잡성을 낮출수 있는 하나의 방법 이라고 생각 할 수도 있다.