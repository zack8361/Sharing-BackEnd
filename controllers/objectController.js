const connection = require('./dbConnect');

const objectDB = {
  // 모든 물품 보여주기
  getAllObjects: (cb) => {
    connection.query('SELECT * FROM sharing.object_map;', (err, data) => {
      if (err) throw err;
      cb(data);
    });
  },
  // 물품 추가 (관리자 페이지에서 사용)
  // newObject에는 req.body 값들이 객체로 담겨 있음
  addObject: (newObject, cb) => {
    connection.query(
      `INSERT INTO object_map (OBJECT_TYPE, OBJECT_NAME, IMG_SRC) values ('${newObject.objectType}','${newObject.objectName}','${newObject.imgSrc}');`,
      (err, data) => {
        if (err) throw err;
        cb(data);
      },
    );
  },
};

module.exports = objectDB;
