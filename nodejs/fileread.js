let fs = require('fs'); // nodeJs 의 fs 모듈을 사용 한다.(Java Import 와 같음)

// Lambda Interface
fs.readFile('sample.txt', 'utf-8',(err, data) =>{ // 매개 변수가 둘인 함수적 인터페이스
    if (err) throw err; // err가 존재 한다면 Exception
    console.log(data); // 아니면 data 로그에 출력
});