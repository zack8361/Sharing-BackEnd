// mysql 연결된 dbConnect 불러오기.

const { request } = require('express');

const connection = require('./dbConnect');

// main 쿼리
const showMain = (req, res) => {
  try {
    connection.query('SELECT * FROM OBJECT_MAP', (err, data) => {
      if (err) throw err;
      const ARTICLE = data;
      const articleCount = ARTICLE.length;
      connection.query(
        `SELECT USER_NAME, PROFILE_IMG FROM USER WHERE USER_ID ='${req.params.id}'`,
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
  try {
    connection.query('SELECT * FROM NOTICE', (err, data) => {
      if (err) throw err;
      const LENGTH = data.length;

      connection.query(
        `INSERT INTO NOTICE (CODE,QUESTION,ANSWER) VALUES ('${LENGTH + 1}','${
          req.body.question
        }','${req.body.answer}');`,
        (err, data) => {
          if (err) throw err;
          // res.status(200).json('성공');
        },
      );
    });
    res.status(200).json('성공');
  } catch (error) {
    console.error(error);
    res.status(500).json('실패입니다.');
  }
};

// 공지사항 글 삭제하기 요청방식(post)
const deleteNotice = (req, res) => {
  try {
    connection.query(`DELETE FROM NOTICE WHERE CODE = '${req.params.code}'`),
      (err, data) => {
        if (err) throw err;
      },
      res.status(200).json('삭제 성공');
  } catch (error) {
    console.error(error);
  }
};

const postMyImg = (req, res) => {
  console.log('왓니? 정혁아~');
  console.log(req.file.filename);
  try {
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
    res.status(200).json('성공');
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};

// manager img 업로드
const managerImg = (req, res) => {
  const data = JSON.parse(req.body.data);
  console.log(data);
  // const code = JSON.parse(req.body.code);
  try {
    console.log(data);
    connection.query(
      `INSERT INTO OBJECT_MAP (OBJECT_TYPE, OBJECT_NAME, IMG_SRC) VALUES ('${data.productcode}', '${data.productname}', '${req.file.filename}')`,
      (err, data) => {
        if (err) throw err;
        res.status(200).json('성공');
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};

// manager rent 삭제
const deleteData = (req, res) => {
  // const data = JSON.parse(req.body.data);
  // console.log(data.productname)

  try {
    connection.query(
      `DELETE FROM OBJECT_MAP WHERE OBJECT_TYPE = '${req.params.type}'`,
      (err, data) => {
        if (err) throw err;
        console.log(data);
        res.status(200).json('성공');
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

  managerImg,
  deleteData,

  deleteNotice,
};
