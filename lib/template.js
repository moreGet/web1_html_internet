module.exports = {
    html:function (title, list, body, control) {
      return `
      <!doctype html>
      <html>
      <head>
        <title>WEB2 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB2</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `;
    },
    list:function (fileList) {
      let list = '<ul>';
      fileList.forEach(element => {
        list += `<li><a href="/?id=${element}">${element}</a></li>`;
      });
      list = list + '</ul>';
      return list;
    }
}
