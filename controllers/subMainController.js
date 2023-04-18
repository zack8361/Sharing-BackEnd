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
  console.log('야너도?');
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
            `UPDATE OBJECT SET RENT_USER_ID = '${req.params.id}',STATUS = 1, START_DATE = '${dateString}', END_DATE = '${dateString2}', RENT_COUNT = 1 WHERE CODE ='${req.params.code}'`,
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

// 관리자가 각 물품 페이지에서 물품 추가하는 요청
const appendObject = (req, res) => {
  console.log('추가 백엔드', req.body);
  try {
    connection.query(
      `INSERT INTO OBJECT (CODE, OBJECT_TYPE, RENT_USER_ID, STATUS, START_DATE, END_DATE, NAME, OBJECT_IMG, RENT_COUNT)
      VALUES ('${req.body.inputObjectCode}', '${req.params.type}', NULL, ${req.body.inputObjectStatus}, NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH), '${req.body.inputObjectName}', NULL, 0)`,
      (err, data) => {
        if (err) throw err;
        res.status(200).json('성공');
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json('물품 못받아옴');
  }
};

// 관리자가 각 물품 페이지에서 물품 삭제하는 요청
const deleteObject = (req, res) => {
  try {
    connection.query(
      `DELETE FROM OBJECT WHERE CODE ='${req.params.code}'`,
      (err, data) => {
        if (err) throw err;
        res.status(200).json('삭제 성공');
      },
    );
  } catch (error) {
    console.log(error);
    console.log('응 삭제 안돼');
  }
};

const showSideBar = (req, res) => {
  try {
    connection.query('SELECT * FROM OBJECT_MAP', (err, data) => {
      if (err) throw err;
      const ARTICLE = data;
      res.status(200).json({ ARTICLE });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};

// 중복 체크
module.exports = {
  showSubMain,
  findRentObj,
  showSideBar,
  appendObject,
  deleteObject,
};
