var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');

var logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [
        new (winston.transports.Console)({
            colorize: true
        }),
        new (winstonDaily)({
            filename: './log/server_%DATE%.log',
            maxSize: '10m',
            datePattern: 'YYYY-MM-DD'
        })
    ]
});

var fs = require('fs');

var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function (exists) {
    if (exists) {
        fs.unlink(outname, function (err) {
            if (err) throw err;
            logger.info('기존 파일 [' + outname + '] 삭제함.');

        });
    }
    var infile = fs.createReadStream(inname, {flags: 'r'});
    var outfile = fs.createWriteStream(outname, {flags: 'w'});

    infile.pipe(outfile);
    logger.info('파일 복사 [' + inname + '] -> [' + outname + ']');
});

