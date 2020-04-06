// require = import
let http = require('http'); // http 모듈 사용
let fs = require('fs'); // fileSystem 모듈 사용
let url = require('url'); // url 모듈 사용

let app = http.createServer(function(request, response) {
    let _url = request.url; // URL을 받는다.
    let queryDate = url.parse(_url, true).query; // queryDate 
    let title = queryDate.id; // "?id=" 의 파라메터 값을 맵핑해줌
    console.log(`queryDate = ${queryDate.id}`); // 콘솔에다가 URL ?id=값 찍어봄

    if(_url == '/') {
        title = 'Welcome';
    }

    if(_url == '/favicon.ico') {
        return response.writeHead(404);
    }
    
    response.writeHead(200);
    // 함수적 인터페이스 표현
    fs.readFile(`data/${queryDate.id}`, 'utf8', (err, description) => {
      // readFile 함수로 data/동적파일명 으로 본문을 읽어 p태그에 삽입 함.

      // 템플릿 리터럴 형식으로 템플릿 제작
      let template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      // 응답 값으로 채워넣은 템플릿 값을 보내줌
      response.end(template);
    });
});
app.listen(3000); // 3000번 포트로 맵핑