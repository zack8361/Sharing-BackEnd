const connection = require('./dbConnect');

const showConfirm = (req, res) => {
  try {
    // 여기서 받아온값 = type
    console.log(req.params.type);
    connection.query(
      `SELECT * FROM USER AS U
      JOIN OBJECT AS O
      ON U.USER_ID = O.RENT_USER_ID
      WHERE STATUS = 1 AND OBJECT_TYPE = '${req.params.type}'`,
      (err, data) => {
        if (err) throw err;
        const ARTICLE = data;
        connection.query(
          `SELECT * FROM USER AS U
          JOIN OBJECT AS O
          ON U.USER_ID = O.RENT_USER_ID
          WHERE STATUS = 2 AND OBJECT_TYPE = '${req.params.type}'`,
          (err2, data2) => {
            if (err2) throw err2;
            const ARTICLE2 = data2;
            res.status(200).json({ ARTICLE, ARTICLE2 });
          },
        );
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};

const showAccept = (req, res) => {
  console.log(req.params.code);
  try {
    connection.query(
      `UPDATE OBJECT SET STATUS = 2 WHERE CODE = '${req.params.code}'`,
      (err, data) => {
        if (err) throw err;
      },
    );
    res.status(200).json('승인 성공');
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};

const showAcceptReturn = (req, res) => {
  console.log(req.params.code);
  try {
    connection.query(
      `UPDATE OBJECT SET STATUS = 0 WHERE CODE = '${req.params.code}'`,
      (err, data) => {
        if (err) throw err;
      },
    );
    res.status(200).json('반납 성공');
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};
module.exports = { showConfirm, showAccept, showAcceptReturn };
