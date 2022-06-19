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

module.exports = template;      //template 객체를 외부에서 사용할 수 있도록함.