// require = import
let http = require('http'); // http 모듈 사용
let fs = require('fs'); // fileSystem 모듈 사용
let url = require('url'); // url 모듈 사용

let app = http.createServer(function(request, response) {
    let _url = request.url; // URL을 받는다.
    let queryDate = url.parse(_url, true).query; // queryDate 
    let pathName = url.parse(_url, true).pathname;

    if (pathName === '/') { // 접속 위치가 root 주소라면 아래 로직 수행
      if (queryDate.id === undefined) { // 값이 없다면
        fs.readdir('./data', (err, fileList) => {
          let title = 'Welcome';
          description = 'Hello, Node.js';  // 아무 것도 없을 때 메세지 출력  
          
          // ==============================================
          // 템플릿 리터럴 형식으로 템플릿 제작
          
          // <ul>
          //   <li><a href="/?id=HTML">HTML</a></li>
          //   <li><a href="/?id=CSS">CSS</a></li>
          //   <li><a href="/?id=JavaScript">JavaScript</a></li>
          // </ul>
          // 위 UL 문과 같은 효과
          let list = '<ul>';
          fileList.forEach(element => {
            list += `<li><a href="/?id=${element}">${element}</a></li>`;
          });
          list = list + '</ul>';
          // ==============================================

          let template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
        // 응답 값으로 채워넣은 템플릿 값을 보내줌
        response.writeHead(200); // HTTP OK 응답
        response.end(template);
        });
      } else { // 루트 패스로 접근 하지 않았을때
        fs.readdir('./data', (err, fileList) => { // 람다 로 파일 List 읽어옴
          let title = 'Welcome'; // title 출력      
          
          // ==============================================
          // 반복문 으로 Page를 동적으로 불러옴
          let list = '<ul>';
          fileList.forEach(element => {
            list += `<li><a href="/?id=${element}">${element}</a></li>`;
          });
          list = list + '</ul>';
          // ==============================================

          fs.readFile(`data/${queryDate.id}`, 'utf8', (err, description) => {
            let template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            // 응답 값으로 채워넣은 템플릿 값을 보내줌
            response.writeHead(200); // HTTP OK 응답
            response.end(template);
          });
        });
      }
    } else { // 만약 잘못된 경로로 접속 할 경우 404 에 Not Found
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000); // 3000번 포트로 맵핑