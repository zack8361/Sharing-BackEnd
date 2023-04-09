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
        res.render('subMain', { ARTICLE, articleCount });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('불러오기 실패 이유몰라');
    res.status(500).json('실패 ');
  }
};
module.exports = { showSubMain };
