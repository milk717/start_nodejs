var http = require('http');
var fs = require('fs')
var url = require('url');

var template = {
    HTML : function(title, list, description){
        return `
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
    },
    list:function (filelist){
        var list = '<ul>';
        for(var i = 0; i<filelist.length; i++){
            list += `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }
        list += '</ul>';
        return list;
    }
}

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = (url).parse(_url,true).query;
    var pathname = url.parse(_url,true).pathname;
    var title = queryData.id;
    var list;

    fs.readdir('./data',function (error,filelist){
        list = template.list(filelist);
        console.log(list);  //List Value Exists
    });

    if(pathname==='/'){ //root
        if(title === undefined){    //home
            console.log(list);      //undefined
            var html = template.HTML("Welcome",list,"Hello node.js!");
            response.writeHead(200);
            response.end(html);
        }else{
            fs.readFile(`data/${title}`,'utf-8',function (err, description){
                console.log(list);  //List Value Exists
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
