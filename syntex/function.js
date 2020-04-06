// 함수 구현
function printNumber() {
    let i = 0;
    while (i<3) {
        console.log(i);
        i+=1;
    }
}

printNumber();

// 팩토리얼 구현
function factorial(params) {
    if (params == 1) {
        return 1;
    }   

    return params * factorial(params - 1);
}

console.log(factorial(5));

// 소수 올림 표현
console.log(Math.round(1.6)); // 2
console.log(Math.round(1.4)); // 1