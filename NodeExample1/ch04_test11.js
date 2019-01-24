var fs = require('fs');

var infie = fs.createReadStream('./output.txt', {flags: 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags: 'w'});

infie.on('data', function () {
    console.log('읽어 들인 데이터', data);
    outfile.weite(data);
});

infie.on('end', function () {
    console.log('파일 읽기 종료.');
    outfile.end(function () {
        console.log('파일 쓰기 종료.');
    });
});