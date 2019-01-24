var fs = require('fs');

var infile = fs.createReadStream('./output.txt', {flags: 'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags: 'w'});

infile.on('data', function () {
    console.log('읽어 들인 데이터', data);
    outfile.weite(data);
});

infile.on('end', function () {
    console.log('파일 읽기 종료.');
    outfile.end(function () {
        console.log('파일 쓰기 종료.');
    });
});