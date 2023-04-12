// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

const showSubMain = (req, res) => {
  try {
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
  try {
    connection.query(
      `SELECT * FROM OBJECT WHERE RENT_USER_ID = '${req.params.id}' AND OBJECT_TYPE = '${req.params.type}'`,
      (err, data) => {
        if (err) throw err;
        if (data.length >= 1) {
          res.status(200).json('중복 대여가 불가능한 상품입니다.');
        } else {
          const today = new Date();
          const year = today.getFullYear();
          const month = `0${today.getMonth() + 1}`.slice(-2);
          const month2 = `0${today.getMonth() + 2}`.slice(-2);
          const day = `0${today.getDate()}`.slice(-2);
          const dateString = `${year}-${month}-${day}`;
          const dateString2 = `${year}-${month2}-${day}`;
          connection.query(
            `UPDATE OBJECT SET RENT_USER_ID = '${req.params.id}',STATUS = 1, START_DATE = '${dateString}', END_DATE = '${dateString2}'WHERE CODE ='${req.params.code}'`,
            (err2, data2) => {
              if (err2) throw err2;
              res.status(200).json('대여가 완료되었습니다.');
            },
          );
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
