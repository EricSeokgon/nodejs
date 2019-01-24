var fs = require('fs');

var data = fs.readFileSync('./NodeExample1/package.json', 'utf8');

console.log(data);
