// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

const showSubMain = (req, res) => {
  try {
    console.log(req.params.id);
    connection.query(
      `SELECT * FROM OBJECT WHERE OBJECT_TYPE = '${req.params.id}';`,
      (err, data) => {
        if (err) throw err;
        const ARTICLE = data;
        const articleCount = ARTICLE.length;
        res.status(200).json({ ARTICLE, articleCount }); // JSON 형태로 데이터 전송

        // res.render('subMain', { ARTICLE, articleCount });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('불러오기 실패 이유몰라');
    res.status(500).json('실패 ');
  }
};

const findRentObj = (req, res) => {
  // req.params.id = 0001

  try {
    connection.query(
      `SELECT * FROM OBJECT WHERE RENT_USER_ID = '${req.params.id}' AND OBJECT_TYPE = '${req.params.type}'`,
      (err, data) => {
        if (err) throw err;
        if (data.length >= 1) {
          res.status(200).json('이미 빌렸습니다.');
        } else {
          connection.query('``');
        }
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('불러오기 실패');
  }
};
// 중복 체크
module.exports = { showSubMain, findRentObj };
