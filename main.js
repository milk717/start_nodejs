var http = require('http');
var fs = require('fs')
var url = require('url');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = (url).parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;
    if(pathname==='/'){ //루트일때
        if(title === undefined){    //홈일때
            fs.readdir('./data',function (error,filelist){
                var list = '<ul>';
                for(var i = 0; i<filelist.length; i++){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                }
                list += '</ul>';
                console.log(list);
                var template = `
                <!doctype html>
                    <html>
                    <head>
                      <title>WEB1 - Welcome</title>
                      <meta charset="utf-8">
                    </head>
                    <body>
                      <h1><a href="/">WEB</a></h1>
                      ${list}
                      
                      <h2>Welcome</h2>
                      <p>hello node.js</p>
                    </body>
                    </html>
                 `
                response.writeHead(200);
                response.end(template);
            })
        }else{
            fs.readdir('./data',function (error,filelist){
                var list = '<ul>';
                for(var i = 0; i<filelist.length; i++){
                    list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
                }
                list += '</ul>';
                fs.readFile(`data/${title}`,'utf-8',function (err, description){
                    var template = `
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
                  `
                    response.writeHead(200);
                    response.end(template);
                });

            });
        }
    }else{ //에러날때
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
