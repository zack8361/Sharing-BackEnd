// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

// 쿼리 실행문.
const registerUser = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM user WHERE USER_ID = '${req.body.id}';`,
      (err, data) => {
        if (err) throw err;
        if (data.length >= 1) {
          return res.status(400).json('이미 가입된 회원입니다.');
        }
        connection.query(
          `INSERT INTO user (USER_ID, PASSWORD) values ('${req.body.id}','${req.body.password}');`,
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

module.exports = { registerUser };
