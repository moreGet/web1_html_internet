const testFolder = './'; // 현재 디렉토리 반대로 /만 쓰면 현재 시스템의 루트 디렉토리
const fs = require('fs');

// 함수적 인터페이스
fs.readdir(testFolder, (err, fileList) => {
    console.log(fileList); // 현재 프로젝트 디렉토리 가 가지고 있는 목록을 조회
});
