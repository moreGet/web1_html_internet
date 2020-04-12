// 모듈 의 사용법
var M = {
    v:'V',
    f:function() {
        console.log(this.v);
    }
}

// M의 함수를 다른 스크립트 내에서 사용 가능하게 함.
module.exports = M;