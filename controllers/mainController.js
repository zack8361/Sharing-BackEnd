// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

// main 쿼리
const showMain = (req, res) => {
  try {
    connection.query('SELECT * FROM OBJECT_MAP', (err, data) => {
      if (err) throw err;
      const ARTICLE = data;
      const articleCount = ARTICLE.length;
      connection.query(
        `SELECT USER_NAME FROM USER WHERE USER_ID ='${req.params.id}'`,
        (err2, data2) => {
          if (err2) throw err2;
          const NAME = data2[0];
          connection.query(
            `SELECT END_DATE FROM OBJECT WHERE RENT_USER_ID = '${req.params.id}'`,
            (err3, data3) => {
              if (err3) throw err3;
              const DATE = data3;
              res.status(200).json({
                ARTICLE,
                articleCount,
                NAME,
                DATE,
              });
            },
          );
        },
      );
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
      `SELECT * FROM user WHERE USER_ID = '${req.params.id}'`,
      (err, data) => {
        if (err) throw err;

        const ARTICLE = data;
        const articleCount = ARTICLE.length;
        connection.query(
          // `SELECT * FROM OBJECT O LEFT OUTER JOIN
          // OBJECT_MAP M ON O.OBJECT_TYPE = M.OBJECT_TYPE AND RENT_USER_ID = '${req.params.id}'`,
          `SELECT * FROM OBJECT WHERE RENT_USER_ID = '${req.params.id}'`,
          (err2, data2) => {
            if (err2) throw err2;
            const ARTICLE2 = data2;
            const articleCount2 = ARTICLE2.length;
            res.status(200).json({
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

// 공지사항 띄우기 요청 방식 = get
const showNotice = (req, res) => {
  try {
    connection.query('SELECT * FROM NOTICE', (err, data) => {
      if (err) throw err;
      const ARTICLE = data;
      res.status(200).json({ ARTICLE });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('실패 입니다');
  }
};

// 공지사항 글 추가하기 요청방식 = post
const writeNotice = (req, res) => {
  console.log('오긴했니?');
  console.log(req.body.question, '질문');
  console.log(req.body.answer, '대답');
  try {
    connection.query('SELECT * FROM NOTICE', (err, data) => {
      if (err) throw err;
      const LENGTH = data.length;
      console.log(LENGTH);
      connection.query(
        `INSERT INTO NOTICE (CODE,QUESTION,ANSWER) VALUES ('${LENGTH + 1}','${
          req.body.question
        }','${req.body.answer}');`,
      );
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('실패입니다.');
  }
};

const postMyImg = (req, res) => {
  // console.log(req.file.filename);
  // console.log(req.params.id);
  console.log('왓니? 정혁아~');
  try {
    console.log(req.file);
    connection.query(
      `UPDATE USER SET PROFILE_IMG = '${req.file.filename}' WHERE USER_ID = '${req.params.id}'`,
      (err3, data3) => {
        if (err3) throw err3;
        const ARTICLE3 = data3;
        const articleCount3 = ARTICLE3.length;
        res.status(200).json({
          ARTICLE3,
          articleCount3,
        });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('다시해');
  }
};

const commonImg = (req, res) => {
  try {
    connection.query(
      `UPDATE USER SET PROFILE_IMG = '' WHERE USER_ID = '${req.params.id}'`,
      (err, data) => {
        if (err) throw err;
        console.log(data);
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};
module.exports = {
  showMain,
  showMypage,
  showNotice,
  writeNotice,
  postMyImg,
  commonImg,
};
