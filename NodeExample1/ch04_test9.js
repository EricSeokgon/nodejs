var fs = require('fs');

fs.open('./output.txt', 'w', function (err, fd) {
    if (err) throw err;

    var buf = new Buffer(10);
    console.log('버퍼 차입 : %s', Buffer.isBuffer(buf));

    fs.read(fd, buf, 0, buf.length, null, function (err, byteRead, buffer) {
        if (err) throw err;

        var inStr = buffer.toString('utf8', 0, byteRead);
        console.log('파일에서 읽은 데이터 : %s', inStr);

        console.log(err, byteRead, buffer);

        fs.close(fd, function () {
            console.log('ouput.txt 파일을 열고 읽기 완료.');
        });
    });
});