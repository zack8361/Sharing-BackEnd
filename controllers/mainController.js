// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

// main 쿼리
const showMain = (req, res) => {
  try {
    connection.query('SELECT * FROM OBJECT_MAP', (err, data) => {
      if (err) throw err;
      const ARTICLE = data;
      const articleCount = ARTICLE.length;

      res.render('main', { ARTICLE, articleCount, userId: req.session.userId });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('불러오기 실패 이유몰라');
  }
};

// 마이페이지 쿼리
const showMypage = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM user WHERE USER_ID = '${req.session.userId}'`,
      (err, data) => {
        if (err) throw err;
        console.log(data);
        const ARTICLE = data;
        const articleCount = ARTICLE.length;
        connection.query(
          `SELECT * FROM OBJECT O LEFT OUTER JOIN OBJECT_MAP M ON O.OBJECT_TYPE = M.OBJECT_TYPE AND RENT_USER_ID = '${req.session.userId}'`,
          (err2, data2) => {
            if (err) throw err2;
            const ARTICLE2 = data2;
            const articleCount2 = ARTICLE2.length;
            res.render('myPage', {
              ARTICLE,
              articleCount,
              ARTICLE2,
              articleCount2,
            });
          },
        );
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('불러오기 실패 이유는 몰라');
  }
};
module.exports = { showMain, showMypage };
