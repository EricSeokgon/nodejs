//Express 기본 모듈 불러오기
var express = require('express')
    , http = require('http')
    , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
    , static = require('serve-static');

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({extended: false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 라우터 객체 참조
var router = express.Router();

// 상품정보 라우팅 함수 등록
router.route('/process/product').get(function (req, res) {
    console.log('/process/product 호출됨.');
    if (req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
});

// 라우터 객체를 app 객체에 등록
app.use('/', router);

//오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

//모든 router 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
    static: {
        '404': './ExpressExample/public/404.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//Express 서버 시작
http.createServer(app).listen(3000, function () {
    console.log('Express 서버가 3000번 포트에서 시작됨.');
});
