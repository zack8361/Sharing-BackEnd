// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

const showSubMain = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM OBJECT WHERE OBJECT_TYPE = '${req.parmas.OBJECT_TYPE}`,
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('불러오기 실패 이유몰라');
  }
};
module.exports = { showSubMain };
