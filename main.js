var http = require('http');
var fs = require('fs')
var url = require('url');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = (url).parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;
    if(pathname==='/'){
        fs.readFile(`data/${queryData.id}`,'utf-8',function(err,description){
            console.log(description);
            var template = `
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
        `
            response.writeHead(200);
            response.end(template);
        });
    }else{
        response.writeHead(404);
        response.end('Not found');
    }
    // if(_url=='/'){
    //     title='Welcome';
    // }
    // if(_url=='favicon.ico'){
    //     response.writeHead(404);
    //     response.end();
    //     return;
    // }

    //console.log(__dirname+_url); //경로
    //response.end => 웹 서버가 브라우저의 요청에 응답하는 명령
    //fs.readFileSync => 경로를 읽어서 응답함
    // response.end(fs.readFileSync(__dirname+_url));
    // response.end(queryData.id);

});
app.listen(3000);
