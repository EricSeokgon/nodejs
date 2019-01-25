var http = require('http');

var opts = {
    host: 'www.google.com',
    port: 80,
    method: 'POST',
    path: '/',
    headers: {}
};

var resData = '';
var req = http.request(opts, function (res) {

    res.on('data', function (chunk) {
        resData += chunk;
    });

    res.on('end', function () {
        console.log(resData);
    });
});

req.on('error', function (err) {
    console.log('오류 발생 : ' + err.measure);
});

req.write(req.data);
req.end();