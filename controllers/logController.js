// mysql 연결된 dbConnect 불러오기.
const connection = require('./dbConnect');

const showLog = (req, res) => {
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


const showLog2 = (req, res) => {
  try {
    connection.query(
      `SELECT * FROM OBJECT WHERE OBJECT_TYPE = '${req.params.type}' AND RENT_COUNT = 1`,
      (err, data) => {
        if (err) throw err;
        const ARTICLE = data;
        res.status(200).json({ ARTICLE });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};

module.exports = { showLog, showLog2 };

