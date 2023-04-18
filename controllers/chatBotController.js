const connection = require('./dbConnect');

// chatBot 에 이름 띄워주기 요청방식 = get

const showName = (req, res) => {
  console.log('챗봇왔니?');
  try {
    connection.query(
      `SELECT USER_NAME FROM USER WHERE USER_ID = '${req.params.id}'`,
      (err, data) => {
        if (err) throw err;
        console.log(data[0].USER_NAME);
        res.status(200).json(data[0].USER_NAME);
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).json('실패');
  }
};
module.exports = { showName };
