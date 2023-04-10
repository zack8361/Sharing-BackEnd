// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

// 회원가입 쿼리
const registerUser = async (req, res) => {
  try {
    connection.query(
      `SELECT * FROM user WHERE USER_ID = '${req.body.id}';`,
      (err, data) => {
        if (err) throw err;
        if (data.length >= 1) {
          return res.status(400).json('이미 가입된 회원입니다.');
        }
        connection.query(
          `INSERT INTO user (USER_ID, PASSWORD, USER_NAME, PHONE_NUMBER,TYPE,TOKEN) values ('${req.body.id}','${req.body.password}','${req.body.phone}','${req.body.name}','0','1');`,
          (err, data) => {
            if (err) throw err;
            res.status(200).json('회원가입 성공');
          },
        );
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('회원가입 실 알 없는 문제 발생');
  }
};

// 로그인 쿼리
const loginUser = async (req, res) => {
  try {
    connection.query(
      `SELECT * FROM user WHERE USER_ID = '${req.body.id}';`,
      (err, data) => {
        if (err) throw err;
        if (data.length === 0) {
          return res.status(400).json('가입되지 않은 회원입니다!.');
        }
        if (data[0].PASSWORD !== req.body.password) {
          return res.status(400).json('비밀번호가 틀렸습니다!');
        }
        // 만약 위에 if 문에서 return 이 되지않았다면 로그인이 성공하였다는 말이니까 session 생성
        // req.session.login = true;
        // req.session.userId = req.body.id;
        // console.log(req.session);
        // const userSession = req.session.userId;
        res.status(200).json('로그인 성공하였습니다~');
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('로그인 실패 알수 없는 문제');
  }
};

// 카카오 로그인 쿼리
const kakaoLoginUser = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM mydb.user WHERE USERID = '${req.body.id}';`,
      (err, data) => {
        if (err) throw err;
        if (!data.length === 0) res.status(200).json('카카오 로그인 완료');
        console.log(req.body);
        connection.query(
          `INSERT INTO mydb.user (USER_ID, PASSWORD, USER_NAME, PHONE_NUMBER,TYPE,TOKEN) values ('${req.body.id}', '${req.body.password}', '${req.body.name}', '${req.body.phone}','0','1');`,
          (err, data) => {
            if (err) throw err;
            res.status(200).json('카카오 로그인 완료');
          },
        );
      },
    );
  } catch (err) {
    console.error(err);
    res.status(500).json('회원가입 실패, 알 수 없는 문제 발생');
  }
};

module.exports = { registerUser, loginUser, kakaoLoginUser };
