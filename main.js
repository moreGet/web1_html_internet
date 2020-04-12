// require = import
const http = require('http'); // http 모듈 사용
const fs = require('fs'); // fileSystem 모듈 사용
const url = require('url'); // url 모듈 사용
const qs = require('querystring');
const template = require('./lib/template.js')
// 경로 보안
const path = require('path');
// npm init 으로 package.json 생성
// npm install -S sanitize-html 설치
// XSS 보안
const sanitizeHtml = require('sanitize-html');

let app = http.createServer(function(request, response) {
    let _url = request.url; // URL을 받는다.
    let queryDate = url.parse(_url, true).query; // queryDate 
    let pathName = url.parse(_url, true).pathname;

    if (pathName === '/') { // 접속 위치가 root 주소라면 아래 로직 수행
      if (queryDate.id === undefined) { // 값이 없다면
        fs.readdir('./data', (err, fileList) => {
          let title = 'Welcome';
          description = 'Hello, Node.js Yeah!';  // 아무 것도 없을 때 메세지 출력  

          let list = template.list(fileList);
          let html = template.html(title, list, // title, list
            `<h2>${title}</h2> ${description}`, // body
            `<a href = "/create">create</a>`); // control
        // 응답 값으로 채워넣은 템플릿 값을 보내줌
        response.writeHead(200); // HTTP OK 응답
        response.end(html);
        });
      } else { // 루트 패스로 접근 하지 않았을때
        fs.readdir('./data', (err, fileList) => { // 람다 로 파일 List 읽어옴
          let filteredId = path.parse(queryDate.id).base; // 경로 보안
          fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => { 
            let title = queryDate.id; 
            // XSS 보안 시작
            let sanitizeTitle = sanitizeHtml(title);
            let sanitizeDesc = sanitizeHtml(description);
            // XSS 보안 로직 끝
            let list = template.list(fileList);
            let html = template.html(sanitizeTitle, list, 
              `<h2>${sanitizeTitle}</h2> ${sanitizeDesc}`,
              `<a href = "/create">create</a> 
               <a href = "/update?id=${sanitizeTitle}">update</a>
               <form action="delete_process" method="post">
                <input type = "hidden" name="id" value="${sanitizeTitle}">
                <input type = "submit" value="delete">
               </form>`);
            // 응답 값으로 채워넣은 템플릿 값을 보내줌
            response.writeHead(200); // HTTP OK 응답
            response.end(html);
          });
        });
      }
    } else if (pathName === '/create') {
      fs.readdir('./data', (err, fileList) => {
        let title = 'WEB - create';
        let list = template.list(fileList);
        let html = template.html(title, list, `
        <!-- 서버로 부터 정보를 가져올 때는 method를 GET 중요한 CRUD 는 POST 방식으로 해야한다. -->
        <form action="/create_process", method="POST">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
                <textarea name="desc" placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
        `, ''); // 뒤에 '' 문자는 매개변수 값에 들어가는 혹시 모를 값을 초기화 해줌
      // 응답 값으로 채워넣은 템플릿 값을 보내줌
      response.writeHead(200); // HTTP OK 응답
      response.end(html);
      });
    } else if (pathName === '/create_process') {
      let body = '';
      // request에서 값 빼내오기
      request.on('data', (data) => {
        body += data; // request 데이터를 추가함

        // 만약 너무 많은 데이터가 들어 온다면 접속 끊어버림
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });

      // 더이상 데이터가 전송되지 않는다면
      request.on('end', () => {
        // post변수에 지금까지 저장한 body의 데이터를 parse함수로 받는다.
        let post = qs.parse(body);
        // 폼 데이터의 id 값을 추출.
        // id는 크롬 디버깅 툴의 network탭에서 볼 수 있음.
        let title = post.title;
        let desc = post.desc;

        // POST로 받은 파일을 data 디렉토리에 저장하기
        fs.writeFile(`data/${title}`, desc, 'utf8', (err) => {
          if (err) { // 만약 문제가 생기면 err throw
            throw err;
          }

          response.writeHead(302, {Location: `/?id=${title}`}); // 302는 페이지 이동 코드
          response.end();
        });
      });
    } else if (pathName === '/update') {
      fs.readdir('./data', (err, fileList) => { // 람다 로 파일 List 읽어옴
        let filteredId = path.parse(queryDate.id).base; // 경로 보안
        fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => { 
          let title = queryDate.id; 
          let list = template.list(fileList);
          let html = template.html(title, list, 
            `
            <form action="/update_process", method="POST">
              <input type="hidden" name="id" value="${title}">
              <p><input type="text" name="title" placeholder="title" value="${title}"></p>
              <p>
                  <textarea name="desc" placeholder="description" value="${description}"></textarea>
              </p>
              <p>
                  <input type="submit">
              </p>
            </form>
            `,
            `<a href = "/create">create</a> 
             <a href = "/update?id=${title}">update</a>`);
          // 응답 값으로 채워넣은 템플릿 값을 보내줌
          response.writeHead(200); // HTTP OK 응답
          response.end(html);
        });
      });
    } else if (pathName === '/update_process') { // 업데이트 기능
      let body = '';
      // request에서 값 빼내오기
      request.on('data', (data) => {
        body += data; // request 데이터를 추가함

        // 만약 너무 많은 데이터가 들어 온다면 접속 끊어버림
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });

      // 더이상 데이터가 전송되지 않는다면
      request.on('end', () => {
        // post변수에 지금까지 저장한 body의 데이터를 parse함수로 받는다.
        let post = qs.parse(body);
        // 폼 데이터의 id 값을 추출.
        // id는 크롬 디버깅 툴의 network탭에서 볼 수 있음.
        let id = post.id;
        let title = post.title;
        let desc = post.desc;

        fs.rename(`data/${id}`, `data/${title}`, (err) => {
          if (err) {
            throw err;
          }

          fs.writeFile(`data/${title}`, desc, 'utf8', (err) => {
            if (err) { // 만약 문제가 생기면 err throw
              throw err;
            }
  
            response.writeHead(302, {Location: `/?id=${title}`}); // 302는 페이지 이동 코드
            response.end();
          });
        });
      });
    } else if (pathName === '/delete_process') { // 삭제 기능 구현
      let body = '';
      // request에서 값 빼내오기
      request.on('data', (data) => {
        body += data; // request 데이터를 추가함

        // 만약 너무 많은 데이터가 들어 온다면 접속 끊어버림
        if (body.length > 1e6) {
          request.connection.destroy();
        }
      });

      // 더이상 데이터가 전송되지 않는다면
      request.on('end', () => {
        // post변수에 지금까지 저장한 body의 데이터를 parse함수로 받는다.
        let post = qs.parse(body);
        // 폼 데이터의 id 값을 추출.
        // id는 크롬 디버깅 툴의 network탭에서 볼 수 있음.
        let id = post.id;
        //파일 삭제 로직
        let filteredId = path.parse(id).base; // 경로 보안
        fs.unlink(`data/${filteredId}`, (error) => {
          // 382 는 웹 root 페이지
          response.writeHead(302, {Location: `/`});
          response.end();
        });
      });
    } else { // 만약 잘못된 경로로 접속 할 경우 404 에 Not Found
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000); // 3000번 포트로 맵핑
