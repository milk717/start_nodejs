var http = require('http');
var fs = require('fs')
var url = require('url');
var template = require('./lib/template');


var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = (url).parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;
    var list;

    fs.readdir('./data',function (error,filelist){
        list = template.list(filelist);
    });

    if(pathname==='/'){ //root
        if(title === undefined){    //home
            var html = template.HTML("Welcome",list,"Hello node.js!");
            response.writeHead(200);
            response.end(html);
        }else{
            fs.readFile(`data/${title}`,'utf-8',function (err, description){
                var html = template.HTML(title,list,description);
                response.writeHead(200);
                response.end(html);
            });
        }
    }else if(pathname === '/create'){
        fs.readdir

    }else{ //error
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);   //port number
