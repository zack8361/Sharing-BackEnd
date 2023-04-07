// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

// 쿼리 실행문.

const loginDB = {
  login: (reqBody, cb) => {
    connection.query(
      `select * from user where USER_ID = '${reqBody.id}' and PASSWORD = '${reqBody.password}'`,
      (err, data) => {
        if (err) {
          throw err;
        }
        cb(data);
      },
    );
  },
  IMG: (cb) => {
    connection.query(
      `select * from OBJECT_MAP WHERE OBJECT_TYPE = '${'0001'}'`,
      (err, data) => {
        if (err) {
          throw err;
        }
        console.log(data, '!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        cb(data);
      },
    );
  },
};

module.exports = loginDB;
