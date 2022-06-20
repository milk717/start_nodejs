const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert : fs.readFileSync('도메인 인증서 경로'),
    key: fs.readFileSync('도메인 비밀키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
},(req, res) =>{
    res.write('<h1>Hello<h1>');
    res.end('<p>Hello Server</p>');
}).listen(8080,()=>{
    console.log('8080번 포트에서 서버 대기중');
});