// 반복문 연습
let i = 1;
let result = 0;

while (i < 101) {
    result+=i;

    if (i == 100) {
        break;
    }

    i++;
}

console.log(`${i} 까지 더함 = ${result}`);

// 별 찍기
// 높이
let h = 5;

for (let i = 0; i < h; i++) {
    for (let j=h-1; j>i; j--) {
        // 줄 개행 없이 찍음
        process.stdout.write(' ');
    } 

    for (let j=0; j<2*i+1; j++) {
        process.stdout.write('*');
    }
    
    // 줄 개행
    console.log();
}

// 배열
let arr = ['A', 'B', 'C'];
// 람다(함수적 인터페이스) 를 이요한 forEach 문
arr.forEach(element => {
   process.stdout.write(`${element} `); 
});

// 배열 다 더하기
arr = [1, 2, 3, 4, 5];
result = 0; // 위에 선언한 result 재사용

// 람다
arr.forEach(element => {
    result += element; // 배열 요소를 result에 더함
});
console.log(result); // 15 출력