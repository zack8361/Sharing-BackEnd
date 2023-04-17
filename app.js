// node-modules 에 설치되어있는 기본 패키지 세팅
const express = require('express');
const cors = require('cors');

// 쿠키 설정
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// env 사용.
require('dotenv').config();

const app = express();
// env 파일에서 포트 가져오기.
const { PORT } = process.env;

// cors 적용하기.
app.use(cors());
// 뷰 엔진 적용하기.
app.set('view engine', 'ejs');
// 스태틱 폴더 설정하기.
app.use(express.static('public'));
// 사진 업로드 주소요청.
app.use('/uploads', express.static('uploads'));
app.use('/profile', express.static('profile'));
// body-parser 을 선언하는 이유 -> form 태그 내에 데이터를 이용하기 위해
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// cookie-parser 사용
app.use(cookieParser('jack'));
// session 사용
app.use(
  session({
    secret: 'jack',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 5300000,
      secure: true,
    },
  }),
);

// index.js 라우터 설정 -> index.js 는 뒷주소 생략가능.
const loginRouter = require('./routes/login');
const mainRouter = require('./routes/main');
const subMainRouter = require('./routes/subMain');
const writeRouter = require('./routes/write');
const logRouter = require('./routes/log');

app.use('/', loginRouter);
app.use('/main', mainRouter);
app.use('/subMain', subMainRouter);
app.use('/write', writeRouter);
app.use('/log', logRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status);
});

// 서버를 실행시키는 코드 -> 최 하단에 위치시킨다.
app.listen(PORT, () => {
  console.log(`서버는 ${PORT} 에서 실행 중입니다.`);
});
