// 배열
let members = ['신성현', '김예지', '아무개'];
members.forEach(value => {
    console.log(`Lambda forEach : ${value}`);
});

// 객체
let roles = {
    'programmer':'신성현',
    'designer':'김예지',
    'manager':'hoya'
};

// 객체를 for문으로 처리
for (const key in roles) {
    if (roles.hasOwnProperty(key)) {
        const element = roles[key];
        console.log(`객체 For IN : ${element}`);
    }
};