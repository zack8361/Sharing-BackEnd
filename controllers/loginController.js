const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const axios = require('axios');

const {
  DB_MODE,
  MYSQL_DB,
  MYSQL_TABLE,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;
// mysql 연결된 dbConnect 불러오기.
if (DB_MODE === 'mysql') {
  const connection = require('./dbConnect');
  console.log(DB_MODE, '모드로 실행 중입니다!');

  // 사용자 ID 를 받아서 JWT AccessToken 을 생성해 주는 함수
  const issueToken = async (user_ID) => {
    return jwt.sign(
      { user_ID: user_ID }, // 유저 정보를 암호화하여 토큰 발행
      JWT_ACCESS_SECRET, // 해당 JWT를 쉽게 풀 수 없도록, 암호키 삽입
      { expiresIn: '1d' }, // 해당 토큰 만료기간 설정, 하루 동안 토큰을 인증할 수 있습니다
      // 기간을 적게 하고 싶으면 ms 단위로 정하면 됩니다 (1000 * 60 -> 1분, 1000 * 60 * 60 -> 60분)
    );
  };



  // 로그인 쿼리
  const loginUser = async (req, res) => {
    try {
      connection.query(
        `SELECT * FROM ${MYSQL_DB}.${MYSQL_TABLE} WHERE USER_ID = '${req.body.id}';`,
        async (err, data) => {
          if (err) throw err;
          if (data.length === 0)
            return res.status(400).json('가입되지 않은 회원입니다!.');

          // bcrypt 모듈을 사용하여 암호화 된 비밀번호와 입력한 비밀번호가 동일한지 비교
          // const isSamePassword = bcrypt.compareSync(
          //   req.body.password,
          //   data[0].PASSWORD,
          // );
          const isSamePassword = req.body.password === data[0].PASSWORD;
          // 비번이 동일하면 로그인이 성공 하였으므로, 토큰을 발행 합니다!
          if (isSamePassword) {
            console.log('data[0]', data[0]);
            // jwt 모듈을 사용하여 accessToken 발행
            const accessToken = await issueToken(data[0].USER_ID);

            // 생성 된 토큰을 프론트로 전달!
            // 프론트에서는 로컬 스토리지에 저장 할 것이므로, 쿠키에 담지 않고 데이터로 전송
            // 리액트 Login.jsx 에 가면 처리 코드가 있습니다!
            res
              .status(200)
              .json({ token: accessToken, message: '로그인 성공입니다' });
            console.log('안녕안녕안녕', accessToken);
          }
        },
      );
    } catch (error) {
      console.error(error);
      res.status(500).json('로그인 실패 알수 없는 문제');
    }
  };

  // 카카오 로그인 쿼리
  const kakaoLoginUser = async (req, res) => {
    const accessToken = await issueToken(req.body.id);
    try {
      connection.query(
        `SELECT * FROM user WHERE USER_ID = '${req.body.id}';`,
        (err, data) => {
          if (err) throw err;
          console.log(data);
          if (data.length !== 0)
            return res.status(200).json({
              token: accessToken,
              user_ID: req.body.id,
              message: '로그인 성공',
            });

          connection.query(
            `INSERT INTO user (USER_ID, PASSWORD, USER_NAME, PHONE_NUMBER, TYPE, TOKEN) values ('${req.body.id}','${req.body.password}','${req.body.name}','${req.body.phone}','0','0');`,
            (err, data) => {
              if (err) throw err;
              res.status(200).json({
                token: accessToken,
                user_ID: req.body.id,
                message: '로그인 성공',
              });
            },
          );
        },
      );
    } catch (err) {
      console.error(err);
      res.status(500).json('회원가입 실패, 알 수 없는 문제 발생');
    }
  };

  module.exports = {
    registerUser,
    loginUser,
    kakaoLoginUser,
    verifyToken,
  };
} else {
  console.log(DB_MODE, '모드로 실행 중입니다!');
}
